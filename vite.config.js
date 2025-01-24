import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Configuration
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://34.123.24.28:8080', // 백엔드 서버 URL
        changeOrigin: true, // 클라이언트의 Origin 헤더를 백엔드로 전달
        rewrite: (path) => path.replace(/^\/api/, '/api'), // '/api'를 유지한 채 전달
      },
    },
  },
});
