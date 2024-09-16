export const eventsRoutes = [
  {
    path: '/events',
    name: 'Events',
    component: () => import('../../pages/events/index.vue'),
  },
  {
    path: '/no-events',
    name: 'No Events',
    component: () => import('../../pages/events/NoEvents.vue'),
  },
  {
    path: '/events/dynamic-objects',
    name: 'Dynamic Objects',
    component: () => import('../../pages/events/DynamicObjects.vue'),
  },
  {
    path: '/events/target-enabled',
    name: 'DOM Target/Enabled',
    component: () => import('../../pages/events/TargetEnabled.vue'),
  },
  {
    path: '/events/pointer-enter-leave',
    name: 'PointerEnter/Leave',
    component: () => import('../../pages/events/PointerEnterLeave.vue'),
  },
  {
    path: '/events/stop-propagation',
    name: 'PointerEnter/StopPropagation',
    component: () => import('../../pages/events/StopPropagation.vue'),
  },
  {
    path: '/events/remove-interactivity',
    name: 'RemoveInteractivity',
    component: () => import('../../pages/events/RemoveInteractivity.vue'),
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
    path: '/events/blocking',
    name: 'Blocking (solid objects)',
    component: () => import('../../pages/events/Blocking.vue'),
  },
  {
    path: '/events/event-modifier-self',
    name: 'Event Modifier: "self"',
    component: () => import('../../pages/events/EventModifierSelf.vue'),
  },
  {
    path: '/events/event-modifier-stop',
    name: 'Event Modifier: "stop"',
    component: () => import('../../pages/events/EventModifierStop.vue'),
  },
  {
    path: '/events/deprecated-event-names',
    name: 'Deprecated Event Names',
    component: () => import('../../pages/events/DeprecatedEventNames.vue'),
  },
]
