import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Kajun-chicken-and-seafood/',
  // VITE_* env vars are automatically exposed to the client
  // Just put VITE_GROQ_API_KEY=gsk_... in your .env file
})
