export const advancedRoutes = [
  {
    path: '/advanced/on-demand',
    name: 'On Demand',
    component: () => import('../../pages/advanced/OnDemand.vue'),
  },
  {
    path: '/advanced/take-over-loop',
    name: 'Take Over loop',
    component: () => import('../../pages/advanced/TakeOverLoop.vue'),
  },
]
