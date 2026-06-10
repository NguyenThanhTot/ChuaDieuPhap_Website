import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Keep the /api prefix when proxying so backend controller mappings like
        // @RequestMapping("/api/...") continue to match. Previously the proxy
        // removed the /api prefix which caused requests to hit the wrong backend
        // route and return homepage or time out.
      },
    },
  },
})
