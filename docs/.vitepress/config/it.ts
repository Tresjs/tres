import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const itConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/tresjs/tres/edit/main/docs/:path',
            text: 'Suggerisci modifiche a questa pagina',
        },
        sidebar: [
            {
                text: 'Guida',
                items: [
                    // Questo mostra la pagina `/guide/index.md`.
                    { text: 'Introduzione', link: '/it/guide/' },
                    { text: 'Per Iniziare', link: '/it/guide/getting-started' },
                    { text: 'La tua prima Scena', link: '/it/guide/your-first-scene' },
                    { text: 'Nuxt', link: '/it/guide/nuxt' },
                    { text: 'Risoluzione dei Problemi', link: '/it/guide/troubleshooting' },
                    { text: 'Migrazione dalla v1', link: '/it/guide/migration-guide' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'TresCanvas', link: '/it/api/tres-canvas' },
                    {
                        text: 'Istanze, argomenti e proprietà',
                        link: '/it/api/instances-arguments-and-props',
                    },
                    {
                        text: 'Composables',
                        link: '/it/api/composables',
                    },
                    {
                        text: 'Eventi',
                        link: '/it/api/events',
                    },
                ],
            },

            {
                text: 'Avanzato',

                items: [
                    { text: 'Estensione', link: '/it/advanced/extending' },
                    { text: 'Primitive', link: '/it/advanced/primitive' },
                    {
                        text: 'Caveats',
                        link: '/it/advanced/caveats',
                    },
                ],
            },
            {
                text: 'Debug',
                items: [
                    { text: 'Strumenti di Sviluppo', link: '/it/debug/devtools' },
                ],
            },
            {
                text: 'Raccolta Ricette 🍳🧑‍🍳',
                link: '/it/cookbook/',
                items: [
                    { text: 'Controlli Orbita', link: '/it/cookbook/orbit-controls' },
                    { text: 'Animazioni di Base', link: '/it/cookbook/basic-animations' },
                    { text: 'Gruppi', link: '/it/cookbook/groups' },
                    { text: 'Caricamento Texture', link: '/it/cookbook/load-textures' },
                    { text: 'Caricamento Modelli', link: '/it/cookbook/load-models' },
                    { text: 'Caricamento Testo', link: '/it/cookbook/text-3d' },
                    { text: 'Luci e Ombre', link: '/it/cookbook/lights-shadows' },
                    { text: 'Shader', link: '/it/cookbook/shaders' },
                ],
            },
            {
                text: 'Direttive',
                collapsed: true,
                items: [
                    { text: 'v-log', link: '/it/directives/v-log' },
                    { text: 'v-light-helper', link: '/it/directives/v-light-helper' },
                    { text: 'v-always-look-at', link: '/it/directives/v-always-look-at' },
                    { text: 'v-distance-to', link: '/it/directives/v-distance-to' },
                ],
            },
            {
                text: 'Ecosistema',
                items: [
                    {
                        text: 'Cientos 💛',
                        link: 'https://cientos.tresjs.org/',
                    },
                    {
                        text: 'Modulo Nuxt',
                        link: 'https://github.com/Tresjs/nuxt',
                    },
                    {
                        text: 'TresLeches 🍰',
                        link: 'https://tresleches.tresjs.org/',
                    },
                    {
                        text: 'Post-processing (Prossimamente)',
                    },
                ],
            },
        ],
        nav: [
            { text: 'Guida', link: '/it/guide/' },
            { text: 'API', link: '/it/api/tres-canvas' },
            /*       { text: 'API', link: '/it/api/' },
            { text: 'Configurazione', link: '/it/config/' }, */
            {
                text: 'Risorse', items: [
                    { text: 'Team', link: '/it/team' },
                    { text: 'Versioni', link: 'https://github.com/Tresjs/tres/releases' },
                    {
                        text: 'Area Giochi',
                        link: 'https://play.tresjs.org/',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/Tresjs/tres/',
                    },
                    {
                        text: 'Segnalazioni',
                        link: 'https://github.com/Tresjs/tres/issues',
                    },
                    {
                        text: 'Ecosistema',
                        items: [
                            {
                                text: 'Cientos 💛',
                                link: 'https://cientos.tresjs.org/',
                            },
                            {
                                text: 'Modulo Nuxt',
                                link: 'https://github.com/Tresjs/nuxt',
                            },
                            {
                                text: 'TresLeches 🍰',
                                link: 'https://tresleches.tresjs.org/',
                            },
                        ],
                    },
                ]
            },
        ],
    },
}