export const lightShadowRoutes = [
  {
    path: '/cientos/light-shadow/accumulative-shadows',
    name: 'Accumulative Shadows',
    component: () => import('@/pages/cientos/light-shadow/AccumulativeShadowsDemo.vue'),
  },
  {
    path: '/cientos/light-shadow/bake-shadows',
    name: 'BakeShadows',
    component: () => import('@/pages/cientos/light-shadow/BakeShadowsDemo.vue'),
  },
  {
    path: '/cientos/light-shadow/circle-shadow',
    name: 'CircleShadow',
    component: () => import('@/pages/cientos/light-shadow/CircleShadowDemo.vue'),
  },
  {
    path: '/cientos/light-shadow/contact-shadows',
    name: 'ContactShadows',
    component: () => import('@/pages/cientos/light-shadow/ContactShadowsDemo.vue'),
  },
  {
    path: '/cientos/light-shadow/lensflare',
    name: 'Lensflare',
    component: () => import('@/pages/cientos/light-shadow/lensflare/index.vue'),
  },
  {
    path: '/cientos/light-shadow/lensflare-elements',
    name: 'Lensflare (elements)',
    component: () => import('@/pages/cientos/light-shadow/lensflare-elements/index.vue'),
  },
  {
    path: '/cientos/light-shadow/soft-shadows',
    name: 'SoftShadows',
    component: () => import('@/pages/cientos/light-shadow/SoftShadowsDemo.vue'),
  },
]
