import { defineConfig } from 'astro/config'
import glsl from 'vite-plugin-glsl'
import UnoCSS from 'unocss/astro'
import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
// https://astro.build/config
import vue from '@astrojs/vue'

// https://astro.build/config
import mdx from '@astrojs/mdx'
import svgLoader from 'vite-svg-loader'

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@kidonng/daisyui'],
    },
    plugins: [glsl(), svgLoader()],
  },
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app',
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),
        presetTypography({
          cssExtend: {
            blockquote: {
              padding: '1rem',
              'border-left': `8px solid #888 !important`,
              background: '#e8e8e8',
            },
          },
        }),
        presetWebFonts({
          fonts: {
            sans: 'DM Sans',
            serif: 'DM Serif Display',
            mono: 'DM Mono',
          },
        }),
        presetDaisy(),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      safelist: 'i-logos-vue prose prose-sm m-auto text-left'.split(' '),
    }),
    mdx(),
  ],
})
