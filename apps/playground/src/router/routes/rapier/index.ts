export const rapierRoutes = [
  {
    path: '/rapier/rigid-body',
    name: 'Rigid Body',
    component: () => import('@/pages/rapier/RigidBody.vue'),
  },
  {
    path: '/rapier/colliders',
    name: 'Colliders',
    component: () => import('@/pages/rapier/Colliders.vue'),
  },
  {
    path: '/rapier/instanced-rigid-body',
    name: 'Instanced Rigid Body',
    component: () => import('@/pages/rapier/InstancedRigidBody.vue'),
  },
  {
    path: '/rapier/applying-forces',
    name: 'Applying Forces',
    component: () => import('@/pages/rapier/ApplyingForcesDemo.vue'),
  },
  {
    path: '/rapier/gravity',
    name: 'Gravity',
    component: () => import('@/pages/rapier/GravityDemo.vue'),
  },
  {
    path: '/rapier/props',
    name: 'Props',
    component: () => import('@/pages/rapier/RigidBodyProps.vue'),
  },
  {
    path: '/rapier/collision',
    name: 'Collision',
    component: () => import('@/pages/rapier/CollisionDemo.vue'),
  },
  {
    path: '/rapier/sensor',
    name: 'Sensor',
    component: () => import('@/pages/rapier/SensorDemo.vue'),
  },
  {
    path: '/rapier/joints',
    name: 'Joints',
    component: () => import('@/pages/rapier/JointsDemo.vue'),
  },
  {
    path: '/rapier/joints-advanced',
    name: 'Advanced Joints',
    component: () => import('@/pages/rapier/JointsAdvancedDemo.vue'),
  },
]

console.log('rapierRoutes length:', rapierRoutes.length)
