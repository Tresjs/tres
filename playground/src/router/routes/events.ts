export const eventsRoutes = [
  {
    path: '/events',
    name: 'Events',
    component: () => import('../../pages/events/index.vue'),
  },
  {
    path: '/events/fps-drops-repro',
    name: 'FSP Drops Reproduction',
    component: () => import('../../pages/events/FpsDropsReproduction.vue'),
  },
  {
    path: '/events/dynamic-objects',
    name: 'Dynamic Objects',
    component: () => import('../../pages/events/DynamicObjects.vue'),
  },
]
