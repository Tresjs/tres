import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

export default defineConfig({
  title: 'TresJS',
  description: 'Declarative ThreeJS using Vue Components',
  head: [['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    sidebar: [
      {
        text: 'Guide',
        items: [
          // This shows `/guide/index.md` page.
          { text: 'Introduction', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Your first Scene', link: '/guide/your-first-scene' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Renderer', link: '/api/renderer' },
          {
            text: 'Instances, arguments and props',
            link: '/api/instances-arguments-and-props',
          },
        ],
      },
      /*{
        text: 'Examples',
      }, */
      {
        text: 'Advanced',

        items: [{ text: 'Extending', link: '/advanced/extending' }],
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes ',
            link: 'https://github.com/Tresjs/tres/releases',
          },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tresjs/tres' },
      { icon: 'twitter', link: 'https://twitter.com/alvarosabu' },
    ],
  },
})
