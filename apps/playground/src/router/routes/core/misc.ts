export const miscRoutes = [
  {
    path: '/misc',
    name: 'Text 3D',
    component: () => import('../../../pages/misc/text3D/index.vue'),
  },
  {
    path: '/misc/directives',
    name: 'Directives',
    component: () => import('../../../pages/misc/directives/index.vue'),
  },
  {
    path: '/misc/graph',
    name: 'useGraph',
    component: () => import('../../../pages/misc/use-graph/index.vue'),
  },
  {
    path: '/misc/brownian-distribution',
    name: 'Brownian Distribution',
    component: () => import('../../../pages/misc/BrownianDistribution.vue'),
  },
]
