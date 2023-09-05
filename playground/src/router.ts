import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/controls/orbit-controls',
    name: 'OrbitControls',
    component: () => import('./pages/OrbitControlsDemo.vue'),
  },
  {
    path: '/controls/camera-controls',
    name: 'CameraControls',
    component: () => import('./pages/CameraControlsDemo.vue'),
  },
  {
    path: '/controls/transform-controls',
    name: 'TransformControls',
    component: () => import('./pages/TransformControlsDemo.vue'),
  },
  {
    path: '/controls/first-person-controls',
    name: 'FirstPersonControls',
    component: () => import('./pages/FirstPersonControlsDemo.vue'),
  },
  {
    path: '/controls/scroll-controls',
    name: 'ScrollControls',
    component: () => import('./pages/ScrollControlsDemo.vue'),
  },
  {
    path: '/abstractions/smoke',
    name: 'Smoke',
    component: () => import('./pages/SmokeDemo.vue'),
  },
  {
    path: '/abstractions/levioso',
    name: 'Levioso',
    component: () => import('./pages/LeviosoDemo.vue'),
  },
  {
    path: '/abstractions/precipitation',
    name: 'Precipitation',
    component: () => import('./pages/PrecipitationDemo.vue'),
  },
  {
    path: '/abstractions/stars',
    name: 'Stars',
    component: () => import('./pages/StarsDemo.vue'),
  },
  {
    path: '/abstractions/text-3d',
    name: 'Text3D',
    component: () => import('./pages/Text3DDemo.vue'),
  },
  {
    path: '/abstractions/environment',
    name: 'Environment',
    component: () => import('./pages/EnvironmentDemo.vue'),
  },
  {
    path: '/staging/backdrop',
    name: 'Backdrop',
    component: () => import('./pages/BackdropDemo.vue'),
  },
  {
    path: '/abstractions/contact-shadows',
    name: 'ContactShadows',
    component: () => import('./pages/ContactShadowsDemo.vue'),
  },
  {
    path: '/abstractions/mouse-parallax',
    name: 'MouseParallax',
    component: () => import('./pages/MouseParallaxDemo.vue'),
  },
  {
    path: '/loaders/svg',
    name: 'SVG',
    component: () => import('./pages/SVGDemo.vue'),
  },
  {
    path: '/loaders/use-gltf',
    name: 'useGLTF',
    component: () => import('./pages/UseGLTFDemo.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
