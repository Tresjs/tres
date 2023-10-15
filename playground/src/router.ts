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
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
