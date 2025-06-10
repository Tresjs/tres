import type { PointerEvent, PointerEventsMap } from '@pmndrs/pointer-events'
import type { Event, Object3D, Object3DEventMap } from 'three'
import { forwardHtmlEvents, getVoidObject } from '@pmndrs/pointer-events'
import { onUnmounted, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import type { TresContext } from '../useTresContextProvider'
import { createEventHook } from '@vueuse/core'

export function useEventManager({
  canvas,
  contextParts: { scene, camera, loop },
}: {
  canvas: MaybeRef<HTMLCanvasElement>
  contextParts: Pick<TresContext, 'scene' | 'camera' | 'loop' >
}) {
  const { update, destroy } = forwardHtmlEvents(toValue(canvas), () => toValue(camera.activeCamera), scene.value)
  onUnmounted(destroy)

  type VoidObject = Object3D<Object3DEventMap & PointerEventsMap>

  const voidObject = getVoidObject(scene.value) as VoidObject
  const pointerMissedEventHook = createEventHook<PointerEvent<MouseEvent> & Event<'click', VoidObject>>()

  voidObject.addEventListener('click', pointerMissedEventHook.trigger)

  const { off } = loop.register(update, 'before')
  onUnmounted(off)

  return {
    onPointerMissed: pointerMissedEventHook.on,
  }
}
