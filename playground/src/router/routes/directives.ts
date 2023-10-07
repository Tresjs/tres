export const directivesRoutes = [
  {
    path: '/directives/vlog',
    name: 'vLog',
    component: () => import('../../pages/directives/vLog.vue'),
  },
  {
    path: '/directives/v-light-helper',
    name: 'vLightHelper',
    component: () => import('../../pages/directives/vLightHelper.vue'),
  },
  {
    path: '/directives/v-always-look-at',
    name: 'vAlwaysLookAt',
    component: () => import('../../pages/directives/vAlwaysLookAt.vue'),
  },
  {
    path: '/directives/v-distance-to',
    name: 'vDistanceTo',
    component: () => import('../../pages/directives/vDistanceTo.vue'),
  },
]