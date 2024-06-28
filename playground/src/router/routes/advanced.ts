export const advancedRoutes = [
  {
    path: '/advanced/on-demand',
    name: 'On Demand',
    component: () => import('../../pages/advanced/on-demand/index.vue'),
  },
  {
    path: '/advanced/manual',
    name: 'Manual rendering',
    component: () => import('../../pages/advanced/manual/index.vue'),
  },
  {
    path: '/advanced/take-over-render',
    name: 'Take Over render',
    component: () => import('../../pages/advanced/takeOverRender/index.vue'),
  },
  {
    path: '/advanced/fbo',
    name: 'FBO',
    component: () => import('../../pages/advanced/fbo/index.vue'),
  },
  {
    path: '/advanced/suspense',
    name: 'Suspense',
    component: () => import('../../pages/advanced/suspense/index.vue'),
  },
  {
    path: '/advanced/multiple-materials',
    name: 'Multiple materials',
    component: () => import('../../pages/advanced/multipleMaterials/index.vue'),
  },
]
