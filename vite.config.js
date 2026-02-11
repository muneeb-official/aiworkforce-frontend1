import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'aiworkforce-prod-alb-240576262.us-east-1.elb.amazonaws.com'
    ],
    proxy: {
      '/api': {
        target: 'http://aiworkforce-prod-alb-240576262.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
