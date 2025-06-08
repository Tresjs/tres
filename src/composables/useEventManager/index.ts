import type { PointerEventsMap } from '@pmndrs/pointer-events'
import { forwardHtmlEvents, getVoidObject } from '@pmndrs/pointer-events'
import { onUnmounted, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import type { Object3D, Object3DEventMap } from 'three'
import type { TresContext } from '../useTresContextProvider'

export function useEventManager({
  canvas,
  contextParts: { scene, camera, loop },
}: {
  canvas: MaybeRef<HTMLCanvasElement>
  contextParts: Pick<TresContext, 'scene' | 'camera' | 'loop' >
}) {
  // TODO check if camera switching must be handled
  const { update } = forwardHtmlEvents(toValue(canvas), () => toValue(camera.activeCamera), scene.value)
  const voidObject = getVoidObject(scene.value) as Object3D<Object3DEventMap & PointerEventsMap>

  const registerPointerMissed = (cb: () => void) => { // TODO rename
    voidObject.addEventListener('click', cb) // TODO check if unregistering is there
  }

  const { off } = loop.register(update, 'before')

  onUnmounted(off)

  return {
    registerPointerMissed,
  }
}
