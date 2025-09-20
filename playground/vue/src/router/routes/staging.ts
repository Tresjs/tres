export const stagingRoutes = [
  {
    path: '/staging/smoke',
    name: 'Smoke',
    component: () => import('../../pages/staging/SmokeDemo.vue'),
  },
  {
    path: '/staging/precipitation',
    name: 'Precipitation',
    component: () => import('../../pages/staging/PrecipitationDemo.vue'),
  },
  {
    path: '/staging/stars',
    name: 'Stars',
    component: () => import('../../pages/staging/StarsDemo.vue'),
  },
  {
    path: '/staging/environment',
    name: 'Environment',
    component: () => import('../../pages/staging/environment/EnvironmentDemo.vue'),
  },
  {
    path: '/staging/backdrop',
    name: 'Backdrop',
    component: () => import('../../pages/staging/CircleShadowDemo.vue'),
  },
  {
    path: '/staging/contact-shadows',
    name: 'ContactShadows',
    component: () => import('../../pages/staging/ContactShadowsDemo.vue'),
  },
  {
    path: '/staging/sky',
    name: 'Sky',
    component: () => import('../../pages/staging/SkyDemo.vue'),
  },
  {
    path: '/staging/sparkles',
    name: 'Sparkles',
    component: () => import('../../pages/staging/SparklesDemo.vue'),
  },
  {
    path: '/staging/ocean',
    name: 'Ocean',
    component: () => import('../../pages/staging/OceanDemo.vue'),
  },
  {
    path: '/staging/bounds',
    name: 'Bounds',
    component: () => import('../../pages/staging/BoundsDemo.vue'),
  },
  {
    path: '/staging/fit',
    name: 'Fit',
    component: () => import('../../pages/staging/fit/index.vue'),
  },
  {
    path: '/staging/align',
    name: 'Align',
    component: () => import('../../pages/staging/AlignDemo.vue'),
  },
  {
    path: '/staging/soft-shadows',
    name: 'SoftShadows',
    component: () => import('../../pages/staging/SoftShadowsDemo.vue'),
  },
  {
    path: '/staging/grid',
    name: 'Grid',
    component: () => import('../../pages/staging/GridDemo.vue'),
  },
  {
    path: '/staging/circle-shadow',
    name: 'CircleShadow',
    component: () => import('../../pages/staging/CircleShadowDemo.vue'),
  },
  {
    path: '/staging/accumulative-shadows',
    name: 'Accumulative Shadows',
    component: () => import('../../pages/staging/AccumulativeShadowsDemo.vue'),
  },
  {
    path: '/staging/stage',
    name: 'Stage',
    component: () => import('../../pages/staging/StageDemo.vue'),
  },
]
