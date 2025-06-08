import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/docs/:path',
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
          { text: 'Primitives', link: '/advanced/primitive' },
          { text: 'Scaling Performance 🚀', link: '/advanced/performance' },
          { text: 'Attach', link: '/advanced/attach' },
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
        text: 'Cookbook 🍳🧑‍🍳',
        link: '/cookbook/',
        items: [
          { text: 'Orbit Controls', link: '/cookbook/orbit-controls' },
          { text: 'Basic Animations', link: '/cookbook/basic-animations' },
          { text: 'Advanced Animations', link: '/cookbook/advanced-animations' },
          { text: 'Groups', link: '/cookbook/groups' },
          { text: 'Load Textures', link: '/cookbook/load-textures' },
          { text: 'Load Models', link: '/cookbook/load-models' },
          { text: 'Load Text', link: '/cookbook/text-3d' },
          { text: 'Lights & Shadows', link: '/cookbook/lights-shadows' },
          { text: 'Shaders', link: '/cookbook/shaders' },
          { text: 'Tweakpane', link: '/cookbook/tweakpane' },
        ],
      },
      {
        text: 'Directives',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/directives/v-log' },
          { text: 'v-light-helper', link: '/directives/v-light-helper' },
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
            text: 'Post-processing',
            link: 'https://post-processing.tresjs.org/',
          },
        ],
      },
      {
        text: 'Community',
        items: [
          { text: 'Awesome Resources', link: '/community/awesome-resources' },
        ],
      },
      {
        text: 'Contributing',
        items: [
          { text: 'Contribute', link: '/contribute/contributing' },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/tres-canvas' },
      /*       { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' }, */
      {
        text: 'Resources',
        items: [
          { text: 'Team', link: '/team' },
          { text: 'Releases', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'Playground',
            link: 'https://play.tresjs.org/',
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
            text: 'Contributing',
            link: 'https://github.com/Tresjs/.github/blob/main/CONTRIBUTING.md',
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
                text: 'Post-processing',
                link: 'https://post-processing.tresjs.org/',
              },
            ],
          },
        ],
      },
    ],
  },
}
