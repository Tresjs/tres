import { computed } from 'vue'
import { uniqueBy } from '../../utils'
import { useRaycaster2 } from '../useRaycaster2'
import type { Intersection, Event, Object3D } from 'three'

type CallbackFn = (intersection: Intersection<Object3D<Event>>, event: PointerEvent) => void //TODO document

type EventProps = {
  // TODO this should not be here but in the type that is used for mesh props
  // TODO deep
  onClick?: CallbackFn
  onPointerEnter?: CallbackFn
  onPointerMove?: CallbackFn
  onPointerLeave?: CallbackFn
}

export const usePointerEventHandler = () => {
  const objectsWithEventListeners = {
    click: new Map<Object3D, CallbackFn>(),
    pointerMove: new Map<Object3D, CallbackFn>(),
    pointerEnter: new Map<Object3D, CallbackFn>(),
  }

  const registerObject = (object: Object3D, { onClick, onPointerMove, onPointerEnter }: EventProps) => {
    if (onClick) objectsWithEventListeners.click.set(object, onClick)
    if (onPointerMove) objectsWithEventListeners.pointerMove.set(object, onPointerMove)
    if (onPointerEnter) objectsWithEventListeners.pointerEnter.set(object, onPointerEnter)
  }

  const objectsToWatch = computed(() =>
    uniqueBy(
      [
        ...Array.from(objectsWithEventListeners.click.keys()),
        ...Array.from(objectsWithEventListeners.pointerMove.keys()),
      ],
      ({ uuid }) => uuid,
    ),
  )

  const { onClick, onPointerMove } = useRaycaster2(objectsToWatch)

  onClick(({ intersects, event }) => {
    if (intersects.length) objectsWithEventListeners.click.get(intersects[0].object)?.(intersects[0], event)
  })

  onPointerMove(({ intersects, event }) => {
    if (intersects.length) objectsWithEventListeners.pointerMove.get(intersects[0].object)?.(intersects[0], event)
  })

  return {
    registerObject,
  }
}
