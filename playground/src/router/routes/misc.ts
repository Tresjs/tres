export const miscRoutes = [
  {
    path: '/misc',
    name: 'Text 3D',
    component: () => import('../../pages/misc/text3D/index.vue'),
  },
  {
    path: '/misc/directives',
    name: 'Directives',
    component: () => import('../../pages/misc/directives/index.vue'),
  },
]
