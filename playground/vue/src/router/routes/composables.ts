export const composablesRoutes = [
  {
    name: 'useTexture',
    path: '/composables/use-texture',
    component: () => import('../../pages/composables/useTexture/index.vue'),
  },
  {
    name: 'usePBRTexture',
    path: '/composables/use-pbr-texture',
    component: () => import('../../pages/composables/usePBRTexture/index.vue'),
  },
]
