import { computed } from 'vue'
import { uniqueBy } from '../../utils'
import { useRaycaster2 } from '../useRaycaster2'
import type { Intersection, Event, Object3D } from 'three'

type CallbackFn = (intersection: Intersection<Object3D<Event>>, event: PointerEvent) => void //TODO document
type CallbackFnPointerLeave = (object: Object3D<Event>, event: PointerEvent) => void

type EventProps = {
  // TODO this should not be here but in the type that is used for mesh props
  // TODO deep (multiple objects)
  onClick?: CallbackFn
  onPointerEnter?: CallbackFn
  onPointerMove?: CallbackFn
  onPointerLeave?: CallbackFnPointerLeave
}

//TODO make pointerLeave trigger when canvas is left

export const usePointerEventHandler = () => {
  const objectsWithEventListeners = {
    click: new Map<Object3D, CallbackFn>(),
    pointerMove: new Map<Object3D, CallbackFn>(),
    pointerEnter: new Map<Object3D, CallbackFn>(),
    pointerLeave: new Map<Object3D, CallbackFnPointerLeave>(),
  }

  const registerObject = (object: Object3D, { onClick, onPointerMove, onPointerEnter, onPointerLeave }: EventProps) => {
    if (onClick) objectsWithEventListeners.click.set(object, onClick)
    if (onPointerMove) objectsWithEventListeners.pointerMove.set(object, onPointerMove)
    if (onPointerEnter) objectsWithEventListeners.pointerEnter.set(object, onPointerEnter)
    if (onPointerLeave) objectsWithEventListeners.pointerLeave.set(object, onPointerLeave)
  }

  const deregisterObject = (object: Object3D) => {
    Object.values(objectsWithEventListeners).forEach(map => map.delete(object))
  }

  const objectsToWatch = computed(() =>
    uniqueBy(
      Object.values(objectsWithEventListeners)
        .map(map => Array.from(map.keys()))
        .flat(),
      ({ uuid }) => uuid,
    ),
  )

  const { onClick, onPointerMove } = useRaycaster2(objectsToWatch)

  onClick(({ intersects, event }) => {
    if (intersects.length) objectsWithEventListeners.click.get(intersects[0].object)?.(intersects[0], event)
  })

  let previouslyIntersectedObject: Object3D<Event> | null

  onPointerMove(({ intersects, event }) => {
    const firstObject = intersects?.[0]?.object

    const { pointerLeave, pointerEnter, pointerMove } = objectsWithEventListeners

    if (previouslyIntersectedObject && previouslyIntersectedObject !== firstObject)
      pointerLeave.get(previouslyIntersectedObject)?.(previouslyIntersectedObject, event)

    if (firstObject) {
      if (previouslyIntersectedObject !== firstObject) pointerEnter.get(firstObject)?.(intersects[0], event)

      pointerMove.get(firstObject)?.(intersects[0], event)
    }

    previouslyIntersectedObject = firstObject || null
  })

  return {
    registerObject,
    deregisterObject,
  }
}
