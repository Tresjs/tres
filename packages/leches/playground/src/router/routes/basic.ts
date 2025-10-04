export const basicRoutes = [
  {
    path: '/basic/reactive-object',
    name: 'Reactive Object',
    component: () => import('../../pages/basic/ReactiveObjectDemo.vue'),
  },
  {
    path: '/basic/parent-child',
    name: 'Parent Child',
    component: () => import('../../pages/basic/parent-child/ParentChildDemo.vue'),
  },
]
