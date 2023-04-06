import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vitepress'
import { resolve } from 'pathe'

export default defineConfig({
  title: 'TresJS',
  description: 'Declarative ThreeJS using Vue Components',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['script', { defer: 'true', 'data-domain': 'tresjs.org', src: 'https://plausible.io/js/script.js' }],
  ],
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
          { text: 'Migrate from v1', link: '/guide/migration-guide' },
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
          {
            text: 'Composables',
            link: '/api/composables',
          },
          {
            text: 'Events',
            link: '/api/events',
          },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Orbit Controls', link: '/examples/orbit-controls' },
          { text: 'Basic Animations', link: '/examples/basic-animations' },
          { text: 'Groups', link: '/examples/groups' },
          { text: 'Load Textures', link: '/examples/load-textures' },
          { text: 'Load Models', link: '/examples/load-models' },
          { text: 'Load Text', link: '/examples/text-3d' },
        ],
      },
      {
        text: 'Advanced',

        items: [
          { text: 'Extending', link: '/advanced/extending' },
          {
            text: 'Caveats',
            link: '/advanced/caveats',
          },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: `Cientos 💛`,
            link: 'https://cientos.tresjs.org/',
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/renderer' },
      /*       { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' }, */
      {
        text: 'Ecosystem',
        items: [
          {
            text: `Cientos 💛`,
            link: 'https://cientos.tresjs.org/',
          },
        ],
      },
    ],
    socialLinks: [
      /*  { icon: 'github', link: 'https://github.com/tresjs/tres' }, */
      { icon: 'twitter', link: 'https://twitter.com/alvarosabu' },
      { icon: 'discord', link: 'https://discord.gg/wXx63MwW' },
    ],
  },
  vite: {
    plugins: [svgLoader(), Unocss()],
    resolve: {
      alias: {
        '/@': resolve(__dirname, '../../src'),
      },
    },
  },
})
