import { presetUno, presetIcons, presetTypography, presetWebFonts, transformerDirectives } from 'unocss'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'TresJS Lab',
      meta: [
        { name: 'description', content: 'Showcase and examples lab for TresJS.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#82DBC5' },
        { name: 'keywords', content: 'threejs, vuejs, renderer, vue, three, 3D' },
        // Open Graph
        { property: 'og:title', content: 'TresJS Lab' },
        { property: 'og:description', content: 'Showcase and examples lab for TresJS.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://lab.tresjs.org' },
        { property: 'og:image', content: '/tresjs-lab-og.png' },
        { property: 'og:image:alt', content: 'TresJS Lab' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@tresjs' },
        { name: 'twitter:title', content: 'TresJS Lab' },
        { name: 'twitter:description', content: 'Showcase and examples lab for TresJS.' },
        { name: 'twitter:image', content: '/tresjs-lab-og.png' },
        { name: 'twitter:image:alt', content: 'TresJS Lab' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg',
          href: '/flask.svg',
        },
      ],
    },
  },
  modules: [
    '@tresjs/nuxt',
    '@unocss/nuxt',
    'nuxt-svgo',
    '@nuxt/content',
    '@nuxt/image-edge',
    '@nuxt/image',
    '@nuxt/devtools',
  ],
  css: ['/styles/main.css', '@unocss/reset/tailwind-compat.css', '@tresjs/leches/styles'],
  declare: ['*.glsl'],
  tres: {
    devtools: true,
    glsl: true,
  },
  routeRules: {
    '/': { prerender: true }
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
            'border-radius': '0.5rem',
            background: '#efefef',
          },
          pre: {
            background: '#333e50 !important',
          },
          img: {
            margin: '2rem auto',
            'border-radius': '0.5rem',
          },
          code: {
            'font-family': 'JetBrains Mono',
            'font-size': '0.875rem',
          },
          /*  code: {
            'font-family': 'Fira Code',
            'font-size': '0.875rem',
          }, */
          ':not(pre)>code': {
            background: '#e8e8e8 !important',
            padding: '0.25rem 0.5rem !important',
          },
          'code::after': {
            content: 'none',
          },
          'code::before': {
            content: 'none',
          },
        },
      }),
      presetWebFonts({
        fonts: {
          sans: 'Inter',
          mono: 'JetBrains Mono',
          title: 'Sacramento',
        },
      }),
    ],
    // core options
    shortcuts: [],
    rules: [],
    transformers: [
      transformerDirectives(),
    ],
  },
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
      preload: ['bash', 'css', 'javascript', 'json', 'markdown', 'scss', 'vue', 'glsl'],
    },
  },
  vite: {
    plugins: [svgLoader()],
  },
  build: {
    transpile: ['fsevents', 'postprocessing'],
  },
})
