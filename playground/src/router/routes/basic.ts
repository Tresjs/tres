export const basicRoutes = [
  {
    path: '/basic',
    name: 'Basic',
    component: () => import('../../pages/basic/index.vue'),
  },
  {
    path: '/basic/lights',
    name: 'Lights',
    component: () => import('../../pages/basic/Lights.vue'),
  },
  {
    path: '/basic/groups',
    name: 'Groups',
    component: () => import('../../pages/basic/Groups.vue'),
  },
  {
    path: '/basic/conditional',
    name: 'Conditional',
    component: () => import('../../pages/basic/Conditional.vue'),
  },
  {
    path: '/Primitives',
    name: 'Primitives',
    component: () => import('../../pages/basic/Primitives.vue'),
  },
  {
    path: '/basic/multiple',
    name: 'Multiple',
    component: () => import('../../pages/basic/Multiple.vue'),
  },
  {
    path: '/basic/responsive',
    name: 'Responsiveness',
    component: () => import('../../pages/basic/Responsiveness.vue'),
  },
  {
    path: '/basic/pierced-props',
    name: 'Pierced Props',
    component: () => import('../../pages/basic/PiercedProps.vue'),
  },
]