export const cameraRoutes = [
  {
    path: '/core/cameras',
    name: 'Cameras',
    component: () => import('../../../pages/core/cameras/index.vue'),
  },
  {
    path: '/core/cameras/perspective-camera',
    name: 'Perspective Camera',
    component: () => import('../../../pages/core/cameras/PerspectiveCamera.vue'),
  },
  {
    path: '/core/cameras/orthographic-camera',
    name: 'Orthographic Camera',
    component: () => import('../../../pages/core/cameras/OrthographicCamera.vue'),
  },
  {
    path: '/core/cameras/no-camera',
    name: 'No Camera',
    component: () => import('../../../pages/core/cameras/index.vue'),
  },
  {
    path: '/core/cameras/multiple-cameras',
    name: 'Multiple Cameras',
    component: () => import('../../../pages/core/cameras/multipleCameras/index.vue'),
  },
]
