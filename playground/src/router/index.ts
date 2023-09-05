import { createRouter, createWebHistory } from 'vue-router'
import { controlsRoutes } from './routes/controls'
import { abstractionsRoutes } from './routes/abstractions'
import { stagingRoutes } from './routes/staging'
import { loadersRoutes } from './routes/loaders'
import { materialsRoutes } from './routes/materials'

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
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
