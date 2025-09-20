export const miscRoutes = [
  {
    path: '/misc/lod',
    name: 'LOD',
    component: () => import('../../pages/misc/LODDemo.vue'),
  },
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
    component: () => import('../../pages/misc/BakeShadowsDemo.vue'),
  },
  {
    path: '/misc/gltfExporter',
    name: 'GLTFExporter',
    component: () => import('../../pages/misc/GLTFExporterDemo.vue'),
  },
  {
    path: '/misc/useIntersect',
    name: 'useIntersect',
    component: () => import('../../pages/misc/useIntersect/index.vue'),
  },
]
