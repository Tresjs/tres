import { computed, shallowRef } from 'vue'
import type { Object3D } from 'three'
import type { TresContext } from '../useTresContextProvider'
import { useRaycaster } from '../useRaycaster'
import type { Intersects } from '../useRaycaster'
import { hyphenate } from '../../utils'

export interface TresEventManager {
  /**
   * Forces the event system to refire events with the previous mouse event
   */
  forceUpdate: () => void
  /**
   * pointer-missed events by definition are fired when the pointer missed every object in the scene
   * So we need to track them separately
   * Note: These are used in nodeOps
   */
  registerPointerMissedObject: (object: Object3D) => void
  deregisterPointerMissedObject: (object: Object3D) => void
}

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
    event,
  ) {
    // Components with multiple event listeners will have an array of functions
    if (Array.isArray(listeners)) {
      for (const listener of listeners) {
        listener(event)
      }
    }

    // Single listener will be a function
    if (typeof listeners === 'function') {
      listeners(event)
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
  function propogateEvent(eventName: string, event) {
    // Array of objects we've already propogated to
    const duplicates = []

    // Flag that is set to true when the stopProgatingFn is called
    const stopPropagatingFn = () => (event.stopPropagating = true)
    event.stopPropagation = stopPropagatingFn

    // Loop through all intersected objects and call their event handler
    for (const intersection of event?.intersections) {
      if (event.stopPropagating) return

      // Add intersection data to event object
      event = { ...event, ...intersection }

      const { object } = intersection
      event.eventObject = object
      executeEventListeners(object[eventName], event)
      duplicates.push(object)

      // Propogate the event up the parent chain before moving on to the next intersected object
      let parentObj = object.parent
      while (parentObj !== null && !event.stopPropagating) {
        // We've already been here, break the loop
        if (duplicates.includes(parentObj)) {
          break
        }
        
        // Sets eventObject to object that registered the event listener
        event.eventObject = parentObj
        executeEventListeners(parentObj[eventName], event)
        duplicates.push(parentObj)
        parentObj = parentObj.parent
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

  onPointerUp(event => propogateEvent('onPointerUp', event))
  onPointerDown(event => propogateEvent('onPointerDown', event))
  onClick(event => propogateEvent('onClick', event))
  onDblClick(event => propogateEvent('onDoubleClick', event))
  onContextMenu(event => propogateEvent('onContextMenu', event))
  onWheel(event => propogateEvent('onWheel', event))

  let prevIntersections: Intersects = []

  onPointerMove(event => {
    // Current intersections mapped as meshes
    const hits = event.intersections.map(({ object }) => object)

    // Previously intersected mesh is no longer intersected, fire onPointerLeave
    prevIntersections.forEach((hit) => {
      if (
        !hits.includes(hit)
      ) {
        propogateEvent('onPointerLeave', event)
        propogateEvent('onPointerOut', event)
      }
    })

    // Newly intersected mesh is not in the previous intersections, fire onPointerEnter
    event.intersections.forEach(({ object: hit}) => {
      if (!prevIntersections.includes(hit)) {
        propogateEvent('onPointerEnter', event)
        propogateEvent('onPointerOver', event)
      }
    })

    // Fire onPointerMove for all intersected objects
    propogateEvent('onPointerMove', event)

    // Update previous intersections
    prevIntersections = hits
  })

  onPointerMissed((event) => {
    // Flag that is set to true when the stopProgatingFn is called
    const stopPropagatingFn = () => (event.stopPropagating = true)
    event.stopPropagation = stopPropagatingFn

    pointerMissedObjects.forEach((object: Object3D) => {
      if (event.stopPropagating) return

      // Set eventObject to object that registered the event
      event.eventObject = object

      executeEventListeners(object['onPointerMissed'], event)
    })
    // Emit pointer-missed from TresCanvas
    emit('pointer-missed', { event })
  })

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
