import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const nlConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
      text: 'Stel wijzigingen op deze pagina voor',
    },
    sidebar: [
      {
        text: 'Gids',
        items: [
          // This shows `/guide/index.md` page.
          { text: 'Introductie', link: '/nl/guide/' },
          { text: 'Aan de slag', link: '/nl/guide/getting-started' },
          { text: 'Je eerste scene', link: '/nl/guide/your-first-scene' },
          { text: 'Nuxt', link: '/nl/guide/nuxt' },
          { text: 'Problemen oplossen', link: '/nl/guide/troubleshooting' },
          { text: 'Migreren vanaf v1', link: '/nl/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/nl/api/tres-canvas' },
          {
            text: 'Instanties, argumenten en props',
            link: '/nl/api/instances-arguments-and-props',
          },
          {
            text: 'Composables',
            link: '/nl/api/composables',
          },
          {
            text: 'Events',
            link: '/nl/api/events',
          },
        ],
      },

      {
        text: 'Geavanceerd',

        items: [
          { text: 'Uitbreiden', link: '/nl/advanced/extending' },
          { text: 'Primitive', link: '/nl/advanced/primitive' },
          {
            text: 'Waarschuwingen',
            link: '/nl/advanced/caveats',
          },
        ],
      },
      {
        text: 'Foutopsporing',
        items: [
          { text: 'Ontwikkelingstools', link: '/nl/debug/devtools' },
        ],
      },
      {
        text: 'Kookboek 🍳🧑‍🍳',
        link: '/nl/cookbook/',
        items: [
          { text: 'Orbit Controls', link: '/nl/cookbook/orbit-controls' },
          { text: 'Basis Animaties', link: '/nl/cookbook/basic-animations' },
          { text: 'Groepen', link: '/nl/cookbook/groups' },
          { text: 'Textures laden', link: '/nl/cookbook/load-textures' },
          { text: 'Modellen laden', link: '/nl/cookbook/load-models' },
          { text: 'Text laden', link: '/nl/cookbook/text-3d' },
          { text: 'Lichten en Schaduwen', link: '/nl/cookbook/lights-shadows' },
          { text: 'Shaders', link: '/nl/cookbook/shaders' },
        ],
      },
      {
        text: 'Richtlijnen',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/nl/directives/v-log' },
          { text: 'v-light-helper', link: '/nl/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/nl/directives/v-always-look-at' },
          { text: 'v-distance-to', link: '/nl/directives/v-distance-to' },
        ],
      },
      {
        text: 'Ecosysteem',
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
            text: 'Nabewerking (binnenkort)',
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/nl/guide/' },
      { text: 'API', link: '/nl/api/tres-canvas' },
      /*       { text: 'API', link: '/nl/api/' },
      { text: 'Config', link: '/nl/config/' }, */
      { text: 'Resources',
        items: [
          { text: 'Team', link: '/nl/team' },
          { text: 'Releases', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'Speelplaats',
            link: 'https://play.tresjs.org/',
          },
          {
            text: 'Github',
            link: 'https://github.com/Tresjs/tres/',
          },
          {
            text: 'Problemen',
            link: 'https://github.com/Tresjs/tres/issues',
          },
          {
            text: 'Ecosysteem',
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
    search: {
      provider: 'local',
      options: {
        locales: {
          nl: {
            translations: {
              button: {
                buttonText: 'Zoeken',
                buttonAriaLabel: 'Zoeken',
              },
              modal: {
                displayDetails: 'Gedetailleerde lijst bekijken',
                resetButtonTitle: 'Zoeken resetten',
                backButtonTitle: 'Zoeken sluiten',
                noResultsText: 'Geen resultaten voor',
                footer: {
                  selectText: 'Selecteren',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'Navigeren naar',
                  navigateUpKeyAriaLabel: 'Pijl omhoog',
                  navigateDownKeyAriaLabel: 'Pijl omlaag',
                  closeText: 'Sluiten',
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
