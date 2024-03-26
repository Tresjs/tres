import { computed, shallowRef } from 'vue'
import type { Event, Object3D } from 'three'
import type { TresContext } from '../useTresContextProvider'
import { useRaycaster } from '../useRaycaster'
import type { Intersects } from '../useRaycaster'
import { hyphenate } from '../../utils'

export function useTresEventManager(
  scene: THREE.Scene, 
  context: TresContext, 
  emit: (event: string, ...args: any[]) => void) {
  const _scene = shallowRef<THREE.Scene>()
  const _context = shallowRef<TresContext>()

  if (scene) _scene.value = scene
  if (context) _context.value = context

  // TODO: Optimize to not hit test on the whole scene
  const sceneChildren = computed(() =>
    _scene.value ? _scene.value.children : [],
  )

  function executeEventListeners(
    listeners: Function | Function[],
    intersection,
    event,
  ) {
    // Components with multiple event listeners will have an array of functions
    if (Array.isArray(listeners)) {
      for (const listener of listeners) {
        listener(intersection, event)
      }
    }

    // Single listener will be a function
    if (typeof listeners === 'function') {
      listeners(intersection, event)
    }
  }

  /**
   * propogateEvent
   *
   * Propogates an event to all intersected objects and their parents
   * @param eventName - The name of the event to propogate
   * @param event - The event object
   * @param intersects - An array of intersections
   */
  function propogateEvent(eventName: string, event, intersects: Intersects | undefined) {
    const duplicates = []
    let stopPropagating = false
    const stopPropagatingFn = () => (stopPropagating = true)
    
    // Loop through all intersected objects and call their event handler
    for (const intersection of intersects) {
      if (stopPropagating) return
      intersection.stopPropagation = stopPropagatingFn
      // Does stopProagation work for parents?
      const { object } = intersection
      executeEventListeners(object[eventName], intersection, event)
      duplicates.push(object)

      // Propogate the event up the parent chain before moving on to the next intersected object
      let parent = object.parent
      while (parent !== null && !stopPropagating) {
        // Parent is a duplicate, we've already propogated up this path
        if (duplicates.includes(parent)) {
          break
        }
        parent.stopPropagation = stopPropagatingFn
        executeEventListeners(parent[eventName], intersection, event)
        duplicates.push(parent)
        parent = parent.parent
      }

      // Convert eventName to kebab case and emit event from TresCanvas
      const kebabEventName = hyphenate(eventName.slice(2))
      emit(kebabEventName, { intersection, event })
    }
  }

  const {
    onClick,
    onDblClick,
    onContextMenu,
    onPointerMove,
    onPointerDown,
    onPointerUp,
    onPointerMissed,
    onWheel,
    forceUpdate,
  } = useRaycaster(sceneChildren, context)

  onPointerUp(({ event, intersects }) =>  
    propogateEvent('onPointerUp', event, intersects),
  )
  onPointerDown(({ event, intersects }) =>
    propogateEvent('onPointerDown', event, intersects),
  )
  onClick(({ event, intersects }) =>
    propogateEvent('onClick', event, intersects),
  )
  onDblClick(({ event, intersects }) =>
    propogateEvent('onDoubleClick', event, intersects),
  )
  onContextMenu(({ event, intersects }) =>
    propogateEvent('onContextMenu', event, intersects),
  )
  onWheel(({ event, intersects }) =>
    propogateEvent('onWheel', event, intersects),
  )

  let previouslyIntersectedObject: Object3D<Event> | null

  onPointerMove(({ intersects, event }) => {
    const firstObject = intersects?.[0]?.object

    if (
      previouslyIntersectedObject
      && previouslyIntersectedObject !== firstObject
    ) {
      propogateEvent('onPointerLeave', event, [
        { object: previouslyIntersectedObject },
      ])
      propogateEvent('onPointerOut', event, [
        { object: previouslyIntersectedObject },
      ])
    }

    if (firstObject) {
      if (previouslyIntersectedObject !== firstObject) {
        propogateEvent('onPointerEnter', event, intersects)
        propogateEvent('onPointerOver', event, intersects)
      }
      propogateEvent('onPointerMove', event, intersects)
    }

    previouslyIntersectedObject = firstObject || null
  })

  onPointerMissed(({ event }) => {

    pointerMissedObjects.forEach((object: Object3D) => {
      executeEventListeners(object['onPointerMissed'], [], event)
    })
    // Emit pointer-missed from TresCanvas
    emit('pointer-missed', { event })
  })

  if (import.meta.hot) {
    import.meta.hot.on('vite:afterUpdate', () => {
      // Using for debug, will remove before PR is merged
      // console.log('events hmr: ', scene, context)
    })
  }

  /**
   * We need to track pointer missed objects separately
   * since they will not be a part of the raycaster intersection
   */ 
  const pointerMissedObjects: Object3D[] = []
  function registerPointerMissedObject(object: Object3D) {
    pointerMissedObjects.push(object)
  }

  function deregisterPointerMissedObject(object: Object3D) {
    const index = pointerMissedObjects.indexOf(object)
    if (index > -1) {
      pointerMissedObjects.splice(index, 1)
    }
  }

  // Attach methods to tres context
  context.eventManager = {  
    forceUpdate,
    registerPointerMissedObject,
    deregisterPointerMissedObject,
  }   
  
  return { forceUpdate, registerPointerMissedObject, deregisterPointerMissedObject }
}
