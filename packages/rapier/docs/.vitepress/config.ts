import { resolve } from 'pathe'
import { defineConfig } from 'vitepress'

const whitelist = ['TresCanvas', 'TresLeches', 'TresScene']

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tres Rapier',
  description:
    'We`ll make you love physics again',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#82DBC5' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tresjs_dev' }],
    ['meta', { name: 'twitter:creator', content: '@tresjs_dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'rapier - TresJS' }],
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://repository-images.githubusercontent.com/571314349/10996566-7f70-473b-a8e5-4e56fc0ca850',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content:
          'https://repository-images.githubusercontent.com/571314349/10996566-7f70-473b-a8e5-4e56fc0ca850',
      },
    ],
    [
      'script',
      {
        'defer': 'true',
        'data-site': 'OWBUVCJK',
        'src': 'https://cdn.usefathom.com/script.js',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: 'https://lab.tresjs.org/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'How does it work?', link: '/guide/how-does-it-work' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Physics', link: '/components/physics' },
          { text: 'RigidBody', link: '/components/rigid-body' },
          { text: 'Custom Collider', link: '/components/custom-collider' },
          { text: 'Joint', link: '/components/joint' },
        ],
      },
      {
        text: 'Composables',
        items: [
          { text: 'useRapier', link: '/composables/use-rapier' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Tresjs/rapier' },
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://discord.gg/UCr96AQmWn' },
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
        '@tresjs/rapier': resolve(__dirname, '../../dist/tresrapier.js'),
      },
      dedupe: ['three'],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          (tag.startsWith('Tres') && !whitelist.includes(tag))
          || tag === 'primitive',
      },
    },
  },
})
