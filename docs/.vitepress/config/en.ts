import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        sidebar: [
            {
                text: 'Guide',
                items: [
                    // This shows `/guide/index.md` page.
                    { text: 'Introduction', link: '/en/guide/' },
                    { text: 'Getting Started', link: '/en/guide/getting-started' },
                    { text: 'Your first Scene', link: '/en/guide/your-first-scene' },
                    { text: 'Nuxt', link: '/en/guide/nuxt' },
                    { text: 'Troubleshooting', link: '/en/guide/troubleshooting' },
                    { text: 'Migrate from v1', link: '/en/guide/migration-guide' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'Renderer', link: '/en/api/renderer' },
                    {
                        text: 'Instances, arguments and props',
                        link: '/en/api/instances-arguments-and-props',
                    },
                    {
                        text: 'Composables',
                        link: '/en/api/composables',
                    },
                    {
                        text: 'Events',
                        link: '/en/api/events',
                    },
                ],
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Orbit Controls', link: '/en/examples/orbit-controls' },
                    { text: 'Basic Animations', link: '/en/examples/basic-animations' },
                    { text: 'Groups', link: '/en/examples/groups' },
                    { text: 'Load Textures', link: '/en/examples/load-textures' },
                    { text: 'Load Models', link: '/en/examples/load-models' },
                    { text: 'Load Text', link: '/en/examples/text-3d' },
                ],
            },
            {
                text: 'Advanced',

                items: [
                    { text: 'Extending', link: '/en/advanced/extending' },
                    {
                        text: 'Caveats',
                        link: '/en/advanced/caveats',
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
                text: 'Resources',
                items: [
                    { text: 'Team', link: '/team' },
                    { text: 'Releases', link: 'https://github.com/Tresjs/tres/releases' },
                    {
                        text: 'Playground',
                        link: 'https://playground.tresjs.org/'
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
            },
        ],
    },
}