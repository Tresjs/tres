export const eventsRoutes = [
  {
    path: '/events',
    name: 'Events',
    component: () => import('../../pages/events/index.vue'),
  },
  {
    path: '/events/dynamic-objects',
    name: 'Dynamic Objects',
    component: () => import('../../pages/events/DynamicObjects.vue'),
  },
  {
    path: '/events/pointer-enter-leave',
    name: 'Pointerenter/leave',
    component: () => import('../../pages/events/PointerEnterLeave.vue'),
  },
  {
    path: '/events/pointer-enter-leave-over-out',
    name: 'Pointer{enter,leave,over,out}',
    component: () => import('../../pages/events/PointerEnterLeaveOverOutComparison.vue'),
  },
  {
    path: '/events/blocking',
    name: 'Blocking (solid objects)',
    component: () => import('../../pages/events/Blocking.vue'),
  },
  {
    path: '/events/event-modifiers',
    name: 'Vue Event Modifiers',
    component: () => import('../../pages/events/EventModifiers.vue'),
  },
  {
    path: '/events/pointer-capture',
    name: 'Pointer Capture',
    component: () => import('../../pages/events/PointerCapture.vue'),
  },
  {
    path: '/events/stop-propagation',
    name: 'StopPropagation',
    component: () => import('../../pages/events/StopPropagation.vue'),
  },
  {
    path: '/events/remove-interactivity',
    name: 'RemoveInteractivity',
    component: () => import('../../pages/events/RemoveInteractivity.vue'),
  },
  {
    path: '/events/on-canvas-leave',
    name: 'On canvas leave',
    component: () => import('../../pages/events/OnCanvasLeave.vue'),
  },
  {
    path: '/events/connect',
    name: 'Connect (add/remove event listeners)',
    component: () => import('../../pages/events/Connect.vue'),
  },
  {
    path: '/events/filter',
    name: 'Filter (Intersections)',
    component: () => import('../../pages/events/Filter.vue'),
  },
  {
    path: '/events/target-enabled',
    name: 'DOM Target/Enabled',
    component: () => import('../../pages/events/TargetEnabled.vue'),
  },
  {
    path: '/events/deprecated-event-names',
    name: 'Deprecated Event Names',
    component: () => import('../../pages/events/DeprecatedEventNames.vue'),
  },
  {
    path: '/no-events',
    name: 'No Events',
    component: () => import('../../pages/events/NoEvents.vue'),
  },
]
