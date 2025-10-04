export const controlsRoutes = [
  {
    path: '/controls/multiple-controls',
    name: 'Multiple Controls',
    component: () => import('../../pages/controls/MultipleControlsDemo.vue'),
  },
  {
    path: '/controls/boolean',
    name: 'Boolean Control',
    component: () => import('../../pages/controls/BooleanControlDemo.vue'),
  },
  {
    path: '/controls/color',
    name: 'Color Control',
    component: () => import('../../pages/controls/ColorControlDemo.vue'),
  },
  {
    path: '/controls/vector',
    name: 'Vector Control',
    component: () => import('../../pages/controls/VectorControlDemo.vue'),
  },
  {
    path: '/controls/select',
    name: 'Select Control',
    component: () => import('../../pages/controls/SelectControlDemo.vue'),
  },
  {
    path: '/controls/slider',
    name: 'Slider Control',
    component: () => import('../../pages/controls/SliderControlDemo.vue'),
  },
  {
    path: '/controls/text',
    name: 'Text Control',
    component: () => import('../../pages/controls/TextControlDemo.vue'),
  },
  {
    path: '/controls/button',
    name: 'Button Control',
    component: () => import('../../pages/controls/ButtonControlDemo.vue'),
  },
  {
    path: '/controls/graph',
    name: 'Graph Control',
    component: () => import('../../pages/controls/GraphDemo.vue'),
  },
]
