import type { Intersection, Event, Object3D  } from 'three'
import type { TresScene } from 'src/types'
import { computed, reactive, ref } from 'vue'
import { uniqueBy } from '../../utils'
import { useRaycaster } from '../useRaycaster'

import type { TresContext } from '../useTresContextProvider'

type CallbackFn = (intersection: Intersection<Object3D<Event>>, event: PointerEvent) => void
type CallbackFnPointerLeave = (object: Object3D<Event>, event: PointerEvent) => void

export interface EventProps {
  onClick?: CallbackFn
  onPointerEnter?: CallbackFn
  onPointerMove?: CallbackFn
  onPointerLeave?: CallbackFnPointerLeave
}

export const usePointerEventHandler = (
  { scene, contextParts }:
  {
    scene: TresScene
    contextParts: Pick<TresContext, 'renderer' | 'camera' | 'raycaster'>
  },
) => {
  const objectsWithEventListeners = reactive({
    click: new Map<Object3D, CallbackFn>(),
    pointerMove: new Map<Object3D, CallbackFn>(),
    pointerEnter: new Map<Object3D, CallbackFn>(),
    pointerLeave: new Map<Object3D, CallbackFnPointerLeave>(),
  })

  const blockingObjects = ref(new Set<Object3D>())

  const registerBlockingObject = (object: Object3D) => {
    blockingObjects.value.add(object)
  }

  const deregisterBlockingObject = (object: Object3D) => {
    blockingObjects.value.delete(object)
  }

  const deregisterObject = (object: Object3D) => {
    Object.values(objectsWithEventListeners).forEach(map => map.delete(object))
    deregisterBlockingObject(object)
  }

  const registerObject = (object: Object3D & EventProps) => {
    const { onClick, onPointerMove, onPointerEnter, onPointerLeave } = object

    if (onClick) objectsWithEventListeners.click.set(object, onClick)
    if (onPointerMove) objectsWithEventListeners.pointerMove.set(object, onPointerMove)
    if (onPointerEnter) objectsWithEventListeners.pointerEnter.set(object, onPointerEnter)
    if (onPointerLeave) objectsWithEventListeners.pointerLeave.set(object, onPointerLeave)
  }

  // to make the registerObject available in the custom renderer (nodeOps), it is attached to the scene
  scene.userData.tres__registerAtPointerEventHandler = registerObject
  scene.userData.tres__deregisterAtPointerEventHandler = deregisterObject

  scene.userData.tres__registerBlockingObjectAtPointerEventHandler = registerBlockingObject
  scene.userData.tres__deregisterBlockingObjectAtPointerEventHandler = deregisterBlockingObject

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

  const { onClick, onPointerMove } = useRaycaster(objectsToWatch, contextParts)

  onClick(({ intersects, event }) => {
    if (intersects.length) objectsWithEventListeners.click.get(intersects[0].object)?.(intersects[0], event)
    if (intersects.length && intersects[0].object?.parent?.isGroup) objectsWithEventListeners.click.get(intersects[0].object?.parent)?.(intersects[0], event);
  })

  let previouslyIntersectedObject: Object3D<Event> | null

  onPointerMove(({ intersects, event }) => {
    if (intersects?.length > 0) 
      console.log(intersects)
    const firstObject = intersects?.[0]?.object
    const parentObject = intersects?.[0]?.object?.parent

    const { pointerLeave, pointerEnter, pointerMove } = objectsWithEventListeners

    if (previouslyIntersectedObject && previouslyIntersectedObject !== firstObject){
      pointerLeave.get(previouslyIntersectedObject)?.(previouslyIntersectedObject, event)

      if(parentObject ?? parentObject?.isGroup)
        pointerLeave.get(parentObject)?.(previouslyIntersectedObject, event)
    }

    if (firstObject) {
      if (previouslyIntersectedObject !== firstObject) {
        pointerEnter.get(firstObject)?.(intersects[0], event)

        if(parentObject ?? parentObject?.isGroup)
          pointerEnter.get(parentObject)?.(previouslyIntersectedObject, event)
      }

      pointerMove.get(firstObject)?.(intersects[0], event)
      if(parentObject ?? parentObject?.isGroup)
        pointerMove.get(parentObject)?.(previouslyIntersectedObject, event)
    }

    previouslyIntersectedObject = firstObject || null
  })

  return {
    registerObject,
    deregisterObject,
  }
}
