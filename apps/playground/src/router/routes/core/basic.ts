export const basicRoutes = [
  {
    path: '/core/basic',
    name: 'Basic',
    component: () => import('../../../pages/basic/index.vue'),
  },
  {
    path: '/core/basic/lights',
    name: 'Lights',
    component: () => import('../../../pages/basic/Lights.vue'),
  },
  {
    path: '/core/basic/groups',
    name: 'Groups',
    component: () => import('../../../pages/basic/groups/index.vue'),
  },
  {
    path: '/core/basic/conditional',
    name: 'Conditional',
    component: () => import('../../../pages/basic/Conditional.vue'),
  },
  {
    path: '/core/basic/primitives',
    name: 'Primitives',
    component: () => import('../../../pages/basic/Primitives.vue'),
  },
  {
    path: '/core/basic/multiple',
    name: 'Multiple',
    component: () => import('../../../pages/basic/Multiple.vue'),
  },
  {
    path: '/core/basic/responsive',
    name: 'Responsiveness',
    component: () => import('../../../pages/basic/Responsiveness.vue'),
  },
  {
    path: '/core/basic/onCallbacks',
    name: 'on... callbacks',
    component: () => import('../../../pages/basic/OnCallbacks.vue'),
  },
  {
    path: '/core/basic/pierced-props',
    name: 'Pierced Props',
    component: () => import('../../../pages/basic/PiercedProps.vue'),
  },
]
