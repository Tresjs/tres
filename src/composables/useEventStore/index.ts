import { computed, shallowRef } from 'vue'
import type { TresContext } from '../useTresContextProvider'
import { useRaycaster } from '../useRaycaster'
import { Event, Object3D } from 'three'
import { hyphenate } from '../../utils'

export function useEventStore(scene: THREE.Scene, context: TresContext, emit) {
    const _scene = shallowRef<THREE.Scene>()
    const _context = shallowRef<TresContext>()

    if(scene) _scene.value = scene
    if(context) _context.value = context

    const sceneChildren = computed(() => {
      return _scene.value ? _scene.value.children : []
    })

    function executeEventListeners(listeners: Function | Function[], intersection, event){
      // Components with multiple event listeners will have an array of functions
      if (Array.isArray(listeners)) {
        for (const listener of listeners) {
          listener(intersection, event);
        }
      }

      // Single listener will be a function
      if (typeof listeners === 'function') {
        listeners(intersection, event);
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
    function propogateEvent(eventName: string, event, intersects) {
      let stopPropagating = false;
      const stopPropagatingFn = () => stopPropagating = true;
      // Loop through all intersected objects and call their event handler
      if (intersects.length) {
        for(const intersection of intersects) {
          if (stopPropagating) return;
          intersection.stopPropagation = stopPropagatingFn

          const { object } = intersection
          executeEventListeners(object[eventName], intersection, event)

          // Propogate the event up the parent chain before moving on to the next intersected object
          let parent = object.parent
          while(parent !== null && !stopPropagating) {
            executeEventListeners(parent[eventName], intersection, event)
            parent = parent.parent
          }

          // Convert eventName to kebab case to emit event from TresCanvas
          let kebabEventName = hyphenate(eventName.slice(2))
          emit(kebabEventName, { intersection, event })
        }
      }
    }

    const { onClick, onDblClick, onContextMenu, onPointerMove, onPointerDown, onPointerUp, onWheel, forceUpdate } = useRaycaster(sceneChildren, _context.value)

    onPointerUp(({event, intersects}) => propogateEvent("onPointerUp", event, intersects))
    onPointerDown(({event, intersects}) => propogateEvent("onPointerDown", event, intersects))
    onClick(({event, intersects}) => propogateEvent("onClick", event, intersects))
    onDblClick(({event, intersects}) => propogateEvent("onDoubleClick", event, intersects))
    onContextMenu(({event, intersects}) => propogateEvent("onContextMenu", event, intersects))
    onWheel(({event, intersects}) => propogateEvent("onWheel", event, intersects))


    let previouslyIntersectedObject: Object3D<Event> | null

    onPointerMove(({ intersects, event }) => {
      const firstObject = intersects?.[0]?.object
  
      if (previouslyIntersectedObject && previouslyIntersectedObject !== firstObject){
        propogateEvent("onPointerLeave", event, [{object: previouslyIntersectedObject}])
        propogateEvent("onPointerOut", event, [{object: previouslyIntersectedObject}])
      }
  
      if (firstObject) {
        if (previouslyIntersectedObject !== firstObject) {
          propogateEvent("onPointerEnter", event, intersects)
          propogateEvent("onPointerOver", event, intersects)
        }
        propogateEvent("onPointerMove", event, intersects)
      }
  
      previouslyIntersectedObject = firstObject || null
    })

    return { forceUpdate }
  }