export const loaderRoutes = [
  {
    path: '/loaders/gltf',
    name: 'GLTF Loader',
    component: () => import('@/pages/core/loaders/gltf-loader/index.vue'),
  },
  {
    path: '/loaders/fbx',
    name: 'FBX Loader',
    component: () => import('@/pages/core/loaders/fbx-loader/index.vue'),
  },
  {
    path: '/loaders/texture',
    name: 'Texture Loader',
    component: () => import('@/pages/core/loaders/texture-loader/index.vue'),
  },
  {
    path: '/loaders/multiple-models',
    name: 'Multiple Models',
    component: () => import('@/pages/core/loaders/multiple-models/index.vue'),
  },
]
