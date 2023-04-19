import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'pathe'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cientos',
  description: 'Collection of useful helpers and fully functional, ready-made abstractions for TresJS',
  head: [['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Introduction', link: '/guide/' }],
      },
      {
        text: 'Abstractions',
        items: [
          { text: 'Text3D', link: '/guide/abstractions/text-3d' },
          { text: 'useAnimations', link: '/guide/abstractions/use-animations' },
          { text: 'Environment', link: '/guide/abstractions/environment' },
          { text: 'useEnvironment', link: '/guide/abstractions/use-environment' },
          { text: 'usePamMouse', link: '/guide/abstractions/pam-camera-mouse' },
          { text: 'Stars', link: '/guide/abstractions/stars' },
        ],
      },
      {
        text: 'Controls',
        items: [
          { text: 'OrbitControls', link: '/guide/controls/orbit-controls' },
          { text: 'TransformControls', link: '/guide/controls/transform-controls' },
          { text: 'PointerLockControls', link: '/guide/controls/pointer-lock-controls' },
        ],
      },
      {
        text: 'Loaders',
        items: [
          { text: 'useGLTF', link: '/guide/loaders/use-gltf' },
          { text: 'GLTFModel', link: '/guide/loaders/gltf-model' },
          { text: 'useFBX', link: '/guide/loaders/use-fbx' },
          { text: 'FBXModel', link: '/guide/loaders/fbx-model' },
        ],
      },
      {
        text: 'Materials',
        collapsed: true,
        items: [{ text: 'WobbleMaterial', link: '/guide/materials/wobble-material' }],
      },
      {
        text: 'Shapes',
        collapsed: true,
        items: [
          { text: 'Box', link: '/guide/shapes/box' },
          { text: 'Circle', link: '/guide/shapes/circle' },
          { text: 'Cone', link: '/guide/shapes/cone' },
          { text: 'Dodecahedron', link: '/guide/shapes/dodecahedron' },
          { text: 'Icosahedron', link: '/guide/shapes/icosahedron' },
          { text: 'Octahedron', link: '/guide/shapes/octahedron' },
          { text: 'Plane', link: '/guide/shapes/plane' },
          { text: 'Ring', link: '/guide/shapes/ring' },
          { text: 'Sphere', link: '/guide/shapes/sphere' },
          { text: 'Tetrahedron', link: '/guide/shapes/tetrahedron' },
          { text: 'Torus', link: '/guide/shapes/torus' },
          { text: 'TorusKnot', link: '/guide/shapes/torus-knot' },
          { text: 'Tube', link: '/guide/shapes/tube' },
        ],
      },
      {
        text: 'Misc',
        items: [{ text: 'useTweakpane', link: '/guide/misc/use-tweakpane' }],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/alvarosabu' },
      { icon: 'discord', link: 'https://discord.gg/wXx63MwW' },
    ],
  },
  vite: {
    plugins: [svgLoader(), Unocss()],
    resolve: {
      alias: {
        '/@': resolve(__dirname, '../../src'),
      },
    },
  },
})
