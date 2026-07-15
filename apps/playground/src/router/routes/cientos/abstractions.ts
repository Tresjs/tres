export const abstractionsRoutes = [
  {
    path: '/cientos/abstractions/levioso',
    name: 'Levioso',
    component: () => import('@/pages/cientos/abstractions/LeviosoDemo.vue'),
  },
  {
    path: '/cientos/abstractions/billboard',
    name: 'Billboard',
    component: () => import('@/pages/cientos/abstractions/BillboardDemo.vue'),
  },
  {
    path: '/cientos/abstractions/edges',
    name: 'Edges',
    component: () => import('@/pages/cientos/abstractions/EdgesDemo.vue'),
  },
  {
    path: '/cientos/abstractions/decal',
    name: 'Decal',
    component: () => import('@/pages/cientos/abstractions/DecalDemo.vue'),
  },
  {
    path: '/cientos/abstractions/mask',
    name: 'Mask',
    component: () => import('@/pages/cientos/abstractions/MaskDemo.vue'),
  },
  {
    path: '/cientos/abstractions/outline',
    name: 'Outline',
    component: () => import('@/pages/cientos/abstractions/OutlineDemo.vue'),
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
    path: '/cientos/abstractions/screen-space',
    name: 'ScreenSpace',
    component: () => import('@/pages/cientos/abstractions/ScreenSpaceDemo.vue'),
  },
  {
    path: '/cientos/abstractions/screen-sizer',
    name: 'ScreenSizer',
    component: () => import('@/pages/cientos/abstractions/ScreenSizerDemo.vue'),
  },
  {
    path: '/cientos/abstractions/camera-shake',
    name: 'CameraShake',
    component: () => import('@/pages/cientos/abstractions/CameraShakeDemo.vue'),
  },
  {
    path: '/cientos/abstractions/align',
    name: 'Align',
    component: () => import('@/pages/cientos/abstractions/AlignDemo.vue'),
  },
  {
    path: '/cientos/abstractions/fit',
    name: 'Fit',
    component: () => import('@/pages/cientos/abstractions/fit/index.vue'),
  },
]
