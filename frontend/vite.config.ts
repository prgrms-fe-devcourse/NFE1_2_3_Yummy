import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@typings': path.resolve(__dirname, './src/typings'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@apis': path.resolve(__dirname, './src/apis'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  define: {
    global: 'window', // global을 window로 정의
  },
  server: {
    proxy: {
      // '/api'로 시작하는 요청을 백엔드 서버로 프록시
      '/api': {
        target: 'http://localhost:3000', // 백엔드 서버 주소
        changeOrigin: true, // CORS 문제를 우회하기 위해 필요
        rewrite: (path) => path.replace(/^\/api/, ''), // 경로 재작성 (필요에 따라 수정)
      },
    },
  },
})
