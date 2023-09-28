export const shapesRoutes = [
  {
    path: '/shapes/catmullromline',
    name: 'CatmullRomLine',
    component: () => import('../../pages/shapes/CatmullRomLineDemo.vue'),
  },
  {
    path: '/shapes/line2',
    name: 'Line2',
    component: () => import('../../pages/shapes/Line2Demo.vue'),
  },
]