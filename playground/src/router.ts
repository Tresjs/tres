import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { kebabCase } from './util/string'

const makeRoute = (name: string, icon: string): RouteRecordRaw => {
  const nameInKebab = kebabCase(name)

  return {
    path: `/${nameInKebab}`,
    name,
    meta: {
      icon,
    },
    component: () => import(`./pages/${nameInKebab}.vue`),
  }
}
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  makeRoute('Outline', '🔲'),
  makeRoute('Glitch', '📺'),
  makeRoute('Depth of Field', '📷'),
  makeRoute('Pixelation', '👾'),
  makeRoute('Bloom', '🌼'),
  makeRoute('Noise', '📟'),
  makeRoute('Vignette', '🕶️'),
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
