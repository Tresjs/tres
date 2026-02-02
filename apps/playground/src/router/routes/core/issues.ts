export const issuesRoutes = [
  {
    path: '/issues/701',
    name: '#701: primitive :object',
    component: () => import('@/pages/core/issues/701/index.vue'),
  },
  {
    path: '/issues/701-cientos-v4',
    name: '#701: <primitive> in Cientos v4',
    component: () => import('@/pages/core/issues/701-cientos-v4/index.vue'),
  },
  {
    path: '/issues/717vIf',
    name: '#717: v-if',
    component: () => import('@/pages/core/issues/717/index.vue'),
  },
  {
    path: '/issues/749-attach-detach',
    name: '#749: attach-detach',
    component: () => import('@/pages/core/issues/749/index.vue'),
  },
  {
    path: '/issues/796',
    name: '#796: unmounted',
    component: () => import('@/pages/core/issues/796/index.vue'),
  },
  {
    path: '/issues/732',
    name: '#732: provide/inject',
    component: () => import('@/pages/core/issues/732/index.vue'),
  },
]
