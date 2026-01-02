import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { distVersion } from '../app.config.ts'

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
  ssr: {
    target: 'node',
    noExternal: [
      'react-helmet-async',
    ],
  },
  build: {
    outDir: `dist/${distVersion}/server`,
    ssr: 'src/entry-server.ts',
    rollupOptions: {
      output: {
        entryFileNames: 'ssr.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  }
})