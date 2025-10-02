import type { PointerEvent, PointerEventsMap } from '@pmndrs/pointer-events'
import type { Event, Object3D, Object3DEventMap } from 'three'
import { forwardHtmlEvents, getVoidObject } from '@pmndrs/pointer-events'
import { onUnmounted, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import type { TresContext } from '../useTresContextProvider'
import { createEventHook } from '@vueuse/core'

export function useEventManager({
  canvas,
  contextParts: { scene, camera, renderer },
}: {
  canvas: MaybeRef<HTMLCanvasElement>
  contextParts: Pick<TresContext, 'scene' | 'camera' | 'renderer' >
}) {
  const { update, destroy } = forwardHtmlEvents(toValue(canvas), () => toValue(camera.activeCamera), scene.value)
  const { off } = renderer.loop.onLoop(update)
  onUnmounted(destroy)
  onUnmounted(off)

  type VoidObject = Object3D<Object3DEventMap & PointerEventsMap>

  const voidObject = getVoidObject(scene.value) as VoidObject
  const pointerMissedEventHook = createEventHook<PointerEvent<MouseEvent> & Event<'click', VoidObject>>()

  voidObject.addEventListener('click', pointerMissedEventHook.trigger)

  return {
    onPointerMissed: pointerMissedEventHook.on,
  }
}
