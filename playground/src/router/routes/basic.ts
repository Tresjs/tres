export const basicRoutes = [
  {
    path: '/basic/multiple-controls',
    name: 'Multiple Controls',
    component: () => import('../../pages/basic/controls.vue'),
  },
  {
    path: '/basic/boolean',
    name: 'Boolean',
    component: () => import('../../pages/basic/boolean.vue'),
  },
]
