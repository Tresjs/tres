import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const frConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
      text: 'Suggérer un changement à cette page.',
    },
    sidebar: [
      {
        text: 'Guide',
        items: [
          // This shows `/guide/index.md` page.
          { text: 'Introduction', link: '/fr/guide/' },
          { text: 'Commencer', link: '/fr/guide/getting-started' },
          { text: 'Votre première scene', link: '/fr/guide/your-first-scene' },
          { text: 'Nuxt', link: '/fr/guide/nuxt' },
          { text: 'Résolution de problèmes', link: '/fr/guide/troubleshooting' },
          { text: 'Migration depuis la v1', link: '/fr/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/fr/api/tres-canvas' },
          {
            text: 'Instances, arguments et props',
            link: '/fr/api/instances-arguments-and-props',
          },
          {
            text: 'Composables',
            link: '/fr/api/composables',
          },
          {
            text: 'Évenements',
            link: '/fr/api/events',
          },
        ],
      },

      {
        text: 'Avancé',

        items: [
          { text: 'Étendre', link: '/fr/advanced/extending' },
          { text: 'primitive', link: '/fr/advanced/primitive' },
          {
            text: 'Mise en garde',
            link: '/fr/advanced/caveats',
          },
        ],
      },
      {
        text: 'Debug',
        items: [
          { text: 'Outils de développement', link: '/fr/debug/devtools' },
        ],
      },
      {
        text: 'Cookbook',
        link: '/fr/cookbook/',
        collapsed: true,
        items: [
          { text: 'Controles des orbites', link: '/fr/cookbook/orbit-controls' },
          { text: 'Animations de base', link: '/fr/cookbook/basic-animations' },
          { text: 'Groupes', link: '/fr/cookbook/groups' },
          { text: 'Charger des textures', link: '/fr/cookbook/load-textures' },
          { text: 'Charger des modèles', link: '/fr/cookbook/load-models' },
          { text: 'Charger du texte', link: '/fr/cookbook/text-3d' },
          { text: 'Éclairages et ombres', link: '/fr/cookbook/lights-shadows' },
          { text: 'Shaders', link: '/fr/cookbook/shaders' },
        ],
      },
      {
        text: 'Directives',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/fr/directives/v-log' },
          { text: 'v-light-helper', link: '/fr/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/fr/directives/v-always-look-at' },
          { text: 'v-distance-to', link: '/fr/directives/v-distance-to' },
          { text: 'v-rotate', link: '/directives/v-rotate' },
        ],
      },
      {
        text: 'Ecosystème',
        items: [
          {
            text: 'Cientos 💛',
            link: 'https://cientos.tresjs.org/',
          },
          {
            text: 'Module Nuxt',
            link: 'https://github.com/Tresjs/nuxt',
          },
          {
            text: 'TresLeches 🍰',
            link: 'https://tresleches.tresjs.org/',
          },
          {
            text: 'Post-processing (Bientôt)',
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/fr/guide/' },
      { text: 'API', link: '/fr/api/tres-canvas' },
      /*       { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' }, */
      { text: 'Resources', items: [
        { text: 'Équipe', link: '/fr/team.md' },
        { text: 'Versions', link: 'https://github.com/Tresjs/tres/releases' },
        {
          text: 'Playground',
          link: 'https://playground.tresjs.org/',
        },
        {
          text: 'Github',
          link: 'https://github.com/Tresjs/tres/',
        },
        {
          text: 'Problèmes',
          link: 'https://github.com/Tresjs/tres/issues',
        },
        {
          text: 'Ecosystème',
          items: [
            {
              text: 'Cientos 💛',
              link: 'https://cientos.tresjs.org/',
            },
            {
              text: 'Module Nuxt',
              link: 'https://github.com/Tresjs/nuxt',
            },
            {
              text: 'TresLeches 🍰',
              link: 'https://tresleches.tresjs.org/',
            },
          ],
        },
      ] },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          fr: {
            translations: {
              button: {
                buttonText: 'Chercher',
                buttonAriaLabel: 'Chercher',
              },
              modal: {
                displayDetails: 'Afficher la liste détaillée',
                resetButtonTitle: 'Réinitialiser la recherche',
                backButtonTitle: 'Fermer la recherche',
                noResultsText: 'Aucun résultat pour',
                footer: {
                  selectText: 'Pour selectionner',
                  selectKeyAriaLabel: 'entrer',
                  navigateText: 'Pour naviguer',
                  navigateUpKeyAriaLabel: 'Flèche du haut',
                  navigateDownKeyAriaLabel: 'Flèche du bas',
                  closeText: 'Pour fermer',
                  closeKeyAriaLabel: 'quitter',
                },
              },
            },
          },
        },
      },
    },
  },
}
