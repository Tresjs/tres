export const basicRoutes = [
  {
    path: '/core/basic',
    name: 'Basic',
    component: () => import('@/pages/core/basic/index.vue'),
  },
  {
    path: '/core/basic/lights',
    name: 'Lights',
    component: () => import('@/pages/core/basic/Lights.vue'),
  },
  {
    path: '/core/basic/groups',
    name: 'Groups',
    component: () => import('@/pages/core/basic/groups/index.vue'),
  },
  {
    path: '/core/basic/conditional',
    name: 'Conditional',
    component: () => import('@/pages/core/basic/Conditional.vue'),
  },
  {
    path: '/core/basic/primitives',
    name: 'Primitives',
    component: () => import('@/pages/core/basic/Primitives.vue'),
  },
  {
    path: '/core/basic/multiple',
    name: 'Multiple',
    component: () => import('@/pages/core/basic/Multiple.vue'),
  },
  {
    path: '/core/basic/responsive',
    name: 'Responsiveness',
    component: () => import('@/pages/core/basic/Responsiveness.vue'),
  },
  {
    path: '/core/basic/onCallbacks',
    name: 'on... callbacks',
    component: () => import('@/pages/core/basic/OnCallbacks.vue'),
  },
  {
    path: '/core/basic/pierced-props',
    name: 'Pierced Props',
    component: () => import('@/pages/core/basic/PiercedProps.vue'),
  },
  {
    path: '/core/basic/sizes',
    name: 'Sizes',
    component: () => import('@/pages/core/basic/sizes/index.vue'),
  },
]
