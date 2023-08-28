import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
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