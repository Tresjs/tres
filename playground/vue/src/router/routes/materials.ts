export const materialsRoutes = [
  {
    path: '/materials/wobble-material',
    name: 'WobbleMaterial',
    component: () => import('../../pages/materials/WobbleMaterialDemo.vue'),
  },
  {
    path: '/materials/glass-material',
    name: 'GlassMaterial',
    component: () => import('../../pages/materials/GlassMaterialDemo.vue'),
  },
  {
    path: '/materials/custom-shader-material',
    name: 'CustomShaderMaterial',
    component: () => import('../../pages/materials/CustomShaderMaterialDemo.vue'),
  },
  {
    path: '/materials/reflection-material',
    name: 'ReflectionMaterial',
    component: () => import('../../pages/materials/MeshReflectionMaterialDemo.vue'),
  },
  {
    path: '/materials/holographic-material',
    name: 'HolographicMaterial',
    component: () => import('../../pages/materials/HolographicMaterialDemo.vue'),
  },
  {
    path: '/materials/discard-material',
    name: 'MeshDiscardMaterial',
    component: () => import('../../pages/materials/MeshDiscardMaterialDemo.vue'),
  },
]
