import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
      text: 'Suggest changes to this page',
    },
    sidebar: [
      {
        text: 'Guide',
        items: [
          // This shows `/guide/index.md` page.
          { text: 'Introduction', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Your first Scene', link: '/guide/your-first-scene' },
          { text: 'Nuxt', link: '/guide/nuxt' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          { text: 'Migrate from v1', link: '/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/api/tres-canvas' },
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
        text: 'Advanced',

        items: [
          { text: 'Extending', link: '/advanced/extending' },
          { text: 'primitive', link: '/advanced/primitive' },
          {
            text: 'Caveats',
            link: '/advanced/caveats',
          },
        ],
      },
      {
        text: 'Debug',
        items: [
          { text: 'Devtools', link: '/debug/devtools' },
        ],
      },
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Orbit Controls', link: '/examples/orbit-controls' },
          { text: 'Basic Animations', link: '/examples/basic-animations' },
          { text: 'Groups', link: '/examples/groups' },
          { text: 'Load Textures', link: '/examples/load-textures' },
          { text: 'Load Models', link: '/examples/load-models' },
          { text: 'Load Text', link: '/examples/text-3d' },
          { text: 'Lights & Shadows', link: '/examples/lights-shadows' },
          { text: 'Shaders', link: '/examples/shaders' },
        ],
      },
      {
        text: 'Directives',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/directives/v-log' },
          { text: 'v-light-helper', link: '/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/directives/v-always-look-at' },
          { text: 'v-distance-to', link: '/directives/v-distance-to' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Cientos 💛',
            link: 'https://cientos.tresjs.org/',
          },
          {
            text: 'Nuxt module',
            link: 'https://github.com/Tresjs/nuxt',
          },
          {
            text: 'TresLeches 🍰',
            link: 'https://tresleches.tresjs.org/',
          },
          {
            text: 'Post-processing (Soon)',
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/tres-canvas' },
      /*       { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' }, */
      { text: 'Resources',
        items: [
          { text: 'Team', link: '/team' },
          { text: 'Releases', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'Playground',
            link: 'https://playground.tresjs.org/',
          },
          {
            text: 'Github',
            link: 'https://github.com/Tresjs/tres/',
          },
          {
            text: 'Issues',
            link: 'https://github.com/Tresjs/tres/issues',
          },
          {
            text: 'Ecosystem',
            items: [
              {
                text: 'Cientos 💛',
                link: 'https://cientos.tresjs.org/',
              },
              {
                text: 'Nuxt module',
                link: 'https://github.com/Tresjs/nuxt',
              },
              {
                text: 'TresLeches 🍰',
                link: 'https://tresleches.tresjs.org/',
              },
            ],
          },
        ],
      },  
    ],
  },
}
