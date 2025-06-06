import type { PointerEventsMap } from '@pmndrs/pointer-events'
import { forwardHtmlEvents, getVoidObject } from '@pmndrs/pointer-events'
import type { TresCamera, TresScene } from '../../types'
import { toValue } from 'vue'
import type { ComputedRef, MaybeRef } from 'vue'
import type { Object3D, Object3DEventMap } from 'three'

export function useEventManager({
  scene,
  canvas,
  camera,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  camera: ComputedRef<TresCamera>
}) {
  const { update } = forwardHtmlEvents(toValue(canvas), () => toValue(camera), scene)
  const voidObject = getVoidObject(scene) as Object3D<Object3DEventMap & PointerEventsMap>

  const registerPointerMissed = (handler: any /* TODO remove any */) => { // TODO rename
    voidObject.addEventListener('click', handler)
  }

  return {
    registerPointerMissed,
    update,
  }
}
