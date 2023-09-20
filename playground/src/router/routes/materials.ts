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
]