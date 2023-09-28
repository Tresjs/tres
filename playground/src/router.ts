import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { kebabCase } from './util/string'

const makeRoute = (name: string): RouteRecordRaw => {
  const nameInKebab = kebabCase(name)

  return {
    path: `/${nameInKebab}`,
    name,
    component: () => import(`./pages/${nameInKebab}.vue`),
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  makeRoute('Outline'),
  makeRoute('Glitch'),
  makeRoute('Depth of Field'),
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
