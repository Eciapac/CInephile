import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/сinephile/' : '/',
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      src: "/src",
      images: "/src/assets/images/",
      components: "/src/components/",
      pages: "/src/pages/",
      store: "/src/store/",
      types: "/src/types/"
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})
