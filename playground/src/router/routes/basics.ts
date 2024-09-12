export const basicsRoutes = [
  {
    path: '/basics/rigid-body',
    name: 'Rigid Body',
    component: () => import('../../pages/basics/RigidBodyDemo.vue'),
  },
  {
    path: '/basics/applying-forces',
    name: 'Applying Forces',
    component: () => import('../../pages/basics/ApplyingForcesDemo.vue'),
  },
  {
    path: '/basics/gravity',
    name: 'Gravity',
    component: () => import('../../pages/basics/GravityDemo.vue'),
  },
]
