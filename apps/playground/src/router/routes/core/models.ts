export const modelsRoutes = [
  {
    path: '/models/primitives',
    name: 'Model Primitives',
    component: () => import('../../../pages/models/PrimitivesModel.vue'),
  },
  {
    path: '/models/rigged',
    name: 'Rigged Models',
    component: () => import('../../../pages/models/RiggedModel/index.vue'),
  },
]
