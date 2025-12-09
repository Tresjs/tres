import { useEventBus } from '@vueuse/core'

export type DecalEventPayload =
  | { type: 'cursor-move', x: number, y: number }
  | { type: 'drag-ui', x: number, y: number }
  | { type: 'click' }
  | { type: 'drag-ui-orientation', angle: number }
  | { type: 'drag-ui-scale', scale: number }
  | { type: 'ui-toggle-visibility-decal-intersect', visible: boolean }
  | { type: 'ui-toggle-visibility-current-intersect', visible: boolean }
  | { type: 'validate-decal' }
  | { type: 'set-ui-state', scale: number, angle: number, x: number, y: number, id: string }
  | { type: 'cancel-edit' }
  | { type: 'change-zindex', id: string, delta: number }
  | { type: 'refresh-raycasts' }
  | { type: 'delete-decal' } // 🆕 Ajout ici

export const decalBus = useEventBus<DecalEventPayload>('cientos-decal-bus')
