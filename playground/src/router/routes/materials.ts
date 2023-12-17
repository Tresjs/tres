export const materialsRoutes = [
  {
    path: '/materials/wobble-material',
    name: 'WobbleMaterial',
    component: () => import('../../pages/materials/WobbleMaterial.vue'),
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
    component: () => import('../../pages/materials/ReflectionMaterial.vue'),
  },
]
