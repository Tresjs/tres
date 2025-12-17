export const cameraRoutes = [
  {
    path: '/core/cameras',
    name: 'Cameras',
    component: () => import('../../../pages/cameras/index.vue'),
  },
  {
    path: '/core/cameras/perspective-camera',
    name: 'Perspective Camera',
    component: () => import('../../../pages/cameras/PerspectiveCamera.vue'),
  },
  {
    path: '/core/cameras/orthographic-camera',
    name: 'Orthographic Camera',
    component: () => import('../../../pages/cameras/OrthographicCamera.vue'),
  },
  {
    path: '/core/cameras/no-camera',
    name: 'No Camera',
    component: () => import('../../../pages/cameras/index.vue'),
  },
  {
    path: '/core/cameras/multiple-cameras',
    name: 'Multiple Cameras',
    component: () => import('../../../pages/cameras/multipleCameras/index.vue'),
  },
]
