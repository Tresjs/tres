import { createRouter, createWebHistory } from 'vue-router'
import { coreRoutes } from './routes/core'
import { cientosRoutes } from './routes/cientos'
import { postProcessingRoutes } from './routes/postprocessing'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/core',
    name: 'Core',
    component: () => import('../pages/core/index.vue'),
  },
  {
    path: '/cientos',
    name: 'Cientos',
    component: () => import('../pages/cientos/index.vue'),
  },
  ...coreRoutes,
  ...cientosRoutes,
  ...postProcessingRoutes,
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
