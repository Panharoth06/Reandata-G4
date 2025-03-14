import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@emailjs/browser"]  // Ensure it's bundled
  }
});

// server: {
//   proxy: {
//     '/rpc': {
//       target: 'https://reandata-api.istad.co',
//       changeOrigin: true,
//     },
//   },
// },