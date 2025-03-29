import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    hmr: true,  // Enable Hot Module Replacement
    host: true,
    watch: {
      usePolling: true  // Enable for some systems if HMR isn't working
    },
    port: 3000,
  },
})
