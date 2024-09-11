export const basicsRoutes = [
  {
    path: '/basics/rigid-body',
    name: 'Rigid Body',
    component: () => import('../../pages/basics/RigidBodyDemo.vue'),
  },
  {
    path: '/basics/gravity',
    name: 'Gravity',
    component: () => import('../../pages/basics/GravityDemo.vue'),
  },
]
