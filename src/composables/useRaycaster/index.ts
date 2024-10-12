import type { EventHook } from '@vueuse/core'
import type { DomEvent, TresCamera, TresEvent, TresInstance } from 'src/types'
import type { Intersection, Object3D, Object3DEventMap } from 'three'
import type { ShallowRef } from 'vue'
import type { TresContext } from '../useTresContextProvider'
import { createEventHook, useElementBounding, usePointer } from '@vueuse/core'

import { Vector2, Vector3 } from 'three'
import { computed, onUnmounted, shallowRef } from 'vue'

export const useRaycaster = (
  objectsWithEvents: ShallowRef<TresInstance[]>,
  ctx: TresContext,
) => {
  // having a separate computed makes useElementBounding work
  const canvas = computed(() => ctx.renderer.value.domElement as HTMLCanvasElement)
  const intersects: ShallowRef<Intersection[]> = shallowRef([])
  const { x, y } = usePointer({ target: canvas })
  let delta = 0

  const { width, height, top, left } = useElementBounding(canvas)

  const getRelativePointerPosition = ({ x, y }: { x: number, y: number }) => {
    if (!canvas.value) { return }

    return {
      x: ((x - left.value) / width.value) * 2 - 1,
      y: -((y - top.value) / height.value) * 2 + 1,
    }
  }

  const getIntersectsByRelativePointerPosition = ({ x, y }: { x: number, y: number }) => {
    if (!ctx.camera.value) { return }

    ctx.raycaster.value.setFromCamera(new Vector2(x, y), ctx.camera.value)

    intersects.value = ctx.raycaster.value.intersectObjects(objectsWithEvents.value as Object3D<Object3DEventMap>[], true)
    return intersects.value
  }

  const getIntersects = (event?: DomEvent) => {
    const pointerPosition = getRelativePointerPosition({
      x: event?.clientX ?? x.value,
      y: event?.clientY ?? y.value,
    })
    if (!pointerPosition) { return [] }

    return getIntersectsByRelativePointerPosition(pointerPosition) || []
  }

  const eventHookClick = createEventHook<TresEvent>()
  const eventHookDblClick = createEventHook<TresEvent>()
  const eventHookPointerMove = createEventHook<TresEvent>()
  const eventHookPointerUp = createEventHook<TresEvent>()
  const eventHookPointerDown = createEventHook<TresEvent>()
  const eventHookPointerMissed = createEventHook<TresEvent>()
  const eventHookContextMenu = createEventHook<TresEvent>()
  const eventHookWheel = createEventHook<TresEvent>()

  /* ({
    ...DomEvent                   // All the original event data
    ...Intersection               // All of Three's intersection data - see note 2
    intersections: Intersection[] // The first intersection of each intersected object
    object: Object3D              // The object that was actually hit (added to event payload in TresEventManager)
    eventObject: Object3D         // The object that registered the event (added to event payload in TresEventManager)
    unprojectedPoint: Vector3     // Camera-unprojected point
    ray: Ray                      // The ray that was used to strike the object
    camera: Camera                // The camera that was used in the raycaster
    sourceEvent: DomEvent         // A reference to the host event
    delta: number                 // Distance between mouse down and mouse up event in pixels
  }) => ... */

  // Mouse Event props aren't enumerable, so we can't be simple and use Object.assign or the spread operator
  // Manually copies the mouse event props into a new object that we can spread in triggerEventHook
  function copyMouseEventProperties(event: MouseEvent | PointerEvent | WheelEvent) {
    const mouseEventProperties: any = {}

    for (const property in event) {
      // Copy all non-function properties
      if (typeof property !== 'function') { mouseEventProperties[property] = (event as Record<string, any>)[property] }
    }
    return mouseEventProperties
  }

  const triggerEventHook = (eventHook: EventHook, event: PointerEvent | MouseEvent | WheelEvent) => {
    const eventProperties = copyMouseEventProperties(event)
    const unprojectedPoint = new Vector3(event?.clientX, event?.clientY, 0).unproject(ctx.camera?.value as TresCamera)
    eventHook.trigger({
      ...eventProperties,
      intersections: intersects.value,
      // The unprojectedPoint is wrong, math needs to be fixed
      unprojectedPoint,
      ray: ctx.raycaster?.value.ray,
      camera: ctx.camera?.value,
      sourceEvent: event,
      delta,
      stopPropagating: false,
    })
  }

  let previousPointerMoveEvent: PointerEvent | undefined
  const onPointerMove = (event: PointerEvent) => {
    // Update the raycast intersects
    getIntersects(event)
    triggerEventHook(eventHookPointerMove, event)
    previousPointerMoveEvent = event
  }

  const forceUpdate = () => {
    if (previousPointerMoveEvent) { onPointerMove(previousPointerMoveEvent) }
  }

  // a click event is fired whenever a pointerdown happened after pointerup on the same object
  let mouseDownObject: Object3D | undefined
  let mouseDownPosition: Vector2
  let mouseUpPosition: Vector2

  const onPointerDown = (event: PointerEvent) => {
    mouseDownObject = intersects.value[0]?.object

    delta = 0
    mouseDownPosition = new Vector2(
      event?.clientX ?? x.value,
      event?.clientY ?? y.value,
    )

    triggerEventHook(eventHookPointerDown, event)
  }

  let previousClickObject: Object3D | undefined
  let doubleClickConfirmed: boolean = false

  const onPointerUp = (event: MouseEvent) => {
    if (!(event instanceof PointerEvent)) { return } // prevents triggering twice on mobile devices

    mouseUpPosition = new Vector2(
      event?.clientX ?? x.value,
      event?.clientY ?? y.value,
    )

    // Compute the distance between the mouse down and mouse up events
    delta = mouseDownPosition?.distanceTo(mouseUpPosition)

    // We missed every object, trigger the pointer missed event
    if (intersects.value.length === 0) {
      triggerEventHook(eventHookPointerMissed, event)
    }

    if (mouseDownObject === intersects.value[0]?.object) {
      if (event.button === 0) {
        // Left click
        triggerEventHook(eventHookClick, event)

        if (previousClickObject === intersects.value[0]?.object) {
          doubleClickConfirmed = true
        }
        else {
          previousClickObject = intersects.value[0]?.object
          doubleClickConfirmed = false
        }
      }
      else if (event.button === 2) {
        // Right click
        triggerEventHook(eventHookContextMenu, event)
      }
    }

    triggerEventHook(eventHookPointerUp, event)
  }

  const onDoubleClick = (event: MouseEvent) => {
    if (doubleClickConfirmed) {
      triggerEventHook(eventHookDblClick, event)
      previousClickObject = undefined
      doubleClickConfirmed = false
    }
  }

  const onPointerLeave = (event: PointerEvent) => triggerEventHook(eventHookPointerMove, event)

  const onWheel = (event: WheelEvent) => triggerEventHook(eventHookWheel, event)

  canvas.value.addEventListener('pointerup', onPointerUp)
  canvas.value.addEventListener('pointerdown', onPointerDown)
  canvas.value.addEventListener('pointermove', onPointerMove)
  canvas.value.addEventListener('pointerleave', onPointerLeave)
  canvas.value.addEventListener('dblclick', onDoubleClick)
  canvas.value.addEventListener('wheel', onWheel)

  onUnmounted(() => {
    if (!canvas?.value) { return }
    canvas.value.removeEventListener('pointerup', onPointerUp)
    canvas.value.removeEventListener('pointerdown', onPointerDown)
    canvas.value.removeEventListener('pointermove', onPointerMove)
    canvas.value.removeEventListener('pointerleave', onPointerLeave)
    canvas.value.removeEventListener('dblclick', onDoubleClick)
    canvas.value.removeEventListener('wheel', onWheel)
  })

  return {
    intersects,
    onClick: (fn: (value: TresEvent) => void) => eventHookClick.on(fn).off,
    onDblClick: (fn: (value: TresEvent) => void) => eventHookDblClick.on(fn).off,
    onContextMenu: (fn: (value: TresEvent) => void) => eventHookContextMenu.on(fn).off,
    onPointerMove: (fn: (value: TresEvent) => void) => eventHookPointerMove.on(fn).off,
    onPointerUp: (fn: (value: TresEvent) => void) => eventHookPointerUp.on(fn).off,
    onPointerDown: (fn: (value: TresEvent) => void) => eventHookPointerDown.on(fn).off,
    onPointerMissed: (fn: (value: TresEvent) => void) => eventHookPointerMissed.on(fn).off,
    onWheel: (fn: (value: TresEvent) => void) => eventHookWheel.on(fn).off,
    forceUpdate,
  }
}
