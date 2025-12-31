import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { distVersion } from './app.config.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@server': path.resolve(process.cwd(), 'server'),
      '@shared': path.resolve(process.cwd(), 'shared'),
    },
  },
  build: {
    outDir: `dist/${distVersion}`
  }
})
