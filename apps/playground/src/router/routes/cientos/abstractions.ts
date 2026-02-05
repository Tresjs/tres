export const abstractionsRoutes = [
  {
    path: '/cientos/abstractions/levioso',
    name: 'Levioso',
    component: () => import('@/pages/cientos/abstractions/LeviosoDemo.vue'),
  },
  {
    path: '/cientos/abstractions/text-3d',
    name: 'Text3D',
    component: () => import('@/pages/cientos/abstractions/Text3DDemo.vue'),
  },
  {
    path: '/cientos/abstractions/mouse-parallax',
    name: 'MouseParallax',
    component: () => import('@/pages/cientos/abstractions/MouseParallaxDemo.vue'),
  },
  {
    path: '/cientos/abstractions/lensflare',
    name: 'Lensflare',
    component: () => import('@/pages/cientos/abstractions/lensflare/index.vue'),
  },
  {
    path: '/cientos/abstractions/reflector-mesh',
    name: 'ReflectorMeshDemo',
    component: () => import('@/pages/cientos/abstractions/ReflectorMeshDemo.vue'),
  },
  {
    path: '/cientos/abstractions/global-audio',
    name: 'GlobalAudio',
    component: () => import('@/pages/cientos/abstractions/GlobalAudioDemo.vue'),
  },
  {
    path: '/cientos/abstractions/fbo',
    name: 'Fbo',
    component: () => import('@/pages/cientos/abstractions/fbo/index.vue'),
  },
  {
    path: '/cientos/abstractions/use-fbo',
    name: 'useFbo',
    component: () => import('@/pages/cientos/abstractions/fbo/useFBODemo.vue'),
  },
  {
    path: '/cientos/abstractions/use-surface-sampler',
    name: 'useSampler',
    component: () => import('@/pages/cientos/abstractions/useSurfaceSampler.vue'),
  },
  {
    path: '/cientos/abstractions/sampler',
    name: 'Sampler',
    component: () => import('@/pages/cientos/abstractions/Sampler.vue'),
  },
  {
    path: '/cientos/abstractions/edges',
    name: 'Edges',
    component: () => import('@/pages/cientos/abstractions/EdgesDemo.vue'),
  },
  {
    path: '/cientos/abstractions/positional-audio',
    name: 'PositionalAudio',
    component: () => import('@/pages/cientos/abstractions/PositionalAudioDemo.vue'),
  },
  {
    path: '/cientos/abstractions/animated-sprite',
    name: 'AnimatedSprite',
    component: () => import('@/pages/cientos/abstractions/AnimatedSpriteDemo.vue'),
  },
  {
    path: '/cientos/abstractions/marching-cubes',
    name: 'MarchingCubes',
    component: () => import('@/pages/cientos/abstractions/MarchingCubesDemo.vue'),
  },
  {
    path: '/cientos/abstractions/mask',
    name: 'Mask',
    component: () => import('@/pages/cientos/abstractions/MaskDemo.vue'),
  },
  {
    path: '/cientos/abstractions/cube-camera',
    name: 'CubeCamera',
    component: () => import('@/pages/cientos/abstractions/CubeCameraDemo.vue'),
  },
  {
    path: '/cientos/abstractions/gradient-texture',
    name: 'GradientTexture',
    component: () => import('@/pages/cientos/abstractions/GradientTextureDemo.vue'),
  },
  {
    path: '/cientos/abstractions/screen-space',
    name: 'ScreenSpace',
    component: () => import('@/pages/cientos/abstractions/ScreenSpaceDemo.vue'),
  },
  {
    path: '/cientos/abstractions/outline',
    name: 'Outline',
    component: () => import('@/pages/cientos/abstractions/OutlineDemo.vue'),
  },
  {
    path: '/cientos/abstractions/image',
    name: 'Image',
    component: () => import('@/pages/cientos/abstractions/ImageDemo.vue'),
  },
  {
    path: '/cientos/abstractions/billboard',
    name: 'Billboard',
    component: () => import('@/pages/cientos/abstractions/BillboardDemo.vue'),
  },
  {
    path: '/cientos/abstractions/screen-sizer',
    name: 'ScreenSizer',
    component: () => import('@/pages/cientos/abstractions/ScreenSizerDemo.vue'),
  },
  {
    path: '/cientos/abstractions/use-animations',
    name: 'useAnimations',
    component: () => import('@/pages/cientos/abstractions/use-animations/index.vue'),
  },
]
