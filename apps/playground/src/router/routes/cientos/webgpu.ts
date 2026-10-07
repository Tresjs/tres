// Smoke tests for `@tresjs/cientos/webgpu`. Most pages cover exported components that have no GLSL
// but may still depend on WebGL renderer behavior. The "not exported yet" pages import a left-out
// component from the root entry to see how it behaves. Each page lists what must look right.
export const webgpuRoutes = [
  {
    path: '/cientos/webgpu/stats-gl',
    name: 'StatsGl (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/StatsGlDemo.vue'),
  },
  {
    path: '/cientos/webgpu/mask',
    name: 'Mask (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/MaskDemo.vue'),
  },
  {
    path: '/cientos/webgpu/smoke',
    name: 'Smoke (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/SmokeDemo.vue'),
  },
  {
    path: '/cientos/webgpu/decal',
    name: 'Decal (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/DecalDemo.vue'),
  },
  {
    path: '/cientos/webgpu/marching-cubes',
    name: 'MarchingCubes (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/MarchingCubesDemo.vue'),
  },
  {
    path: '/cientos/webgpu/text-3d',
    name: 'Text3D (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/Text3DDemo.vue'),
  },
  {
    path: '/cientos/webgpu/animated-sprite',
    name: 'AnimatedSprite (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/AnimatedSpriteDemo.vue'),
  },
  {
    path: '/cientos/webgpu/mesh-glass-material',
    name: 'MeshGlassMaterial (WebGPU, not exported yet)',
    component: () => import('@/pages/cientos/webgpu/MeshGlassMaterialDemo.vue'),
  },
  {
    path: '/cientos/webgpu/accumulative-shadows',
    name: 'AccumulativeShadows (WebGPU, not exported yet)',
    component: () => import('@/pages/cientos/webgpu/AccumulativeShadowsDemo.vue'),
  },
  {
    path: '/cientos/webgpu/cube-camera',
    name: 'CubeCamera (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/CubeCameraDemo.vue'),
  },
  {
    path: '/cientos/webgpu/fbo',
    name: 'Fbo (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/FboDemo.vue'),
  },
  {
    path: '/cientos/webgpu/environment',
    name: 'Environment (WebGPU)',
    component: () => import('@/pages/cientos/webgpu/EnvironmentDemo.vue'),
  },
]
