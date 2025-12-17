import { createRouter, createWebHistory } from 'vue-router'
import { coreRoutes } from './routes/core'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/core',
    name: 'Core',
    component: () => import('../pages/core.vue'),
  },
  ...coreRoutes,
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
