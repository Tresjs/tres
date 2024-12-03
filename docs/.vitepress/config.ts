import { resolve } from 'pathe'
import { defineConfig } from 'vitepress'

const whitelist = ['TresCanvas', 'TresLeches', 'TresScene']

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cientos',
  description:
    'Collection of useful helpers and fully functional, ready-made abstractions for TresJS',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#82DBC5' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tresjs_dev' }],
    ['meta', { name: 'twitter:creator', content: '@tresjs_dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cientos - TresJS' }],
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://repository-images.githubusercontent.com/571314349/10996566-7f70-473b-a8e5-4e56fc0ca850',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content:
          'https://repository-images.githubusercontent.com/571314349/10996566-7f70-473b-a8e5-4e56fc0ca850',
      },
    ],
    [
      'script',
      {
        'defer': 'true',
        'data-site': 'OWBUVCJK',
        'src': 'https://cdn.usefathom.com/script.js',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/component-list/' },
      { text: 'Examples', link: 'https://lab.tresjs.org/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Migration from v3', link: '/guide/migrating-from-v3' },
        ],
      },
      {
        text: 'Abstractions',
        items: [
          { text: 'Text3D', link: '/guide/abstractions/text-3d' },
          { text: 'Levioso (Float)', link: '/guide/abstractions/levioso' },
          { text: 'useAnimations', link: '/guide/abstractions/use-animations' },
          { text: 'MouseParallax', link: '/guide/abstractions/mouse-parallax' },
          { text: 'Lensflare', link: '/guide/abstractions/lensflare' },
          { text: 'Reflector', link: '/guide/abstractions/reflector' },
          { text: 'GlobalAudio', link: '/guide/abstractions/global-audio' },
          { text: 'Fbo', link: '/guide/abstractions/fbo' },
          { text: 'useFBO', link: '/guide/abstractions/use-fbo' },
          { text: 'useSurfaceSampler', link: '/guide/abstractions/use-surface-sampler' },
          { text: 'Sampler', link: '/guide/abstractions/sampler' },
          { text: 'AnimatedSprite', link: '/guide/abstractions/animated-sprite' },
          { text: 'Billboard', link: '/guide/abstractions/billboard' },
        ],
      },
      {
        text: 'Controls',
        items: [
          { text: 'OrbitControls', link: '/guide/controls/orbit-controls' },
          { text: 'CameraControls', link: '/guide/controls/camera-controls' },
          { text: 'TransformControls', link: '/guide/controls/transform-controls' },
          { text: 'PointerLockControls', link: '/guide/controls/pointer-lock-controls' },
          { text: 'KeyboardControls', link: '/guide/controls/keyboard-controls' },
          { text: 'ScrollControls', link: '/guide/controls/scroll-controls' },
          { text: 'MapControls', link: '/guide/controls/map-controls' },
        ],
      },
      {
        text: 'Loaders',
        items: [
          { text: 'useProgress', link: '/guide/loaders/use-progress' },
          { text: 'useGLTF', link: '/guide/loaders/use-gltf' },
          { text: 'GLTFModel', link: '/guide/loaders/gltf-model' },
          { text: 'useFBX', link: '/guide/loaders/use-fbx' },
          { text: 'FBXModel', link: '/guide/loaders/fbx-model' },
          { text: 'useVideoTexture', link: '/guide/loaders/use-video-texture' },
          { text: 'SVG', link: '/guide/loaders/svg' },
        ],
      },
      {
        text: 'Materials',
        collapsed: true,
        items: [
          { text: 'WobbleMaterial', link: '/guide/materials/wobble-material' },
          { text: 'MeshGlassMaterial', link: '/guide/materials/glass-material' },
          { text: 'CustomShaderMaterial', link: '/guide/materials/custom-shader-material' },
          { text: 'MeshReflectionMaterial', link: '/guide/materials/mesh-reflection-material' },
          { text: 'MeshDiscardMaterial', link: '/guide/materials/mesh-discard-material' },
        ],
      },
      {
        text: 'Shapes',
        collapsed: true,
        items: [
          { text: 'Box', link: '/guide/shapes/box' },
          { text: 'CatmullRomCurve3', link: '/guide/shapes/catmullromcurve3' },
          { text: 'Circle', link: '/guide/shapes/circle' },
          { text: 'Cone', link: '/guide/shapes/cone' },
          { text: 'Cylinder', link: '/guide/shapes/cylinder' },
          { text: 'Dodecahedron', link: '/guide/shapes/dodecahedron' },
          { text: 'Icosahedron', link: '/guide/shapes/icosahedron' },
          { text: 'Line2', link: '/guide/shapes/line2' },
          { text: 'Octahedron', link: '/guide/shapes/octahedron' },
          { text: 'Plane', link: '/guide/shapes/plane' },
          { text: 'Ring', link: '/guide/shapes/ring' },
          { text: 'RoundedBox', link: '/guide/shapes/rounded-box' },
          { text: 'Sphere', link: '/guide/shapes/sphere' },
          { text: 'Superformula', link: '/guide/shapes/superformula' },
          { text: 'Tetrahedron', link: '/guide/shapes/tetrahedron' },
          { text: 'Torus', link: '/guide/shapes/torus' },
          { text: 'TorusKnot', link: '/guide/shapes/torus-knot' },
          { text: 'Tube', link: '/guide/shapes/tube' },
        ],
      },
      {
        text: 'Staging',
        items: [
          { text: 'Backdrop', link: '/guide/staging/backdrop' },
          { text: 'Environment', link: '/guide/staging/environment' },
          { text: 'useEnvironment', link: '/guide/staging/use-environment' },
          { text: 'Sky', link: '/guide/staging/sky' },
          { text: 'Stars', link: '/guide/staging/stars' },
          { text: 'Smoke', link: '/guide/staging/smoke' },
          { text: 'ContactShadows', link: '/guide/staging/contact-shadows' },
          { text: 'Precipitation', link: '/guide/staging/precipitation' },
          { text: 'Sparkles', link: '/guide/staging/sparkles' },
          { text: 'Ocean', link: '/guide/staging/ocean' },
        ],
      },
      {
        text: 'Misc',
        collapsed: true,
        items: [
          { text: 'Stats', link: '/guide/misc/stats' },
          { text: 'Html', link: '/guide/misc/html-component' },
          { text: 'StatsGl', link: '/guide/misc/stats-gl' },
          { text: 'useGLTFExporter', link: '/guide/misc/use-gltf-exporter' },
          { text: 'BakeShadows', link: '/guide/misc/bake-shadows' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tresjs/cientos' },
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://discord.gg/UCr96AQmWn' },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ['vitepress'],
      include: ['three'],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        '@tresjs/cientos': resolve(__dirname, '../../dist/trescientos.js'),
      },
      dedupe: ['three'],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          (tag.startsWith('Tres') && !whitelist.includes(tag))
          || tag === 'primitive',
      },
    },
  },
})
