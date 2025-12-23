export const controlsRoutes = [
  {
    path: '/leches/controls/multiple-controls',
    name: 'Multiple Controls',
    component: () => import('@/pages/leches/controls/MultipleControlsDemo.vue'),
  },
  {
    path: '/leches/controls/boolean',
    name: 'Boolean Control',
    component: () => import('@/pages/leches/controls/BooleanControlDemo.vue'),
  },
  {
    path: '/leches/controls/color',
    name: 'Color Control',
    component: () => import('@/pages/leches/controls/ColorControlDemo.vue'),
  },
  {
    path: '/leches/controls/vector',
    name: 'Vector Control',
    component: () => import('@/pages/leches/controls/VectorControlDemo.vue'),
  },
  {
    path: '/leches/controls/select',
    name: 'Select Control',
    component: () => import('@/pages/leches/controls/SelectControlDemo.vue'),
  },
  {
    path: '/leches/controls/slider',
    name: 'Slider Control',
    component: () => import('@/pages/leches/controls/SliderControlDemo.vue'),
  },
  {
    path: '/leches/controls/text',
    name: 'Text Control',
    component: () => import('@/pages/leches/controls/TextControlDemo.vue'),
  },
  {
    path: '/leches/controls/button',
    name: 'Button Control',
    component: () => import('@/pages/leches/controls/ButtonControlDemo.vue'),
  },
  {
    path: '/leches/controls/graph',
    name: 'Graph Control',
    component: () => import('@/pages/leches/controls/GraphDemo.vue'),
  },
]
