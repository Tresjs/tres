import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/index.vue'),
    },
    {
        path: '/shapes',
        name: 'Shapes',
        component: () => import('./pages/shapes.vue'),
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})
