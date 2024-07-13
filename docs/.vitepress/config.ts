import { defineConfig } from 'vitepress'
import { resolve } from 'pathe'
import { templateCompilerOptions } from '@tresjs/core'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Post-processing',
  description: 'Post-processing effects for TresJS',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#82DBC5' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tresjs_dev' }],
    ['meta', { name: 'twitter:creator', content: '@tresjs_dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cientos - TresJS' }],
    [
      'meta',
      {
        property: 'og:image',
        content: '/og-banner.png',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: '/og-banner.png',
      },
    ],
    ['script', { 'defer': 'true', 'data-site': 'OWBUVCJK', 'src': 'https://cdn.usefathom.com/script.js' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: 'https://playground.tresjs.org/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Introduction', link: '/guide/' }],
      },
      {
        text: 'Effects',
        items: [
          { text: 'Bloom', link: '/guide/effects/bloom' },
          { text: 'Depth of Field', link: '/guide/effects/depth-of-field' },
          { text: 'Glitch', link: '/guide/effects/glitch' },
          { text: 'Noise', link: '/guide/effects/noise' },
          { text: 'Outline', link: '/guide/effects/outline' },
          { text: 'Pixelation', link: '/guide/effects/pixelation' },
          { text: 'Vignette', link: '/guide/effects/vignette' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://discord.gg/UCr96AQmWn' },
      { icon: 'github', link: 'https://github.com/Tresjs/post-processing' },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ['vitepress'],
      include: ['three'],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        '@tresjs/post-processing': resolve(__dirname, '../../dist/tres-postprocessing.js'),
      },
      dedupe: ['three'],
    },
  },
  vue: {
    ...templateCompilerOptions,
  },
})
