export const debugPerformanceRoutes = [
  {
    path: '/cientos/debug-performance/bvh',
    name: 'BVH',
    component: () => import('@/pages/cientos/debug-performance/bvh/BVHDemo.vue'),
  },
  {
    path: '/cientos/debug-performance/helper',
    name: 'Helper',
    component: () => import('@/pages/cientos/debug-performance/HelperDemo.vue'),
  },
  {
    path: '/cientos/debug-performance/lod',
    name: 'LOD',
    component: () => import('@/pages/cientos/debug-performance/LODDemo.vue'),
  },
  {
    path: '/cientos/debug-performance/stats',
    name: 'Stats',
    component: () => import('@/pages/cientos/debug-performance/StatsDemo.vue'),
  },
  {
    path: '/cientos/debug-performance/stats-gl',
    name: 'StatsGl',
    component: () => import('@/pages/cientos/debug-performance/StatsGlDemo.vue'),
  },
]
