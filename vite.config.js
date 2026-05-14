import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: process.env.VITE_BASE || '/',
  assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.JPEG', '**/*.WEBP', '**/*.GIF'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
