import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const esConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        sidebar: [
            {
                text: 'Guide',
                items: [
                    // This shows `/guide/index.md` page.
                    { text: 'Introduction', link: '/es/guide/' },
                    { text: 'Getting Started', link: '/es/guide/getting-started' },
                    { text: 'Your first Scene', link: '/es/guide/your-first-scene' },
                    { text: 'Nuxt', link: '/es/guide/nuxt' },
                    { text: 'Troubleshooting', link: '/es/guide/troubleshooting' },
                    { text: 'Migrate from v1', link: '/es/guide/migration-guide' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'Renderer', link: '/es/api/renderer' },
                    {
                        text: 'Instances, arguments and props',
                        link: '/es/api/instances-arguments-and-props',
                    },
                    {
                        text: 'Composables',
                        link: '/es/api/composables',
                    },
                    {
                        text: 'Events',
                        link: '/es/api/events',
                    },
                ],
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Orbit Controls', link: '/es/examples/orbit-controls' },
                    { text: 'Basic Animations', link: '/es/examples/basic-animations' },
                    { text: 'Groups', link: '/es/examples/groups' },
                    { text: 'Load Textures', link: '/es/examples/load-textures' },
                    { text: 'Load Models', link: '/es/examples/load-models' },
                    { text: 'Load Text', link: '/es/examples/text-3d' },
                ],
            },
            {
                text: 'Advanced',

                items: [
                    { text: 'Extending', link: '/es/advanced/extending' },
                    {
                        text: 'Caveats',
                        link: '/es/advanced/caveats',
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