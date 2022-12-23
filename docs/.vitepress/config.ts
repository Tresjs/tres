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
          {
            text: 'Composables',
            link: '/api/composables',
          },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Orbit Controls', link: '/examples/orbit-controls' },
          { text: 'Basic Animations', link: '/examples/basic-animations' },
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
        text: 'Cientos',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/cientos/' },
          {
            text: 'Abstractions',
            items: [{ text: 'Text3D', link: '/cientos/abstractions/text-3d' }],
          },
          {
            text: 'Loaders',
            items: [
              { text: 'useGLTF', link: '/cientos/loaders/use-gltf' },
              { text: 'GLTFModel', link: '/cientos/loaders/gltf-model' },
            ],
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' },
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
