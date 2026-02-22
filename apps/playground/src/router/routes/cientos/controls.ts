export const controlsRoutes = [
  {
    path: '/cientos/controls/orbit-controls',
    name: 'OrbitControls',
    component: () => import('@/pages/cientos/controls/OrbitControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/camera-controls',
    name: 'CameraControls',
    component: () => import('@/pages/cientos/controls/CameraControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/map-controls',
    name: 'MapControls',
    component: () => import('@/pages/cientos/controls/MapControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/transform-controls',
    name: 'TransformControls',
    component: () => import('@/pages/cientos/controls/TransformControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/keyboard-controls',
    name: 'KeyboardControls',
    component: () => import('@/pages/cientos/controls/KeyboardControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/pointerlock-controls',
    name: 'PointerLockControls',
    component: () => import('@/pages/cientos/controls/PointerLockControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/scroll-controls',
    name: 'ScrollControls',
    component: () => import('@/pages/cientos/controls/ScrollControlsDemo.vue'),
  },
  {
    path: '/cientos/controls/helper',
    name: 'Helper',
    component: () => import('@/pages/cientos/controls/HelperDemo.vue'),
  },
  {
    path: '/cientos/controls/drag-controls',
    name: 'DragControls',
    component: () => import('@/pages/cientos/controls/DragControlsDemo.vue'),
  },
]
