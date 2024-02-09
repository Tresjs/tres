import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const plConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: "https://github.com/tresjs/tres/edit/main/packages/docs/:path",
      text: "Zaproponuj zmiany na tej stronie",
    },
    sidebar: [
      {
        text: "Przewodnik",
        items: [
          // Esto muestra la página `/guide/index.md`.
          { text: "Wstęp", link: "/pl/guide/" },
          { text: "Pierwsze kroki", link: "/pl/guide/getting-started" },
          { text: "Twoja pierwsza scena", link: "/pl/guide/your-first-scene" },
          { text: "Nuxt", link: "/pl/guide/nuxt" },
          {
            text: "Rozwiązywanie problemów",
            link: "/pl/guide/troubleshooting",
          },
          { text: "Migracja z v1", link: "/pl/guide/migration-guide" },
        ],
      },
      {
        text: "API",
        items: [
          { text: "TresCanvas", link: "/pl/api/tres-canvas" },
          {
            text: "Instancje, argumenty i właściwości",
            link: "/pl/api/instances-arguments-and-props",
          },
          {
            text: "Komponowalne",
            link: "/pl/api/composables",
          },
          {
            text: "Wydarzenia",
            link: "/pl/api/events",
          },
        ],
      },

      {
        text: "Zaawansowany",

        items: [
          { text: "Rozszerzanie", link: "/pl/advanced/extending" },
          { text: "Prymitywny", link: "/pl/advanced/primitive" },
          {
            text: "Zastrzeżenia",
            link: "/pl/advanced/caveats",
          },
        ],
      },
      {
        text: "Znajdowanie",
        items: [
          { text: "Narzędzia deweloperskie", link: "/pl/debug/devtools" },
        ],
      },
      {
        text: "Przykłady",
        collapsed: true,
        items: [
          { text: "Sterowanie orbitą", link: "/pl/examples/orbit-controls" },
          {
            text: "Podstawowe animacje",
            link: "/pl/examples/basic-animations",
          },
          { text: "Grupy", link: "/pl/examples/groups" },
          { text: "Ładowanie tekstur", link: "/pl/examples/load-textures" },
          { text: "Ładowanie modelu", link: "/pl/examples/load-models" },
          { text: "Ładowanie tekstu", link: "/pl/examples/text-3d" },
          { text: "Światła i cienie", link: "/pl/examples/lights-shadows" },
          { text: "Shadery", link: "/pl/examples/shaders" },
        ],
      },
      {
        text: "Dyrektywy",
        collapsed: true,
        items: [
          { text: "v-log", link: "/pl/directives/v-log" },
          { text: "v-light-helper", link: "/pl/directives/v-light-helper" },
          { text: "v-always-look-at", link: "/pl/directives/v-always-look-at" },
          { text: "v-distance-to", link: "/pl/directives/v-distance-to" },
        ],
      },
      {
        text: "Ekosystem",
        items: [
          {
            text: "Cientos 💛",
            link: "https://cientos.tresjs.org/",
          },
          {
            text: "Nuxt module",
            link: "https://github.com/Tresjs/nuxt",
          },
          {
            text: "TresLeches 🍰",
            link: "https://tresleches.tresjs.org/",
          },
          {
            text: "Post-processing (wkrótce)",
          },
        ],
      },
    ],
    nav: [
      { text: "Przewodnik", link: "/pl/guide/" },
      { text: "API", link: "/pl/api/tres-canvas" },
      /*       { text: 'API', link: '/pl/api/' },
      { text: 'Konfiguracja', link: '/pl/config/' }, */
      {
        text: "Zasoby",
        items: [
          { text: "Zespół", link: "/pl/team" },
          { text: "Wydania", link: "https://github.com/Tresjs/tres/releases" },
          {
            text: "Plac zabaw",
            link: "https://playground.tresjs.org/",
          },
          {
            text: "Github",
            link: "https://github.com/Tresjs/tres/",
          },
          {
            text: "Problemy",
            link: "https://github.com/Tresjs/tres/issues",
          },
          {
            text: "Ekosystem",
            items: [
              {
                text: "Cientos 💛",
                link: "https://cientos.tresjs.org/",
              },
              {
                text: "Módulo Nuxt",
                link: "https://github.com/Tresjs/nuxt",
              },
              {
                text: "TresLeches 🍰",
                link: "https://tresleches.tresjs.org/",
              },
            ],
          },
        ],
      },
    ],
  },
};
