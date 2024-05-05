import { defineConfig } from 'vitepress'
import { resolve } from 'pathe'
import componentList from '../component-list/components'

const whitelist = ['TresCanvas', 'TresLeches', 'TresScene']

const collapsedSidebarCategories = new Set(['Materials', 'Shapes', 'Misc', 'Directives'])
const sidebar = [
  {
    text: 'Guide',
    items: [{ text: 'Introduction', link: '/guide/' }],
  },
  ...componentList,
].map(
  c => collapsedSidebarCategories.has(c.text) ? Object.assign(c, { collapsed: true }) : c,
)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cientos',
  description:
    'Collection of useful helpers and fully functional, ready-made abstractions for TresJS',
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
      { text: 'Components', link: '/component-list/' },
      { text: 'Examples', link: 'https://lab.tresjs.org/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tresjs/cientos' },
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
        '@tresjs/cientos': resolve(__dirname, '../../dist/trescientos.js'),
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
