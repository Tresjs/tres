import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/multiple',
    name: 'Multiple',
    component: () => import('./pages/multiple.vue'),
  },
  {
    path: '/multiple-cameras',
    name: 'Multiple Cameras',
    component: () => import('./pages/multiple-cameras.vue'),
  },
  {
    path: '/no-camera',
    name: 'No Camera',
    component: () => import('./pages/no-camera.vue'),
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
