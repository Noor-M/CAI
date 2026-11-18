import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute base so assets load on nested routes such as /events/<id>.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
