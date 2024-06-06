export const advancedRoutes = [
  {
    path: '/advanced/on-demand',
    name: 'On Demand',
    component: () => import('../../pages/advanced/on-demand/index.vue'),
  },
  {
    path: '/advanced/manual',
    name: 'Manual rendering',
    component: () => import('../../pages/advanced/manual/index.vue'),
  },
  {
    path: '/advanced/take-over-loop',
    name: 'Take Over loop',
    component: () => import('../../pages/advanced/TakeOverLoop.vue'),
  },
  {
    path: '/advanced/fbo',
    name: 'FBO',
    component: () => import('../../pages/advanced/FBO.vue'),
  },
]
