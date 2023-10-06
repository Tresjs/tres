export const miscRoutes = [
  {
    path: '/misc/html',
    name: 'HTML',
    component: () => import('../../pages/misc/HTMLDemo.vue'),
  },
  {
    path: '/misc/laptop',
    name: 'Laptop',
    component: () => import('../../pages/misc/LaptopDemo.vue'),
  },
  {
    path: '/misc/stats-gl',
    name: 'StatsGl',
    component: () => import('../../pages/misc/StatsGlDemo.vue'),
  },
  {
    path: '/misc/stats',
    name: 'Stats',
    component: () => import('../../pages/misc/StatsDemo.vue'),
  },
]
