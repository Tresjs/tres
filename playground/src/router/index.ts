import { createRouter, createWebHistory } from 'vue-router'
import { allRoutes } from './routes'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  ...allRoutes,

]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
