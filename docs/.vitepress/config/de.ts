import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const deConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
      text: 'Änderungen an dieser Seite vorschlagen',
    },
    sidebar: [
      {
        text: 'Anleitung',
        items: [
          // Dies zeigt die Seite `/guide/index.md`.
          { text: 'Einführung', link: '/de/guide/' },
          { text: 'Loslegen', link: '/de/guide/getting-started' },
          { text: 'Deine erste Szene', link: '/de/guide/your-first-scene' },
          { text: 'Nuxt', link: '/de/guide/nuxt' },
          { text: 'Fehlerbehebung', link: '/de/guide/troubleshooting' },
          { text: 'Migration von v1', link: '/de/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/de/api/tres-canvas' },
          {
            text: 'Instanzen, Argumente und Props',
            link: '/de/api/instances-arguments-and-props',
          },
          {
            text: 'Composables',
            link: '/de/api/composables',
          },
          {
            text: 'Ereignisse',
            link: '/de/api/events',
          },
        ],
      },

      {
        text: 'Fortgeschritten',
        items: [
          { text: 'Erweitern', link: '/de/advanced/extending' },
          { text: 'Primitive', link: '/de/advanced/primitive' },
          {
            text: 'Warnhinweise',
            link: '/de/advanced/caveats',
          },
        ],
      },
      {
        text: 'Debugging',
        items: [
          { text: 'Entwicklungstools', link: '/de/debug/devtools' },
        ],
      },
      {
        text: 'Beispiele',
        collapsed: true,
        items: [
          { text: 'Orbit-Kontrollen', link: '/de/examples/orbit-controls' },
          { text: 'Grundlegende Animationen', link: '/de/examples/basic-animations' },
          { text: 'Gruppen', link: '/de/examples/groups' },
          { text: 'Texturen laden', link: '/de/examples/load-textures' },
          { text: 'Modelle laden', link: '/de/examples/load-models' },
          { text: 'Text laden', link: '/de/examples/text-3d' },
          { text: 'Lichter und Schatten', link: '/de/examples/lights-shadows' },
          { text: 'Shaders', link: '/de/examples/shaders' },
        ],
      },
      {
        text: 'Direktiven',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/de/directives/v-log' },
          { text: 'v-light-helper', link: '/de/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/de/directives/v-always-look-at' },
          { text: 'v-distance-to', link: '/de/directives/v-distance-to' },
        ],
      },
      {
        text: 'Ökosystem',
        items: [
          {
            text: 'Cientos 💛',
            link: 'https://cientos.tresjs.org/',
          },
          {
            text: 'Nuxt-Modul',
            link: 'https://github.com/Tresjs/nuxt',
          },
          {
            text: 'TresLeches 🍰',
            link: 'https://tresleches.tresjs.org/',
          },
          {
            text: 'Nachbearbeitung (Demnächst)',
          },
        ],
      },
    ],
    nav: [
      { text: 'Anleitung', link: '/de/guide/' },
      { text: 'API', link: '/de/api/tres-canvas' },
      /*       { text: 'API', link: '/de/api/' },
      { text: 'Konfiguration', link: '/de/config/' }, */
      {
        text: 'Ressourcen',
        items: [
          { text: 'Team', link: '/de/team' },
          { text: 'Versionen', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'Spielplatz',
            link: 'https://playground.tresjs.org/',
          },
          {
            text: 'Github',
            link: 'https://github.com/Tresjs/tres/',
          },
          {
            text: 'Probleme',
            link: 'https://github.com/Tresjs/tres/issues',
          },
          {
            text: 'Ökosystem',
            items: [
              {
                text: 'Hunderte 💛',
                link: 'https://cientos.tresjs.org/',
              },
              {
                text: 'Nuxt-Modul',
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
