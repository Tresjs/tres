import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes/basic'
import { cameraRoutes, eventsRoutes, perfRoutes } from './routes'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  ...basicRoutes,
  ...perfRoutes,
  ...eventsRoutes,
  ...cameraRoutes
/*   {
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
    path: '/lights',
    name: 'lights',
    component: () => import('./pages/lights.vue'),
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
  {
    path: '/perf',
    name: 'Perf',
    component: () => import('./pages/perf/index.vue'),
  },
  {
    path: '/primitives',
    name: 'Primitives',
    component: () => import('./pages/primitives.vue'),
  },
  {
    path: '/rendering-modes',
    name: 'Rendering Modes',
    component: () => import('./pages/rendering-modes/index.vue'),
  },
  {
    path: '/on-demand-rendering',
    name: 'On Demand Rendering',
    component: () => import('./pages/on-demand-rendering.vue'),
  },
  {
    path: '/empty',
    name: 'empty',
    component: () => import('./pages/empty.vue'),
  },
   */
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
