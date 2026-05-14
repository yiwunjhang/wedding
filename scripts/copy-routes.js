import { copyFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '../dist')

const routes = ['gallery']

for (const route of routes) {
  mkdirSync(`${dist}/${route}`, { recursive: true })
  copyFileSync(`${dist}/index.html`, `${dist}/${route}/index.html`)
  console.log(`✓ dist/${route}/index.html`)
}
