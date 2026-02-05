export const advancedRoutes = [
  {
    path: '/leches/advanced/folders',
    name: 'Folders',
    component: () => import('@/pages/leches/advanced/FoldersDemo.vue'),
  },
  {
    path: '/leches/advanced/multiple-instances',
    name: 'Multiple Instances',
    component: () => import('@/pages/leches/advanced/multiple-instances/MultipleInstances.vue'),
  },
  {
    path: '/leches/advanced/stacked',
    name: 'Stacked',
    component: () => import('@/pages/leches/advanced/StackedDemo.vue'),
  },
  {
    path: '/leches/advanced/slot-content',
    name: 'Slot Content',
    component: () => import('@/pages/leches/advanced/SlotContentDemo.vue'),
  },
]
