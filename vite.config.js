import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Configuration -> 401의 원인..
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://www.wallet-guardians.duckdns.org:8080', // 백엔드 서버 URL
        changeOrigin: true, // 클라이언트의 Origin 헤더를 백엔드로 전달
        rewrite: (path) => path.replace(/^\/api/, '/api'), // '/api'를 유지한 채 전달
      },
    },
  },
});
