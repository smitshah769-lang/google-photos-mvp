import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { llmProxyPlugin } from './server/vitePlugin.ts'

export default defineConfig({
  envDir: import.meta.dirname,
  plugins: [react(), tailwindcss(), llmProxyPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
