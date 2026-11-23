import type { ShallowRef } from 'vue'
import type { TresCanvasInstance } from './BaseCanvas.vue'
import type { ContextEmits } from './Context.vue'

// A `Record` and not an array: a new event in `ContextEmits` is a type error here until it
// is added, so a canvas cannot silently drop it.
const contextEvents: Record<keyof ContextEmits, true> = {
  ready: true,
  error: true,
  pointermissed: true,
  render: true,
  beforeLoop: true,
  loop: true,
  click: true,
  contextmenu: true,
  pointermove: true,
  pointerenter: true,
  pointerleave: true,
  pointerover: true,
  pointerout: true,
  dblclick: true,
  pointerdown: true,
  pointerup: true,
  pointercancel: true,
  lostpointercapture: true,
  wheel: true,
}

/**
 * Listeners for `v-on` that re-emit every `ContextEmits` event through `emit`.
 * Both `TresCanvas` components declare these emits for typed handlers, and a declared emit
 * does not fall through `$attrs`, so each wrapper must forward them.
 */
export const forwardContextEmits = (emit: (event: any, ...args: any[]) => void) =>
  Object.fromEntries(
    Object.keys(contextEvents).map(event => [event, (...args: unknown[]) => emit(event, ...args)]),
  )

// For components that wrap a canvas or context only to set its default renderer.
export const forwardContext = (emit: (event: any, ...args: any[]) => void, child: ShallowRef<TresCanvasInstance | undefined>) => {
  const exposed: TresCanvasInstance = {
    get context() {
      return child.value?.context
    },
    dispose: () => child.value?.dispose(),
  }
  return { listeners: forwardContextEmits(emit), exposed }
}
