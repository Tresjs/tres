import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const esConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
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
          { text: 'primitive', link: '/es/advanced/primitive' },
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
        text: 'Ejemplos',
        collapsed: true,
        items: [
          { text: 'Controles de órbita', link: '/es/examples/orbit-controls' },
          { text: 'Animaciones básicas', link: '/es/examples/basic-animations' },
          { text: 'Grupos', link: '/es/examples/groups' },
          { text: 'Cargar texturas', link: '/es/examples/load-textures' },
          { text: 'Cargar modelos', link: '/es/examples/load-models' },
          { text: 'Cargar texto', link: '/es/examples/text-3d' },
          { text: 'Luces y sombras', link: '/es/examples/lights-shadows' },
          { text: 'Shaders', link: '/es/examples/shaders' },
        ],
      },
      {
        text: 'Directivas',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/es/directives/v-log' },
          { text: 'v-light-helper', link: '/es/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/es/directives/v-always-look-at' },
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
            text: 'Post-procesamiento (Próximamente)',
          },
        ],
      },
    ],
    nav: [
      { text: 'Guía', link: '/es/guide/' },
      { text: 'API', link: '/es/api/tres-canvas' },
      /*       { text: 'API', link: '/es/api/' },
      { text: 'Configuración', link: '/es/config/' }, */
      { text: 'Recursos',
        items: [
          { text: 'Equipo', link: '/es/team' },
          { text: 'Versiones', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'Playground',
            link: 'https://playground.tresjs.org/',
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
