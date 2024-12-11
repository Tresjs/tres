export const abstractionsRoutes = [
  {
    path: '/abstractions/levioso',
    name: 'Levioso',
    component: () => import('../../pages/abstractions/LeviosoDemo.vue'),
  },
  {
    path: '/abstractions/text-3d',
    name: 'Text3D',
    component: () => import('../../pages/abstractions/Text3DDemo.vue'),
  },
  {
    path: '/abstractions/mouse-parallax',
    name: 'MouseParallax',
    component: () => import('../../pages/abstractions/MouseParallaxDemo.vue'),
  },
  {
    path: '/abstractions/lensflare',
    name: 'Lensflare',
    component: () => import('../../pages/abstractions/lensflare/index.vue'),
  },
  {
    path: '/abstractions/reflector-mesh',
    name: 'ReflectorMeshDemo',
    component: () => import('../../pages/abstractions/ReflectorMeshDemo.vue'),
  },
  {
    path: '/abstractions/global-audio',
    name: 'GlobalAudio',
    component: () => import('../../pages/abstractions/GlobalAudioDemo.vue'),
  },
  {
    path: '/abstractions/fbo',
    name: 'Fbo',
    component: () => import('../../pages/abstractions/fbo/index.vue'),
  },
  {
    path: '/abstractions/use-fbo',
    name: 'useFbo',
    component: () => import('../../pages/abstractions/fbo/useFBODemo.vue'),
  },
  {
    path: '/abstractions/use-surface-sampler',
    name: 'useSampler',
    component: () => import('../../pages/abstractions/useSurfaceSampler.vue'),
  },
  {
    path: '/abstractions/sampler',
    name: 'Sampler',
    component: () => import('../../pages/abstractions/Sampler.vue'),
  },
  {
    path: '/abstractions/edges',
    name: 'Edges',
    component: () => import('../../pages/abstractions/EdgesDemo.vue'),
  },
  {
    path: '/abstractions/positional-audio',
    name: 'PositionalAudio',
    component: () => import('../../pages/abstractions/PositionalAudioDemo.vue'),
  },
  {
    path: '/abstractions/animated-sprite',
    name: 'AnimatedSprite',
    component: () => import('../../pages/abstractions/AnimatedSpriteDemo.vue'),
  },
  {
    path: '/abstractions/mask',
    name: 'Mask',
    component: () => import('../../pages/abstractions/MaskDemo.vue'),
  },
  {
    path: '/abstractions/cube-camera',
    name: 'CubeCamera',
    component: () => import('../../pages/abstractions/CubeCameraDemo.vue'),
  },
  {
    path: '/abstractions/gradient-texture',
    name: 'GradientTexture',
    component: () => import('../../pages/abstractions/GradientTextureDemo.vue'),
  },
  {
    path: '/abstractions/screen-space',
    name: 'ScreenSpace',
    component: () => import('../../pages/abstractions/ScreenSpaceDemo.vue'),
  },
  {
    path: '/abstractions/outline',
    name: 'Outline',
    component: () => import('../../pages/abstractions/OutlineDemo.vue'),
  },
  {
    path: '/abstractions/image',
    name: 'Image',
    component: () => import('../../pages/abstractions/ImageDemo.vue'),
  },
  {
    path: '/abstractions/billboard',
    name: 'Billboard',
    component: () => import('../../pages/abstractions/BillboardDemo.vue'),
  },
  {
    path: '/abstractions/screen-sizer',
    name: 'ScreenSizer',
    component: () => import('../../pages/abstractions/ScreenSizerDemo.vue'),
  },
]
