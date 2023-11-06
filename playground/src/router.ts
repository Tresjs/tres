import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/folders',
    name: 'Folders',
    component: () => import('./pages/folders.vue'),
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: () => import('./pages/buttons.vue'),
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
