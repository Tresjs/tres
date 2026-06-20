export const objectsRoutes = [
  {
    path: '/cientos/objects/animated-sprite',
    name: 'AnimatedSprite',
    component: () => import('@/pages/cientos/objects/AnimatedSpriteDemo.vue'),
  },
  {
    path: '/cientos/objects/cube-camera',
    name: 'CubeCamera',
    component: () => import('@/pages/cientos/objects/CubeCameraDemo.vue'),
  },
  {
    path: '/cientos/objects/fbo',
    name: 'Fbo',
    component: () => import('@/pages/cientos/objects/fbo/index.vue'),
  },
  {
    path: '/cientos/objects/use-fbo',
    name: 'useFbo',
    component: () => import('@/pages/cientos/objects/fbo/useFBODemo.vue'),
  },
  {
    path: '/cientos/objects/gradient-texture',
    name: 'GradientTexture',
    component: () => import('@/pages/cientos/objects/GradientTextureDemo.vue'),
  },
  {
    path: '/cientos/objects/html',
    name: 'HTML',
    component: () => import('@/pages/cientos/objects/HTMLDemo.vue'),
  },
  {
    path: '/cientos/objects/image',
    name: 'Image',
    component: () => import('@/pages/cientos/objects/ImageDemo.vue'),
  },
  {
    path: '/cientos/objects/marching-cubes',
    name: 'MarchingCubes',
    component: () => import('@/pages/cientos/objects/MarchingCubesDemo.vue'),
  },
  {
    path: '/cientos/objects/reflector',
    name: 'ReflectorMesh',
    component: () => import('@/pages/cientos/objects/ReflectorMeshDemo.vue'),
  },
  {
    path: '/cientos/objects/text',
    name: 'Text',
    component: () => import('@/pages/cientos/objects/TextDemo.vue'),
  },
  {
    path: '/cientos/objects/text-3d',
    name: 'Text3D',
    component: () => import('@/pages/cientos/objects/Text3DDemo.vue'),
  },
]
