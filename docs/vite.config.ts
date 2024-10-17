import { presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    svgLoader(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          scale: 1.2,
          warn: true,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),
      ],
    }),
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
