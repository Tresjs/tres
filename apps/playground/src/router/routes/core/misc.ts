export const miscRoutes = [
  {
    path: '/misc',
    name: 'Text 3D',
    component: () => import('@/pages/core/misc/text3D/index.vue'),
  },
  {
    path: '/misc/directives',
    name: 'Directives',
    component: () => import('@/pages/core/misc/directives/index.vue'),
  },
  {
    path: '/misc/graph',
    name: 'useGraph',
    component: () => import('@/pages/core/misc/use-graph/index.vue'),
  },
  {
    path: '/misc/brownian-distribution',
    name: 'Brownian Distribution',
    component: () => import('@/pages/core/misc/BrownianDistribution.vue'),
  },
]
