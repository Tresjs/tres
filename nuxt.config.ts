import { presetUno, presetIcons, presetTypography, presetWebFonts } from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'TresJS Playground',
      link: [
        {
          rel: 'icon',
          type: 'image/svg',
          href: '/favicon.svg',
        },
      ],
    },
  },
  modules: ['@unocss/nuxt', 'nuxt-svgo', '@nuxt/content', '@nuxt/image-edge'],
  css: ['@unocss/reset/tailwind-compat.css'],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
    },
  },
  unocss: {
    // presets
    theme: {
      colors: {
        primary: '#82DBC5',
        secondary: '#0f0',
        accent: '#00f',
      },
    },
    presets: [
      presetUno(),

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
    ],
    // core options
    shortcuts: [],
    rules: [],
  },
})
