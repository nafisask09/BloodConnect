import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,  // Will try other ports if 5173 is busy
    host: true,         // Allows access from other devices on network
    open: true          // Automatically opens browser
  },
  preview: {
    port: 4173,
    strictPort: false
  }
})