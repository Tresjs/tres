import { createRouter, createWebHistory } from 'vue-router'
import {
  abstractionsRoutes,
  controlsRoutes,
  stagingRoutes,
  loadersRoutes,
  materialsRoutes,
  directivesRoutes,
  miscRoutes,
} from './routes'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
  },
  ...abstractionsRoutes,
  ...controlsRoutes,
  ...stagingRoutes,
  ...loadersRoutes,
  ...materialsRoutes,
  ...directivesRoutes,
  ...miscRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
