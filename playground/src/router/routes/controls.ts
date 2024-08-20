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
    path: '/controls/keyboard-controls',
    name: 'KeyboardControls',
    component: () => import('../../pages/controls/KeyboardControlsDemo.vue'),
  },
  {
    path: '/controls/pointerlock-controls',
    name: 'PointerLockControls',
    component: () => import('../../pages/controls/PointerLockControlsDemo.vue'),
  },
  {
    path: '/controls/scroll-controls',
    name: 'ScrollControls',
    component: () => import('../../pages/controls/ScrollControlsDemo.vue'),
  },
]
