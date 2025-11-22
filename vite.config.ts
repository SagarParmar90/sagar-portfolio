import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows process.env.API_KEY to work in the client for the demo
    // In a real production app, you would use import.meta.env.VITE_API_KEY
    'process.env': process.env
  }
});