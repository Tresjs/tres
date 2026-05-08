export const miscellaneousRoutes = [
  {
    path: '/cientos/miscellaneous/bounds',
    name: 'Bounds',
    component: () => import('@/pages/cientos/miscellaneous/BoundsDemo.vue'),
  },
  {
    path: '/cientos/miscellaneous/global-audio',
    name: 'GlobalAudio',
    component: () => import('@/pages/cientos/miscellaneous/GlobalAudioDemo.vue'),
  },
  {
    path: '/cientos/miscellaneous/mouse-parallax',
    name: 'MouseParallax',
    component: () => import('@/pages/cientos/miscellaneous/MouseParallaxDemo.vue'),
  },
  {
    path: '/cientos/miscellaneous/positional-audio',
    name: 'PositionalAudio',
    component: () => import('@/pages/cientos/miscellaneous/PositionalAudioDemo.vue'),
  },
  {
    path: '/cientos/miscellaneous/use-animations',
    name: 'useAnimations',
    component: () => import('@/pages/cientos/miscellaneous/use-animations/index.vue'),
  },
  {
    path: '/cientos/miscellaneous/gltf-exporter',
    name: 'GLTFExporter',
    component: () => import('@/pages/cientos/miscellaneous/GLTFExporterDemo.vue'),
  },
  {
    path: '/cientos/miscellaneous/use-intersect',
    name: 'useIntersect',
    component: () => import('@/pages/cientos/miscellaneous/useIntersect/index.vue'),
  },
  {
    path: '/cientos/miscellaneous/laptop',
    name: 'Laptop',
    component: () => import('@/pages/cientos/miscellaneous/LaptopDemo.vue'),
  },
]
