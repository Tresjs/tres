import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    svgLoader(),
    Unocss(),
    Components({
      // allow auto load markdown components under `.vitepress/theme/components`
      dirs: ['.vitepress/theme/components'],
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'components.d.ts',
    }),
  ],
})
