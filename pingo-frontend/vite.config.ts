import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from "vite-plugin-checker"

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },

      '/chats/count': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },

      '/messages/count': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
    // , port: 3000
  }
})
