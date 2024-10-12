import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'
// import { vitepluginvueinspector } from 'vite-plugin-vue-inspector'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueDevTools(),createHtmlPlugin({})],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})