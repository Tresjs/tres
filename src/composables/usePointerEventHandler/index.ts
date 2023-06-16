import { uniqueBy } from '../../utils'
import { useRaycaster } from '../useRaycaster'
import { computed, reactive } from 'vue'
import type { Intersection, Event, Object3D } from 'three'

type CallbackFn = (intersection: Intersection<Object3D<Event>>, event: PointerEvent) => void //TODO document
type CallbackFnPointerLeave = (object: Object3D<Event>, event: PointerEvent) => void

type EventProps = {
  onClick?: CallbackFn
  onPointerEnter?: CallbackFn
  onPointerMove?: CallbackFn
  onPointerLeave?: CallbackFnPointerLeave
}

export const usePointerEventHandler = () => {
  const objectsWithEventListeners = reactive({
    click: new Map<Object3D, CallbackFn>(),
    pointerMove: new Map<Object3D, CallbackFn>(),
    pointerEnter: new Map<Object3D, CallbackFn>(),
    pointerLeave: new Map<Object3D, CallbackFnPointerLeave>(),
  })

  const deregisterObject = (object: Object3D) => {
    Object.values(objectsWithEventListeners).forEach(map => map.delete(object))
  }

  const registerObject = (object: Object3D & EventProps) => {
    const { onClick, onPointerMove, onPointerEnter, onPointerLeave } = object

    if (onClick) objectsWithEventListeners.click.set(object, onClick)
    if (onPointerMove) objectsWithEventListeners.pointerMove.set(object, onPointerMove)
    if (onPointerEnter) objectsWithEventListeners.pointerEnter.set(object, onPointerEnter)
    if (onPointerLeave) objectsWithEventListeners.pointerLeave.set(object, onPointerLeave)

    object.addEventListener('removed', () => {
      object.traverse((child: Object3D) => {
        deregisterObject(child)
      })

      deregisterObject(object)
    })
  }

  const objectsToWatch = computed(() =>
    uniqueBy(
      Object.values(objectsWithEventListeners)
        .map(map => Array.from(map.keys()))
        .flat(),
      ({ uuid }) => uuid,
    ),
  )

  const { onClick, onPointerMove } = useRaycaster(objectsToWatch)

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
