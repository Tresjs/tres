export const loadersRoutes = [
  {
    path: '/cientos/loaders/use-gltf',
    name: 'useGLTF',
    component: () => import('@/pages/cientos/loaders/use-gltf/index.vue'),
  },
  {
    path: '/cientos/loaders/gltf-model',
    name: 'GLTFModel',
    component: () => import('@/pages/cientos/loaders/use-gltf/GLTFModelDemo.vue'),
  },
  {
    path: '/cientos/loaders/use-svg',
    name: 'useSVG',
    component: () => import('@/pages/cientos/loaders/use-svg/index.vue'),
  },
  {
    path: '/cientos/loaders/use-svg-component',
    name: 'useSVGComponent',
    component: () => import('@/pages/cientos/loaders/use-svg/SVGModelDemo.vue'),
  },
  {
    path: '/cientos/loaders/use-texture',
    name: 'useTexture',
    component: () => import('@/pages/cientos/loaders/use-texture/index.vue'),
  },
  {
    path: '/cientos/loaders/use-texture-component',
    name: 'UseTexture',
    component: () => import('@/pages/cientos/loaders/use-texture/UseTextureComponent.vue'),
  },
  {
    path: '/cientos/loaders/use-fbx',
    name: 'useFBX',
    component: () => import('@/pages/cientos/loaders/use-fbx/index.vue'),
  },
  {
    path: '/cientos/loaders/fbx-model',
    name: 'FBXModel',
    component: () => import('@/pages/cientos/loaders/use-fbx/FBXModelDemo.vue'),
  },
  {
    path: '/cientos/loaders/use-video-texture',
    name: 'useVideoTexture',
    component: () => import('@/pages/cientos/loaders/useVideoTextureDemo.vue'),
  },
  {
    path: '/cientos/loaders/pbr-textures',
    name: 'PBRTextures',
    component: () => import('@/pages/cientos/loaders/use-texture/PBRTextures.vue'),
  },
]
