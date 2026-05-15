import sharp from 'sharp'
import { readdir, stat, readFile, writeFile } from 'fs/promises'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '../src/assets/images/Honeymoon')
const MAX_SIDE = 800   // landscape: max width; portrait: max height
const JPEG_QUALITY = 78
const PNG_QUALITY = 80
const SKIP_BELOW_KB = 300

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      files.push(...(await collectImages(full)))
    } else {
      const ext = extname(e.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) files.push(full)
    }
  }
  return files
}

async function process(filePath) {
  const { size } = await stat(filePath)
  const rel = filePath.replace(ROOT, '')
  const ext = extname(filePath).toLowerCase()

  const fileBuffer = await readFile(filePath)
  const img = sharp(fileBuffer)
  const meta = await img.metadata()

  // EXIF orientation 5-8 means the image is rotated 90°, so width/height are swapped
  const swapped = meta.orientation >= 5 && meta.orientation <= 8
  const width  = swapped ? meta.height : meta.width
  const height = swapped ? meta.width  : meta.height

  const isLandscape = width >= height
  const longSide = isLandscape ? width : height

  if (longSide <= MAX_SIDE && size < SKIP_BELOW_KB * 1024) {
    console.log(`  skip  ${rel} (${width}x${height}, ${(size/1024).toFixed(0)} KB)`)
    return
  }

  // .rotate() applies EXIF orientation so the output is upright
  let pipeline = img.rotate()
  if (longSide > MAX_SIDE) {
    pipeline = pipeline.resize(
      isLandscape ? MAX_SIDE : null,
      isLandscape ? null : MAX_SIDE,
      { withoutEnlargement: true }
    )
  }

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  }

  const output = await pipeline.toBuffer()

  if (output.length >= size && longSide <= MAX_SIDE) {
    console.log(`  skip  ${rel} — already small enough`)
    return
  }

  await writeFile(filePath, output)

  const newMeta = await sharp(filePath).metadata()
  const saved = (((size - output.length) / size) * 100).toFixed(1)
  console.log(`  OK    ${rel}`)
  console.log(`        ${width}x${height} → ${newMeta.width}x${newMeta.height}  |  ${(size/1024).toFixed(0)} KB → ${(output.length/1024).toFixed(0)} KB  (-${saved}%)`)
}

const files = await collectImages(ROOT)
console.log(`\nFound ${files.length} images under src/assets/images/Honeymoon\n`)
let totalBefore = 0, totalAfter = 0

for (const f of files) {
  const { size } = await stat(f)
  totalBefore += size
  await process(f)
  const { size: after } = await stat(f)
  totalAfter += after
}

const savedMb = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)
console.log(`\nDone. Total saved: ${savedMb} MB`)
