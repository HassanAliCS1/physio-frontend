import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/physio-frontend",
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
})
