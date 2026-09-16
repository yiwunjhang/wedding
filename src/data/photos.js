const rmFiles = import.meta.glob('/src/assets/images/RegisteringMarriage/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', { eager: true })
const pwFiles = import.meta.glob('/src/assets/images/Prewedding/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', { eager: true })
const hmFiles = import.meta.glob('/src/assets/images/Honeymoon/**/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', { eager: true })

// 蜜月完整行程（含尚未上傳照片的日期，會標示為「即將更新」）
const HONEYMOON_START = '2024-02-03'
const HONEYMOON_END = '2024-02-19'

const WEEKDAY_ZH = ['日', '一', '二', '三', '四', '五', '六']

function toPhotos(modules) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, m]) => ({
      src: m.default,
      caption: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^\d+[_\-.\s]+/, ''),
    }))
}

function toIso(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function dateLabel(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return `${iso} (${WEEKDAY_ZH[d.getDay()]})`
}

function eachDate(start, end) {
  const out = []
  const d = new Date(`${start}T00:00:00`)
  const last = new Date(`${end}T00:00:00`)
  while (d <= last) {
    out.push(toIso(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

// 以資料夾名稱前 10 碼（YYYY-MM-DD）分組，空資料夾不會出現在 glob 結果中，
// 因此改由 HONEYMOON_START ~ HONEYMOON_END 補齊完整日期清單。
function toDateGroups(modules) {
  const map = {}
  for (const [path, m] of Object.entries(modules)) {
    const parts = path.split('/')
    const iso = parts[parts.length - 2].slice(0, 10)
    if (!map[iso]) map[iso] = []
    map[iso].push({
      src: m.default,
      filename: parts[parts.length - 1],
      caption: parts[parts.length - 1].replace(/\.[^.]+$/, '').replace(/^\d+[_\-.\s]+/, ''),
    })
  }

  const dates = [...new Set([...eachDate(HONEYMOON_START, HONEYMOON_END), ...Object.keys(map)])].sort()

  return dates.map(iso => {
    const photos = (map[iso] ?? []).sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
    return {
      date: dateLabel(iso),
      photos,
      pending: photos.length === 0,
    }
  })
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
