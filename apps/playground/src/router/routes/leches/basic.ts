export const basicRoutes = [
  {
    path: '/leches/basic/reactive-object',
    name: 'Reactive Object',
    component: () => import('@/pages/leches/basic/ReactiveObjectDemo.vue'),
  },
  {
    path: '/leches/basic/parent-child',
    name: 'Parent Child',
    component: () => import('@/pages/leches/basic/parent-child/ParentChildDemo.vue'),
  },
]
