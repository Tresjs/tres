export const cameraRoutes = [
  {
    path: '/cameras',
    name: 'Cameras',
    component: () => import('../../pages/cameras/index.vue'),
  },
  {
    path: '/cameras/perspective-camera',
    name: 'Perspective Camera',
    component: () => import('../../pages/cameras/PerspectiveCamera.vue'),
  },
  {
    path: '/cameras/orthographic-camera',
    name: 'Orthographic Camera',
    component: () => import('../../pages/cameras/OrthographicCamera.vue'),
  },
  {
    path: '/cameras/no-camera',
    name: 'No Camera',
    component: () => import('../../pages/cameras/index.vue'),
  },
  {
    path: '/cameras/multiple-cameras',
    name: 'Multiple Cameras',
    component: () => import('../../pages/cameras/multipleCameras/index.vue'),
  },
]
