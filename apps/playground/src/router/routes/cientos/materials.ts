export const materialsRoutes = [
  {
    path: '/cientos/materials/wobble-material',
    name: 'WobbleMaterial',
    component: () => import('@/pages/cientos/materials/WobbleMaterialDemo.vue'),
  },
  {
    path: '/cientos/materials/glass-material',
    name: 'GlassMaterial',
    component: () => import('@/pages/cientos/materials/GlassMaterialDemo.vue'),
  },
  {
    path: '/cientos/materials/custom-shader-material',
    name: 'CustomShaderMaterial',
    component: () => import('@/pages/cientos/materials/custom-shader-material/index.vue'),
  },
  {
    path: '/cientos/materials/reflection-material',
    name: 'ReflectionMaterial',
    component: () => import('@/pages/cientos/materials/MeshReflectionMaterialDemo.vue'),
  },
  {
    path: '/cientos/materials/holographic-material',
    name: 'HolographicMaterial',
    component: () => import('@/pages/cientos/materials/HolographicMaterialDemo.vue'),
  },
  {
    path: '/cientos/materials/point-material',
    name: 'PointMaterial',
    component: () => import('@/pages/cientos/materials/PointMaterialDemo.vue'),
  },
  {
    path: '/cientos/materials/discard-material',
    name: 'MeshDiscardMaterial',
    component: () => import('@/pages/cientos/materials/MeshDiscardMaterialDemo.vue'),
  },
]
