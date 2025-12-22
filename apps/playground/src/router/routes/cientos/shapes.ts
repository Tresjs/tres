export const shapesRoutes = [
  {
    path: '/cientos/shapes/catmullromcurve3',
    name: 'CatmullRomCurve3',
    component: () => import('@/pages/cientos/shapes/CatmullRomCurve3Demo.vue'),
  },
  {
    path: '/cientos/shapes/quadratic-bezier-line',
    name: 'QuadraticBezierLine',
    component: () => import('@/pages/cientos/shapes/QuadraticBezierLineDemo.vue'),
  },
  {
    path: '/cientos/shapes/cubic-bezier-line',
    name: 'CubicBezierLine',
    component: () => import('@/pages/cientos/shapes/CubicBezierLineDemo.vue'),
  },
  {
    path: '/cientos/shapes/cylinder',
    name: 'Cylinder',
    component: () => import('@/pages/cientos/shapes/Cylinder.vue'),
  },
  {
    path: '/cientos/shapes/line2',
    name: 'Line2',
    component: () => import('@/pages/cientos/shapes/Line2Demo.vue'),
  },
  {
    path: '/cientos/shapes/superformula',
    name: 'Superformula',
    component: () => import('@/pages/cientos/shapes/SuperformulaDemo.vue'),
  },
  {
    path: '/cientos/shapes/roundedbox',
    name: 'RoundedBox',
    component: () => import('@/pages/cientos/shapes/RoundedBoxDemo.vue'),
  },
  {
    path: '/cientos/shapes/screenQuad',
    name: 'ScreenQuad',
    component: () => import('@/pages/cientos/shapes/ScreenQuadDemo.vue'),
  },
  {
    path: '/cientos/shapes/on-demand-shapes',
    name: 'on-demand Shapes',
    component: () => import('@/pages/cientos/shapes/OnDemandShapesDemo.vue'),
  },
]
