import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://34.123.24.28:8080', // 백엔드 서버 URL
        changeOrigin: true, // 클라이언트의 Origin을 백엔드 서버로 전달
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거하고 백엔드 경로로 전달
      },
    },
  },
});
