export const webgpuRoutes = [
  {
    path: '/webgpu/renderer',
    name: 'WebGPU Renderer',
    component: () => import('../../pages/webgpu/WebGPURenderer.vue'),
  },
]
