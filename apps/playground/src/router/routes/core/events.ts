export const eventsRoutes = [
  {
    path: '/core/events',
    name: 'Events',
    component: () => import('@/pages/core/events/index.vue'),
  },
  {
    path: '/core/events/fps-drops-repro',
    name: 'FSP Drops Reproduction',
    component: () => import('@/pages/core/events/FpsDropsReproduction.vue'),
  },
  {
    path: '/core/events/dynamic-objects',
    name: 'Dynamic Objects',
    component: () => import('@/pages/core/events/DynamicObjects.vue'),
  },
  {
    path: '/core/events/complex-model',
    name: 'Complex Model',
    component: () => import('@/pages/core/events/complex-model/index.vue'),
  },
  {
    path: '/core/events/groups',
    name: 'Groups',
    component: () => import('@/pages/core/events/groups/index.vue'),
  },
]
