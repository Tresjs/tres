export const advancedRoutes = [
  {
    path: '/advanced/folders',
    name: 'Folders',
    component: () => import('../../pages/advanced/FoldersDemo.vue'),
  },
  {
    path: '/advanced/multiple-instances',
    name: 'Multiple Instances',
    component: () => import('../../pages/advanced/multiple-instances/MultipleInstances.vue'),
  },
  {
    path: '/advanced/stacked',
    name: 'Stacked',
    component: () => import('../../pages/advanced/StackedDemo.vue'),
  },
  {
    path: '/advanced/slot-content',
    name: 'Slot Content',
    component: () => import('../../pages/advanced/SlotContentDemo.vue'),
  },
]
