export const loaderRoutes = [
  {
    path: '/loaders/gltf',
    name: 'GLTF Loader',
    component: () => import('../../pages/loaders/gltf-loader/index.vue'),
  },
  {
    path: '/loaders/fbx',
    name: 'FBX Loader',
    component: () => import('../../pages/loaders/fbx-loader/index.vue'),
  },
  {
    path: '/loaders/texture',
    name: 'Texture Loader',
    component: () => import('../../pages/loaders/texture-loader/index.vue'),
  },
  {
    path: '/loader/component',
    name: 'Loader Component',
    component: () => import('../../pages/loaders/componentDemo.vue'),
  },
  {
    path: '/loaders/multiple-models',
    name: 'Multiple Models',
    component: () => import('../../pages/loaders/multiple-models/index.vue'),
  },
]
