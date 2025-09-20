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
    path: '/advanced/attach-material-array',
    name: 'attach: Material array',
    component: () => import('../../pages/advanced/attachMaterialArray/index.vue'),
  },
  {
    path: '/advanced/attach-buffer-geometry',
    name: 'attach: BufferGeometry',
    component: () => import('../../pages/advanced/attachBufferGeometry/index.vue'),
  },
  {
    path: '/advanced/attach-post-processing',
    name: 'attach: Post-processing',
    component: () => import('../../pages/advanced/attachPostProcessing/index.vue'),
  },
  {
    path: '/advanced/device-pixel-ratio',
    name: 'Device Pixel Ratio',
    component: () => import('../../pages/advanced/devicePixelRatio/index.vue'),
  },
  {
    path: '/advanced/disposal',
    name: 'Disposal',
    component: () => import('../../pages/advanced/disposal/index.vue'),
  },
  {
    path: '/advanced/memory-tres-objects',
    name: 'Memory Test: Tres Objects',
    component: () => import('../../pages/advanced/MemoryTresObjects.vue'),
  },
  {
    path: '/advanced/webgpu',
    name: 'WebGPU',
    component: () => import('../../pages/advanced/webGPU/index.vue'),
  },
]
