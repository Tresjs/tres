import type { Intersection, PointerEventType, TresEvent, TresInstance, TresObject, TresPointerEvent } from 'src/types'
import type { Object3D, Object3DEventMap, Scene } from 'three'
import type { TresContext } from '../useTresContextProvider'
import { shallowRef } from 'vue'
import { hyphenate } from '../../utils'
import { useRaycaster } from '../useRaycaster'
import { isObject3D, isTresObject } from '../../utils/is'
import type { EventHookOff } from '@vueuse/core'
import { createEventHook } from '@vueuse/core'

export interface TresEventManager {
  onEvent: EventHookOff<TresPointerEvent>
  /**
   * Forces the event system to refire events with the previous mouse event
   */
  forceUpdate: () => void
  /**
   * pointer-missed events by definition are fired when the pointer missed every object in the scene
   * So we need to track them separately
   * Note: These are used in nodeOps
   */
  registerObject: (object: unknown) => void
  deregisterObject: (object: unknown) => void
  registerPointerMissedObject: (object: unknown) => void
  deregisterPointerMissedObject: (object: unknown) => void
}
function executeEventListeners(
  listeners: (event: TresEvent) => void | ((event: TresEvent) => void)[],
  event: TresEvent,
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

export function useTresEventManager(
  scene: Scene,
  context: TresContext,
) {
  const _scene = shallowRef<Scene>()
  const _context = shallowRef<TresContext>()

  if (scene) { _scene.value = scene }
  if (context) { _context.value = context }

  const hasEvents = (object: TresInstance) => object.__tres?.eventCount > 0
  const hasChildrenWithEvents = (object: TresInstance) => object.children?.some((child: TresInstance) => hasChildrenWithEvents(child)) || hasEvents(object)
  // TODO: Optimize to not hit test on the whole scene
  const objectsWithEvents = shallowRef((_scene.value?.children as TresInstance[]).filter(hasChildrenWithEvents) || [])

  const eventHook = createEventHook<TresPointerEvent>()

  /**
   * propogateEvent
   *
   * Propogates an event to all intersected objects and their parents
   * @param eventName - The name of the event to propogate
   * @param event - The event object to propogate
   */
  function propogateEvent(eventName: string, event: TresEvent) {
    // Array of objects we've already propogated to
    const duplicates = []

    // Flag that is set to true when the stopProgatingFn is called
    const stopPropagatingFn = () => (event.stopPropagating = true)
    event.stopPropagation = stopPropagatingFn

    // Loop through all intersected objects and call their event handler
    for (const intersection of event?.intersections) {
      if (event.stopPropagating) { return }

      // Add intersection data to event object
      event = { ...event, ...intersection }

      const { object } = intersection
      event.eventObject = object as TresObject
      executeEventListeners((object as Record<string, any>)[eventName], event)
      duplicates.push(object)

      // Propogate the event up the parent chain before moving on to the next intersected object
      let parentObj = object.parent
      while (parentObj !== null && !event.stopPropagating) {
        // We've already been here, break the loop
        if (duplicates.includes(parentObj)) {
          break
        }

        // Sets eventObject to object that registered the event listener
        event.eventObject = parentObj as TresObject
        executeEventListeners((parentObj as Record<string, any>)[eventName], event)
        duplicates.push(parentObj)
        parentObj = parentObj.parent
      }

      // Convert eventName to kebab case and emit event from TresCanvas
      const kebabEventName = hyphenate(eventName.slice(2)) as PointerEventType

      eventHook.trigger({ type: kebabEventName, event, intersection })
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
  } = useRaycaster(objectsWithEvents, context)

  onPointerUp(event => propogateEvent('onPointerUp', event))
  onPointerDown(event => propogateEvent('onPointerDown', event))
  onClick(event => propogateEvent('onClick', event))
  onDblClick(event => propogateEvent('onDoubleClick', event))
  onContextMenu(event => propogateEvent('onContextMenu', event))
  onWheel(event => propogateEvent('onWheel', event))

  let prevIntersections: Intersection[] = []

  onPointerMove((event) => {
    // Current intersections mapped as meshes
    const hits = event.intersections.map(({ object }) => object)

    // Keep Backup of new intersections incase we overwrite due to a pointer out or leave event
    const newIntersections = event.intersections as unknown as Intersection[]

    // Previously intersected mesh is no longer intersected, fire onPointerLeave
    prevIntersections.forEach(({ object: hit }) => {
      if (
        !hits.includes(hit as unknown as Object3D<Object3DEventMap>)
      ) {
        event.intersections = prevIntersections
        propogateEvent('onPointerLeave', event)
        propogateEvent('onPointerOut', event)
      }
    })

    // Reset intersections to newIntersections
    event.intersections = newIntersections

    // Newly intersected mesh is not in the previous intersections, fire onPointerEnter
    event.intersections.forEach(({ object: hit }) => {
      if (!prevIntersections.includes(hit as unknown as Intersection)) {
        propogateEvent('onPointerEnter', event)
        propogateEvent('onPointerOver', event)
      }
    })

    // Fire onPointerMove for all intersected objects
    propogateEvent('onPointerMove', event)

    // Update previous intersections
    prevIntersections = event.intersections as unknown as Intersection[]
  })

  /**
   * We need to track pointer missed objects separately
   * since they will not be a part of the raycaster intersection
   */
  const pointerMissedObjects: TresObject[] = []
  onPointerMissed((event: TresEvent) => {
    // Flag that is set to true when the stopProgatingFn is called
    const stopPropagatingFn = () => (event.stopPropagating = true)
    event.stopPropagation = stopPropagatingFn

    pointerMissedObjects.forEach((object: TresObject) => {
      if (event.stopPropagating) { return }

      // Set eventObject to object that registered the event
      event.eventObject = object

      executeEventListeners(object.onPointerMissed, event)
    })

    eventHook.trigger({ type: 'pointer-missed', event })
  })

  function registerObject(maybeTresObject: unknown) {
    if (isTresObject(maybeTresObject) && isObject3D(maybeTresObject)) {
      objectsWithEvents.value.push(maybeTresObject as TresInstance)
    }
  }

  function deregisterObject(maybeTresObject: unknown) {
    if (isTresObject(maybeTresObject) && isObject3D(maybeTresObject)) {
      const index = objectsWithEvents.value.indexOf(maybeTresObject as TresInstance)
      if (index > -1) {
        objectsWithEvents.value.splice(index, 1)
      }
    }
  }

  function registerPointerMissedObject(maybeTresObject: unknown) {
    if (isTresObject(maybeTresObject) && isObject3D(maybeTresObject) && maybeTresObject.onPointerMissed) {
      pointerMissedObjects.push(maybeTresObject)
    }
  }

  function deregisterPointerMissedObject(maybeTresObject: unknown) {
    if (isTresObject(maybeTresObject) && isObject3D(maybeTresObject)) {
      const index = pointerMissedObjects.indexOf(maybeTresObject)
      if (index > -1) {
        pointerMissedObjects.splice(index, 1)
      }
    }
  }

  // Attach methods to tres context
  context.eventManager = {
    onEvent: eventHook.on,
    forceUpdate,
    registerObject,
    deregisterObject,
    registerPointerMissedObject,
    deregisterPointerMissedObject,
  }

  return {
    onEvent: eventHook.on,
    forceUpdate,
    registerObject,
    deregisterObject,
    registerPointerMissedObject,
    deregisterPointerMissedObject,
  }
}
