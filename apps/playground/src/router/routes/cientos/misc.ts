export const miscRoutes = [
  {
    path: '/cientos/misc/lod',
    name: 'LOD',
    component: () => import('@/pages/cientos/misc/LODDemo.vue'),
  },
  {
    path: '/cientos/misc/html',
    name: 'HTML',
    component: () => import('@/pages/cientos/misc/HTMLDemo.vue'),
  },
  {
    path: '/cientos/misc/laptop',
    name: 'Laptop',
    component: () => import('@/pages/cientos/misc/LaptopDemo.vue'),
  },
  {
    path: '/cientos/misc/stats-gl',
    name: 'StatsGl',
    component: () => import('@/pages/cientos/misc/StatsGlDemo.vue'),
  },
  {
    path: '/cientos/misc/stats',
    name: 'Stats',
    component: () => import('@/pages/cientos/misc/StatsDemo.vue'),
  },
  {
    path: '/cientos/misc/bake-shadows',
    name: 'BakeShadows',
    component: () => import('@/pages/cientos/misc/BakeShadowsDemo.vue'),
  },
  {
    path: '/cientos/misc/gltfExporter',
    name: 'GLTFExporter',
    component: () => import('@/pages/cientos/misc/GLTFExporterDemo.vue'),
  },
  {
    path: '/cientos/misc/useIntersect',
    name: 'useIntersect',
    component: () => import('@/pages/cientos/misc/useIntersect/index.vue'),
  },
]
