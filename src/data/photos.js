const rmFiles = import.meta.glob('/src/assets/images/RegisteringMarriage/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })
const pwFiles = import.meta.glob('/src/assets/images/Prewedding/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })
const hmFiles = import.meta.glob('/src/assets/images/Honeymoon/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true })

function toPhotos(modules) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, m]) => ({
      src: m.default,
      caption: path.split('/').pop().replace(/\.[^.]+$/, ''),
    }))
}

export const groups = [
  { zh: '登記', en: 'Registering Marriage', photos: toPhotos(rmFiles) },
  { zh: '婚紗', en: 'Prewedding',           photos: toPhotos(pwFiles) },
  { zh: '蜜月', en: 'Honeymoon',            photos: toPhotos(hmFiles) },
]
