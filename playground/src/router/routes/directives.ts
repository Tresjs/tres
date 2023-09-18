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
]