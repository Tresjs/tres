import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          // This shows `/guide/index.md` page.
          { text: 'Introduction', link: '/en/guide/' },
          { text: 'Getting Started', link: '/en/guide/getting-started' },
          { text: 'Your first Scene', link: '/en/guide/your-first-scene' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Renderer', link: '/en/api/renderer' },
          {
            text: 'Instances, arguments and props',
            link: '/en/api/instances-arguments-and-props',
          },
          {
            text: 'Composables',
            link: '/en/api/composables',
          },
          {
            text: 'Events',
            link: '/en/api/events',
          },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Orbit Controls', link: '/en/examples/orbit-controls' },
          { text: 'Basic Animations', link: '/en/examples/basic-animations' },
          { text: 'Groups', link: '/en/examples/groups' },
          { text: 'Load Textures', link: '/en/examples/load-textures' },
          { text: 'Load Models', link: '/en/examples/load-models' },
          { text: 'Load Text', link: '/en/examples/text-3d' },
        ],
      },
      {
        text: 'Advanced',

        items: [
          { text: 'Extending', link: '/en/advanced/extending' },
          {
            text: 'Caveats',
            link: '/en/advanced/caveats',
          },
        ],
      },
      {
        text: 'Cientos 💛',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/en/cientos/' },
          {
            text: 'Abstractions',
            items: [
              { text: 'Text3D', link: '/en/cientos/abstractions/text-3d' },
              { text: 'useAnimations', link: '/en/cientos/abstractions/use-animations' },
              { text: 'Environment', link: '/en/cientos/abstractions/environment' },
              { text: 'useEnvironment', link: '/en/cientos/abstractions/use-environment' },
            ],
          },
          {
            text: 'Controls',
            items: [
              { text: 'OrbitControls', link: '/en/cientos/controls/orbit-controls' },
              { text: 'TransformControls', link: '/en/cientos/controls/transform-controls' },
            ],
          },
          {
            text: 'Loaders',
            items: [
              { text: 'useGLTF', link: '/en/cientos/loaders/use-gltf' },
              { text: 'GLTFModel', link: '/en/cientos/loaders/gltf-model' },
              { text: 'useFBX', link: '/en/cientos/loaders/use-fbx' },
              { text: 'FBXModel', link: '/en/cientos/loaders/fbx-model' },
            ],
          },
          {
            text: 'Shapes',
            items: [
              { text: 'Box', link: '/en/cientos/shapes/box' },
              { text: 'Circle', link: '/en/cientos/shapes/circle' },
              { text: 'Cone', link: '/en/cientos/shapes/cone' },
              { text: 'Dodecahedron', link: '/en/cientos/shapes/dodecahedron' },
              { text: 'Icosahedron', link: '/en/cientos/shapes/icosahedron' },
              { text: 'Octahedron', link: '/en/cientos/shapes/octahedron' },
              { text: 'Plane', link: '/en/cientos/shapes/plane' },
              { text: 'Ring', link: '/en/cientos/shapes/ring' },
              { text: 'Sphere', link: '/en/cientos/shapes/sphere' },
              { text: 'Tetrahedron', link: '/en/cientos/shapes/tetrahedron' },
              { text: 'Torus', link: '/en/cientos/shapes/torus' },
              { text: 'TorusKnot', link: '/cientos/shapes/torus-knot' },
              { text: 'Tube', link: '/en/cientos/shapes/tube' },
            ],
          },
          {
            text: 'Misc',
            items: [{ text: 'useTweakpane', link: '/en/cientos/misc/use-tweakpane' }],
          },
        ],
      },
    ],
    nav: [
      { text: 'Guide', link: '/en/guide/' },
      { text: 'API', link: '/en/api/renderer' },
      /*       { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' }, */
      /*  {
        text: 'Ecosystem',
        activeMatch: `^/ecosystem/`,
        items: [
          {
            text: `Core v${version}`,
            items: [
              {
                text: 'Release Notes ',
                link: `https://github.com/Tresjs/tres/releases/tag/%40tresjs%2Fcore%40${version}`,
              },
            ],
          },
          {
            text: `Cientos v${cientosVersion}`,
            items: [
              {
                text: 'Release Notes ',
                link: `https://github.com/Tresjs/tres/releases/tag/%40tresjs%2Fcientos%40${cientosVersion}`,
              },
            ],
          },
        ],
      }, */
    ],
  },
}
