import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/basic',
    name: 'Basic',
    component: () => import('./pages/TheBasic.vue'),
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('./pages/TheGroups.vue'),
  },
  {
    path: '/responsiveness',
    name: 'Responsiveness',
    component: () => import('./pages/Responsiveness.vue'),
  },
  {
    path: '/conditional',
    name: 'Conditional',
    component: () => import('./pages/TheConditional.vue'),
  },
  {
    path: '/multiple',
    name: 'Multiple',
    component: () => import('./pages/Multiple.vue'),
  },
  {
    path: '/cameras/multiple-cameras',
    name: 'Multiple Cameras',
    component: () => import('./pages/cameras/MultipleCameras.vue'),
  },
  {
    path: '/cameras/no-camera',
    name: 'No Camera',
    component: () => import('./pages/cameras/NoCamera.vue'),
  },
  {
    path: '/cameras/camera',
    name: 'Camera',
    component: () => import('./pages/cameras/Cameras.vue'),
  },
  {
    path: '/raycaster/events',
    name: 'Raycaster',
    component: () => import('./pages/raycaster/TheEvents.vue'),
  },
  {
    path: '/misc/text-3d',
    name: 'Text3D',
    component: () => import('./pages/misc/Text3DDemo.vue'),
  },
  {
    path: '/misc/gui-controls',
    name: 'GUI Controls',
    component: () => import('./pages/misc/GUI.vue'),
  },
  {
    path: '/misc/particles',
    name: 'Particles',
    component: () => import('./pages/misc/TheParticles.vue'),
  },
  {
    path: '/click-blocking-box',
    name: 'Click Blocking Box',
    component: () => import('./pages/click-blocking-box.vue'),
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
