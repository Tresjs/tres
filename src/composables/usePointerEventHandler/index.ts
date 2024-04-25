import type { Intersection, Object3D, Object3DEventMap } from 'three'
import { computed, reactive, ref } from 'vue'
import type { TresObject } from 'src/types'
import { uniqueBy } from '../../utils'
import { useRaycaster } from '../useRaycaster'

import type { TresContext } from '../useTresContextProvider'

type CallbackFn = (intersection: Intersection<Object3D<Object3DEventMap>>, event: PointerEvent) => void
type CallbackFnPointerLeave = (object: Object3D, event: PointerEvent) => void

export interface EventProps {
  onClick?: CallbackFn
  onPointerEnter?: CallbackFn
  onPointerMove?: CallbackFn
  onPointerLeave?: CallbackFnPointerLeave
}

export const usePointerEventHandler = (
  ctx: TresContext,
) => {
  const objectsWithEventListeners = reactive({
    click: new Map<Object3D<Object3DEventMap>, CallbackFn>(),
    pointerMove: new Map<Object3D<Object3DEventMap>, CallbackFn>(),
    pointerEnter: new Map<Object3D<Object3DEventMap>, CallbackFn>(),
    pointerLeave: new Map<Object3D<Object3DEventMap>, CallbackFnPointerLeave>(),
  })

  const blockingObjects = ref(new Set<Object3D>())

  const registerBlockingObject = (object: TresObject) => {
    blockingObjects.value.add(object as Object3D)
  }

  const deregisterBlockingObject = (object: TresObject) => {
    blockingObjects.value.delete(object as Object3D)
  }

  const deregisterObject = (object: TresObject) => {
    Object.values(objectsWithEventListeners).forEach(map => map.delete(object as Object3D))
    deregisterBlockingObject(object)
  }

  const registerObject = (object: TresObject & EventProps) => {
    const { onClick, onPointerMove, onPointerEnter, onPointerLeave } = object

    if (onClick) { objectsWithEventListeners.click.set(object as Object3D, onClick) }
    if (onPointerMove) { objectsWithEventListeners.pointerMove.set(object as Object3D, onPointerMove) }
    if (onPointerEnter) { objectsWithEventListeners.pointerEnter.set(object as Object3D, onPointerEnter) }
    if (onPointerLeave) { objectsWithEventListeners.pointerLeave.set(object as Object3D, onPointerLeave) }
  }

  const objectsToWatch = computed(() =>
    uniqueBy(
      [
        ...Array.from(blockingObjects.value),
        ...Object.values(objectsWithEventListeners)
          .map(map => Array.from(map.keys()))
          .flat(),
      ],
      ({ uuid }) => uuid,
    ),
  )

  // Temporaly add the methods to the context, this should be handled later by the EventManager state on the context https://github.com/Tresjs/tres/issues/515
  ctx.registerObjectAtPointerEventHandler = registerObject
  ctx.deregisterObjectAtPointerEventHandler = deregisterObject
  ctx.registerBlockingObjectAtPointerEventHandler = registerBlockingObject
  ctx.deregisterBlockingObjectAtPointerEventHandler = deregisterBlockingObject

  const { onClick, onPointerMove } = useRaycaster(objectsToWatch, ctx)

  onClick(({ intersects, event }) => {
    if (intersects.length) { objectsWithEventListeners.click.get(intersects[0].object)?.(intersects[0], event as PointerEvent) }
  })

  let previouslyIntersectedObject: Object3D | null

  onPointerMove(({ intersects, event }) => {
    const firstObject = intersects?.[0]?.object

    const { pointerLeave, pointerEnter, pointerMove } = objectsWithEventListeners

    if (previouslyIntersectedObject && previouslyIntersectedObject !== firstObject) { pointerLeave.get(previouslyIntersectedObject)?.(previouslyIntersectedObject, event as PointerEvent) }

    if (firstObject) {
      if (previouslyIntersectedObject !== firstObject) { pointerEnter.get(firstObject)?.(intersects[0], event as PointerEvent) }

      pointerMove.get(firstObject)?.(intersects[0], event as PointerEvent)
    }

    previouslyIntersectedObject = firstObject || null
  })

  return {
    registerObject,
    deregisterObject,
    registerBlockingObject,
    deregisterBlockingObject,
  }
}
