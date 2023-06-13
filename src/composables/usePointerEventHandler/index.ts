import { computed } from 'vue'
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
  }

  const registerObject = (object: Object3D, { onClick }: EventProps) => {
    if (onClick) objectsWithEventListeners.click.set(object, onClick)
  }

  const objectsToWatch = computed(() => Array.from(objectsWithEventListeners.click.keys()))

  const { onClick } = useRaycaster2(objectsToWatch)

  onClick(({ intersects, event }) => {
    if (intersects.length) objectsWithEventListeners.click.get(intersects[0].object)?.(intersects[0], event)
  })

  return {
    registerObject,
  }
}
