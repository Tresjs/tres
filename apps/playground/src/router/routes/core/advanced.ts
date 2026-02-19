export const advancedRoutes = [
  {
    path: '/core/advanced/on-demand',
    name: 'On Demand',
    component: () => import('@/pages/core/advanced/on-demand/index.vue'),
  },
  {
    path: '/core/advanced/manual',
    name: 'Manual rendering',
    component: () => import('@/pages/core/advanced/manual/index.vue'),
  },
  {
    path: '/core/advanced/take-over-render',
    name: 'Take Over render',
    component: () => import('@/pages/core/advanced/takeOverRender/index.vue'),
  },
  {
    path: '/core/advanced/fbo',
    name: 'FBO',
    component: () => import('@/pages/core/advanced/fbo/index.vue'),
  },
  {
    path: '/core/advanced/suspense',
    name: 'Suspense',
    component: () => import('@/pages/core/advanced/suspense/index.vue'),
  },
  {
    path: '/core/advanced/attach-material-array',
    name: 'attach: Material array',
    component: () => import('@/pages/core/advanced/attachMaterialArray/index.vue'),
  },
  {
    path: '/core/advanced/attach-buffer-geometry',
    name: 'attach: BufferGeometry',
    component: () => import('@/pages/core/advanced/attachBufferGeometry/index.vue'),
  },
  {
    path: '/core/advanced/attach-post-processing',
    name: 'attach: Post-processing',
    component: () => import('@/pages/core/advanced/attachPostProcessing/index.vue'),
  },
  {
    path: '/core/advanced/device-pixel-ratio',
    name: 'Device Pixel Ratio',
    component: () => import('@/pages/core/advanced/devicePixelRatio/index.vue'),
  },
  {
    path: '/core/advanced/disposal',
    name: 'Disposal',
    component: () => import('@/pages/core/advanced/disposal/index.vue'),
  },
  {
    path: '/core/advanced/memory-tres-objects',
    name: 'Memory Test: Tres Objects',
    component: () => import('@/pages/core/advanced/MemoryTresObjects.vue'),
  },
  {
    path: '/core/advanced/webgpu',
    name: 'WebGPU',
    component: () => import('@/pages/core/advanced/webGPU/index.vue'),
  },
  {
    path: '/core/advanced/manual-extend',
    name: 'Manual Extend',
    component: () => import('@/pages/core/advanced/manual-extend/index.vue'),
  }
]
