export const basicRoutes = [
  {
    path: '/basic/multiple-controls',
    name: 'Multiple Controls',
    component: () => import('../../pages/basic/MultipleControlsDemo.vue'),
  },
  {
    path: '/basic/boolean',
    name: 'Boolean Control',
    component: () => import('../../pages/basic/BooleanControlDemo.vue'),
  },
  {
    path: '/basic/color',
    name: 'Color Control',
    component: () => import('../../pages/basic/ColorControlDemo.vue'),
  },
  {
    path: '/basic/vector',
    name: 'Vector Control',
    component: () => import('../../pages/basic/VectorControlDemo.vue'),
  },
  {
    path: '/basic/select',
    name: 'Select Control',
    component: () => import('../../pages/basic/SelectControlDemo.vue'),
  },
]
