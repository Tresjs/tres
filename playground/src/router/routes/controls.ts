export const controlsRoutes = [
  {
    path: '/controls/orbit-controls',
    name: 'OrbitControls',
    component: () => import('../../pages/controls/OrbitControlsDemo.vue'),
  },
  {
    path: '/controls/camera-controls',
    name: 'CameraControls',
    component: () => import('../../pages/controls/CameraControlsDemo.vue'),
  },
  {
    path: '/controls/map-controls',
    name: 'MapControls',
    component: () => import('../../pages/controls/MapControlsDemo.vue'),
  },
  {
    path: '/controls/transform-controls',
    name: 'TransformControls',
    component: () => import('../../pages/controls/TransformControlsDemo.vue'),
  },
  {
    path: '/controls/first-person-controls',
    name: 'FirstPersonControls',
    component: () => import('../../pages/controls/FirstPersonControlsDemo.vue'),
  },
  {
    path: '/controls/scroll-controls',
    name: 'ScrollControls',
    component: () => import('../../pages/controls/ScrollControlsDemo.vue'),
  },
]