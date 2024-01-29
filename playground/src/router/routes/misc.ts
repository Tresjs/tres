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
  {
    path: '/misc/bake-shadows',
    name: 'BakeShadows',
    component: () => import('../../pages/misc/BakeShadows.vue'),
  },
  {
    path: '/misc/gltfExporter',
    name: 'GLTFExporter',
    component: () => import('../../pages/misc/GLTFExporterDemo.vue'),
  },
]
