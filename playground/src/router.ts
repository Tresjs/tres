import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/outline',
    name: 'Outline',
    component: () => import('./pages/outline.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
