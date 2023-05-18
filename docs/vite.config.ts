import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [svgLoader(), Unocss()],
})
