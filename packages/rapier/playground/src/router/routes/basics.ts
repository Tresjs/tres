export const basicsRoutes = [
  {
    path: '/basics/rigid-body',
    name: 'Rigid Body',
    component: () => import('../../pages/basics/RigidBody.vue'),
  },
  {
    path: '/basics/colliders',
    name: 'Colliders',
    component: () => import('../../pages/basics/Colliders.vue'),
  },
  {
    path: '/basics/instanced-rigid-body',
    name: 'Instanced Rigid Body',
    component: () => import('../../pages/basics/InstancedRigidBody.vue'),
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
  {
    path: '/basics/props',
    name: 'Props',
    component: () => import('../../pages/basics/RigidBodyProps.vue'),
  },
  {
    path: '/basics/collision',
    name: 'Collision',
    component: () => import('../../pages/basics/CollisionDemo.vue'),
  },
  {
    path: '/basics/sensor',
    name: 'Sensor',
    component: () => import('../../pages/basics/SensorDemo.vue'),
  },
  {
    path: '/basics/joints',
    name: 'Joints',
    component: () => import('../../pages/basics/JointsDemo.vue'),
  },
  {
    path: '/basics/joints-advanced',
    name: 'Advanced Joints',
    component: () => import('../../pages/basics/JointsAdvancedDemo.vue'),
  },
]
