import { createRouter, createWebHistory } from 'vue-router'
import { coreRoutes } from './routes/core'
import { cientosRoutes } from './routes/cientos'
import { postProcessingRoutes } from './routes/postprocessing'
import { lechesRoutes } from './routes/leches'
import { rapierRoutes } from './routes/rapier'

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
  {
    path: '/leches',
    name: 'Leches',
    component: () => import('../pages/leches/index.vue'),
  },
  {
    path: '/rapier',
    name: 'Rapier',
    component: () => import('../pages/rapier/index.vue'),
  },
  ...coreRoutes,
  ...cientosRoutes,
  ...postProcessingRoutes,
  ...lechesRoutes,
  ...rapierRoutes,
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
