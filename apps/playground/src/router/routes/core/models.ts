export const modelsRoutes = [
  {
    path: '/models/primitives',
    name: 'Model Primitives',
    component: () => import('../../../pages/core/models/PrimitivesModel.vue'),
  },
  {
    path: '/models/rigged',
    name: 'Rigged Models',
    component: () => import('../../../pages/core/models/RiggedModel/index.vue'),
  },
]
