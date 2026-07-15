export const stagingRoutes = [
  {
    path: '/cientos/staging/smoke',
    name: 'Smoke',
    component: () => import('@/pages/cientos/staging/SmokeDemo.vue'),
  },
  {
    path: '/cientos/staging/precipitation',
    name: 'Precipitation',
    component: () => import('@/pages/cientos/staging/PrecipitationDemo.vue'),
  },
  {
    path: '/cientos/staging/stars',
    name: 'Stars',
    component: () => import('@/pages/cientos/staging/StarsDemo.vue'),
  },
  {
    path: '/cientos/staging/environment',
    name: 'Environment',
    component: () => import('@/pages/cientos/staging/environment/EnvironmentDemo.vue'),
  },
  {
    path: '/cientos/staging/backdrop',
    name: 'Backdrop',
    component: () => import('@/pages/cientos/staging/BackdropDemo.vue'),
  },
  {
    path: '/cientos/staging/sky',
    name: 'Sky',
    component: () => import('@/pages/cientos/staging/SkyDemo.vue'),
  },
  {
    path: '/cientos/staging/sparkles',
    name: 'Sparkles',
    component: () => import('@/pages/cientos/staging/SparklesDemo.vue'),
  },
  {
    path: '/cientos/staging/ocean',
    name: 'Ocean',
    component: () => import('@/pages/cientos/staging/OceanDemo.vue'),
  },
  {
    path: '/cientos/staging/stage',
    name: 'Stage',
    component: () => import('@/pages/cientos/staging/StageDemo.vue'),
  },
]
