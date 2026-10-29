import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import siteConfig from './site.config.json'

export default defineConfig({
  base: siteConfig.basePath,
  plugins: [react()],
})
