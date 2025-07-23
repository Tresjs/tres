import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const esConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/docs/:path',
      text: 'Sugerir cambios a esta página',
    },
    sidebar: [
      {
        text: 'Guía',
        items: [
          // Esto muestra la página `/guide/index.md`.
          { text: 'Introducción', link: '/es/guide/' },
          { text: 'Empezando', link: '/es/guide/getting-started' },
          { text: 'Tu primera Escena', link: '/es/guide/your-first-scene' },
          { text: 'Nuxt', link: '/es/guide/nuxt' },
          { text: 'Solución de problemas', link: '/es/guide/troubleshooting' },
          { text: 'Migración desde v1', link: '/es/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/es/api/tres-canvas' },
          {
            text: 'Instancias, argumentos y props',
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
        text: 'Avanzado',

        items: [
          { text: 'Extender', link: '/es/advanced/extending' },
          { text: 'Primitive', link: '/es/advanced/primitive' },
          {
            text: 'Advertencias',
            link: '/es/advanced/caveats',
          },
        ],
      },
      {
        text: 'Depuración',
        items: [
          { text: 'Herramientas de desarrollo', link: '/es/debug/devtools' },
        ],
      },
      {
        text: 'Recetario 🍳🧑‍🍳',
        link: '/es/cookbook/',
        items: [
          { text: 'Controles de órbita', link: '/es/cookbook/orbit-controls' },
          { text: 'Animaciones básicas', link: '/es/cookbook/basic-animations' },
          { text: 'Advanced Animations', link: '/es/cookbook/advanced-animations' },
          { text: 'Grupos', link: '/es/cookbook/groups' },
          { text: 'Cargar texturas', link: '/es/cookbook/load-textures' },
          { text: 'Cargar modelos', link: '/es/cookbook/load-models' },
          { text: 'Cargar texto', link: '/es/cookbook/text-3d' },
          { text: 'Luces y sombras', link: '/es/cookbook/lights-shadows' },
          { text: 'Shaders', link: '/es/cookbook/shaders' },
        ],
      },
      {
        text: 'Directivas',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/es/directives/v-log' },
          { text: 'v-light-helper', link: '/es/directives/v-light-helper' },
          { text: 'v-distance-to', link: '/es/directives/v-distance-to' },
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
            text: 'Módulo Nuxt',
            link: 'https://github.com/Tresjs/nuxt',
          },
          {
            text: 'TresLeches 🍰',
            link: 'https://tresleches.tresjs.org/',
          },
          {
            text: 'Post-procesamiento',
            link: 'https://post-processing.tresjs.org/',
          },
        ],
      },
      {
        text: 'Comunidad',
        items: [
          { text: 'Recursos increíbles', link: '/es/community/awesome-resources' },
        ],
      },
    ],
    nav: [
      { text: 'Guía', link: '/es/guide/' },
      { text: 'API', link: '/es/api/tres-canvas' },
      /*       { text: 'API', link: '/es/api/' },
      { text: 'Configuración', link: '/es/config/' }, */
      {
        text: 'Recursos',
        items: [
          { text: 'Equipo', link: '/es/team' },
          { text: 'Versiones', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'Playground',
            link: 'https://play.tresjs.org/',
          },
          {
            text: 'Github',
            link: 'https://github.com/Tresjs/tres/',
          },
          {
            text: 'Problemas',
            link: 'https://github.com/Tresjs/tres/issues',
          },
          {
            text: 'Contribuir',
            link: 'https://github.com/Tresjs/.github/blob/main/CONTRIBUTING.md',
          },
          {
            text: 'Ecosistema',
            items: [
              {
                text: 'Cientos 💛',
                link: 'https://cientos.tresjs.org/',
              },
              {
                text: 'Módulo Nuxt',
                link: 'https://github.com/Tresjs/nuxt',
              },
              {
                text: 'TresLeches 🍰',
                link: 'https://tresleches.tresjs.org/',
              },
              {
                text: 'Post-procesamiento',
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
          es: {
            translations: {
              button: {
                buttonText: 'Buscar',
                buttonAriaLabel: 'Buscar',
              },
              modal: {
                displayDetails: 'Mostrar lista detallada',
                resetButtonTitle: 'Restablecer búsqueda',
                backButtonTitle: 'Cerrar búsqueda',
                noResultsText: 'Sin resultados para',
                footer: {
                  selectText: 'para seleccionar',
                  selectKeyAriaLabel: 'entrar',
                  navigateText: 'para navegar',
                  navigateUpKeyAriaLabel: 'flecha arriba',
                  navigateDownKeyAriaLabel: 'flecha abajo',
                  closeText: 'para cerrar',
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
