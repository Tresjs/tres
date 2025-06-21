import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const deConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/docs/:path',
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
            text: 'Events',
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
        text: 'Kochbuch 🍳🧑‍🍳',
        link: '/de/cookbook/',
        items: [
          { text: 'Orbit-Controls', link: '/de/cookbook/orbit-controls' },
          { text: 'Einfache Animationen', link: '/de/cookbook/basic-animations' },
          { text: 'Fortgeschrittene Animationen', link: '/de/cookbook/advanced-animations' },
          { text: 'Gruppen', link: '/de/cookbook/groups' },
          { text: 'Texturen laden', link: '/de/cookbook/load-textures' },
          { text: 'Modelle laden', link: '/de/cookbook/load-models' },
          { text: 'Text laden', link: '/de/cookbook/text-3d' },
          { text: 'Lichter und Schatten', link: '/de/cookbook/lights-shadows' },
          { text: 'Shaders', link: '/de/cookbook/shaders' },
        ],
      },
      {
        text: 'Direktiven',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/de/directives/v-log' },
          { text: 'v-light-helper', link: '/de/directives/v-light-helper' },
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
            text: 'Nachbearbeitung',
            link: 'https://post-processing.tresjs.org/',
          },
        ],
      },
      {
        text: 'Community',
        items: [
          { text: 'Tolle Resourcen', link: '/de/community/awesome-resources' },
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
            link: 'https://play.tresjs.org/',
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
            text: 'Beitragen',
            link: 'https://github.com/Tresjs/.github/blob/main/CONTRIBUTING.md',
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
                text: 'Nachbearbeitung',
                link: 'https://post-processing.tresjs.org/',
              },
            ],
          },
        ],
      },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          de: {
            translations: {
              button: {
                buttonText: 'Suchen',
                buttonAriaLabel: 'Suchen',
              },
              modal: {
                displayDetails: 'Detaillierte Liste anzeigen',
                resetButtonTitle: 'Suche zurücksetzen',
                backButtonTitle: 'Suche schließen',
                noResultsText: 'Keine Ergebnisse für',
                footer: {
                  selectText: 'zur Auswahl',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'zum Navigieren',
                  navigateUpKeyAriaLabel: 'Pfeil nach oben',
                  navigateDownKeyAriaLabel: 'Pfeil nach unten',
                  closeText: 'zum Schließen',
                  closeKeyAriaLabel: 'escape',
                },
              },
            },
          },
        },
      },
    },
  },
}
