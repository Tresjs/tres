export const cameraRoutes = [
  {
    path: '/cameras',
    name: 'Cameras',
    component: () => import('../../pages/cameras/index.vue'),
  },
  {
    path: '/cameras/no-camera',
    name: 'No Camera',
    component: () => import('../../pages/cameras/index.vue'),
  },
  {
    path: '/cameras/multiple-cameras',
    name: 'Multiple Cameras',
    component: () => import('../../pages/cameras/MultipleCameras.vue'),
  },
]
