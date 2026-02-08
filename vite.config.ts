import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cnb': {
        target: 'https://www.cnb.cz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cnb/, '/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing'),
        secure: false,
      }
    }
  }
})
