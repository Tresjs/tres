export const loadersRoutes = [
  {
    path: '/loaders/svg',
    name: 'SVG',
    component: () => import('../../pages/loaders/SVGDemo.vue'),
  },
  {
    path: '/loaders/use-gltf',
    name: 'useGLTF',
    component: () => import('../../pages/loaders/UseGLTFDemo.vue'),
  },
  {
    path: '/loaders/gltf-model',
    name: 'GLTFModel',
    component: () => import('../../pages/loaders/GLTFModelDemo.vue'),
  },
  {
    path: '/loaders/use-fbx',
    name: 'useFBX',
    component: () => import('../../pages/loaders/UseFBXDemo.vue'),
  },
  {
    path: '/loaders/fbx-model',
    name: 'FBXModel',
    component: () => import('../../pages/loaders/FBXModelDemo.vue'),
  },
  {
    path: '/loaders/use-video-texture',
    name: 'useVideoTexture',
    component: () => import('../../pages/loaders/useVideoTextureDemo.vue'),
  },
]
