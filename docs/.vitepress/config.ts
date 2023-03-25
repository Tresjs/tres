import { defineConfig } from 'vitepress'
import { version } from '../../packages/tres/package.json'
import { version as cientosVersion } from '../../packages/cientos/package.json'

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
          { text: 'Introduction', link: 'es/guide/' },
          { text: 'Getting Started', link: 'es/guide/getting-started' },
          { text: 'Your first Scene', link: 'es/guide/your-first-scene' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Renderer', link: 'es/api/renderer' },
          {
            text: 'Instances, arguments and props',
            link: 'es/api/instances-arguments-and-props',
          },
          {
            text: 'Composables',
            link: 'es/api/composables',
          },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Orbit Controls', link: 'es/examples/orbit-controls' },
          { text: 'Basic Animations', link: 'es/examples/basic-animations' },
          { text: 'Load Textures', link: 'es/examples/load-textures' },
          { text: 'Load Models', link: 'es/examples/load-models' },
        ],
      },
      {
        text: 'Advanced',

        items: [
          { text: 'Extending', link: 'es/advanced/extending' },
          {
            text: 'Caveats',
            link: 'es/advanced/caveats',
          },
        ],
      },
      {
        text: 'Cientos',
        collapsible: true,
        items: [
          { text: 'Introduction', link: 'es/cientos/' },
          {
            text: 'Composables',
            link: 'es/cientos/composables',
          },
          {
            text: 'Abstractions',
            items: [{ text: 'Text3D', link: 'es/cientos/abstractions/text-3d' }],
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: 'es/guide/' },
      { text: 'API', link: 'es/api/' },
      { text: 'Config', link: 'es/config/' },
      {
        text: 'Ecosystem',
        activeMatch: `^/ecosystem/`,
        items: [
          {
            text: `Core v${version}`,
            items: [
              {
                text: 'Release Notes ',
                link: `https://github.com/Tresjs/tres/releases/tag/%40tresjs%2Fcore%40${version}`,
              },
            ],
          },
          {
            text: `Cientos v${cientosVersion}`,
            items: [
              {
                text: 'Release Notes ',
                link: `https://github.com/Tresjs/tres/releases/tag/%40tresjs%2Fcientos%40${cientosVersion}`,
              },
            ],
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
