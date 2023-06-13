import { computed } from 'vue'
import { uniqueBy } from '../../utils'
import { useRaycaster2 } from '../useRaycaster2'
import type { Intersection, Event, Object3D } from 'three'

type CallbackFn = (intersection: Intersection<Object3D<Event>>, event: PointerEvent) => void //TODO document
type CallbackFnPointerLeave = (object: Object3D<Event>, event: PointerEvent) => void

type EventProps = {
  // TODO this should not be here but in the type that is used for mesh props
  // TODO deep
  onClick?: CallbackFn
  onPointerEnter?: CallbackFn
  onPointerMove?: CallbackFn
  onPointerLeave?: CallbackFnPointerLeave
}

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

  const objectsToWatch = computed(() =>
    uniqueBy(
      [
        ...Array.from(objectsWithEventListeners.click.keys()),
        ...Array.from(objectsWithEventListeners.pointerMove.keys()),
        ...Array.from(objectsWithEventListeners.pointerEnter.keys()),
        ...Array.from(objectsWithEventListeners.pointerLeave.keys()),
      ],
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

    if (previouslyIntersectedObject && previouslyIntersectedObject !== firstObject)
      objectsWithEventListeners.pointerLeave.get(previouslyIntersectedObject)?.(previouslyIntersectedObject, event)

    if (firstObject) {
      if (previouslyIntersectedObject !== firstObject)
        objectsWithEventListeners.pointerEnter.get(firstObject)?.(intersects[0], event)

      objectsWithEventListeners.pointerMove.get(firstObject)?.(intersects[0], event)
    }

    previouslyIntersectedObject = firstObject || null
  })

  return {
    registerObject,
  }
}
