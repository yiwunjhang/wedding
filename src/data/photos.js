const rmFiles = import.meta.glob('/src/assets/images/RegisteringMarriage/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })
const pwFiles = import.meta.glob('/src/assets/images/Prewedding/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })
const hmFiles = import.meta.glob('/src/assets/images/Honeymoon/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })

function toPhotos(modules) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, m]) => ({
      src: m.default,
      caption: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^\d+[_\-.\s]+/, ''),
    }))
}

function toDateGroups(modules) {
  const map = {}
  for (const [path, m] of Object.entries(modules)) {
    const parts = path.split('/')
    const folder = parts[parts.length - 2]
    if (!map[folder]) map[folder] = []
    map[folder].push({
      src: m.default,
      filename: parts[parts.length - 1],
      caption: parts[parts.length - 1].replace(/\.[^.]+$/, '').replace(/^\d+[_\-.\s]+/, ''),
    })
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, photos]) => ({
      date,
      photos: photos.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true })),
    }))
}

const hmDateGroups = toDateGroups(hmFiles)

export const groups = [
  { zh: '登記', en: 'Registering Marriage', photos: toPhotos(rmFiles) },
  { zh: '婚紗', en: 'Prewedding',           photos: toPhotos(pwFiles) },
  {
    zh: '蜜月', en: 'Honeymoon',
    photos: hmDateGroups.flatMap(g => g.photos),
    dateGroups: hmDateGroups,
  },
]
