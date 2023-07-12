import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const esConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        sidebar: [
            {
                text: 'Guía',
                items: [
                    // This shows `/guide/index.md` page.
                    { text: 'Introducción', link: '/es/guide/' },
                    { text: 'Empezando', link: '/es/guide/getting-started' },
                    { text: 'Tu primera escena', link: '/es/guide/your-first-scene' },
                    { text: 'Nuxt', link: '/es/guide/nuxt' },
                    { text: 'Problemas comunes', link: '/es/guide/troubleshooting' },
                    { text: 'Migración desde la v1', link: '/es/guide/migration-guide' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'Renderer', link: '/es/api/renderer' },
                    {
                        text: 'Instancias, argumentos y propiedades',
                        link: '/es/api/instances-arguments-and-props',
                    },
                    {
                        text: 'Composables',
                        link: '/es/api/composables',
                    },
                    {
                        text: 'Eventos',
                        link: '/es/api/events',
                    },
                ],
            },
            {
                text: 'Ejemplos',
                items: [
                    { text: 'Orbit Controls', link: '/es/examples/orbit-controls' },
                    { text: 'Animaciones básicas', link: '/es/examples/basic-animations' },
                    { text: 'Grupos', link: '/es/examples/groups' },
                    { text: 'Usando texturas', link: '/es/examples/load-textures' },
                    { text: 'Usando modelos', link: '/es/examples/load-models' },
                    { text: 'Usando textos', link: '/es/examples/text-3d' },
                ],
            },
            {
                text: 'Avanzado',

                items: [
                    { text: 'Extendiendo', link: '/es/advanced/extending' },
                    {
                        text: 'Advertencias',
                        link: '/es/advanced/caveats',
                    },
                ],
            },
            {
                text: 'Ecosistema',
                items: [
                    {
                        text: `Cientos 💛`,
                        link: 'https://cientos.tresjs.org/',
                    },
                ],
            },
        ],
        nav: [
            { text: 'Guía', link: '/guide/' },
            { text: 'API', link: '/api/renderer' },
            /*       { text: 'API', link: '/api/' },
            { text: 'Config', link: '/config/' }, */
            {
                text: 'Recursos',
                items: [
                    { text: 'Equipo', link: '/team' },
                    { text: 'Releases', link: 'https://github.com/Tresjs/tres/releases' },
                    {
                        text: 'Playground',
                        link: 'https://playground.tresjs.org/'
                    },
                    {
                        text: 'Ecosistema',
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