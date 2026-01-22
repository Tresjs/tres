import { createRouter, createWebHistory } from 'vue-router'
import { basicsRoutes } from './routes'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  ...basicsRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
