import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  root: './src/client',
  build: { outDir: '../../dist/client' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/client ', import.meta.url)),
    },
  },
})
