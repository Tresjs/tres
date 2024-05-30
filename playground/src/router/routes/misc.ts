export const miscRoutes = [
  {
    path: '/misc',
    name: 'Text 3D',
    component: () => import('../../pages/misc/Text3DDemo.vue'),
  },
  {
    path: '/misc/directives',
    name: 'Directives',
    component: () => import('../../pages/misc/Directives.vue'),
  },
]
