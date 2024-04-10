export const perfRoutes = [
  {
    path: '/perf/on-demand',
    name: 'On Demand',
    component: () => import('../../pages/perf/OnDemand.vue'),
  },
  {
    path: '/perf/memory',
    name: 'Memory',
    component: () => import('../../pages/perf/Memory.vue'),
  },
]
