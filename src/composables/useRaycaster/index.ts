import { Vector2 } from 'three'
import type { Object3D, Intersection } from 'three'
import type { Ref, ShallowRef } from 'vue'
import { computed, onUnmounted, shallowRef } from 'vue'
import type { EventHook } from '@vueuse/core'
import { createEventHook, useElementBounding, usePointer } from '@vueuse/core'

import { type TresContext } from '../useTresContextProvider'

export type Intersects = Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
interface PointerMoveEventPayload {
  intersects?: Intersects
  event: PointerEvent
}

interface PointerClickEventPayload {
  intersects: Intersects
  event: PointerEvent
}

interface WheelEventPayload {
  intersects: Intersects
  event: WheelEvent
}

export const useRaycaster = (
  objects: Ref<THREE.Object3D[]>,
  ctx: TresContext,
) => {
  // having a separate computed makes useElementBounding work
  const canvas = computed(() => ctx.renderer.value.domElement as HTMLCanvasElement)

  const { x, y } = usePointer({ target: canvas })

  const { width, height, top, left } = useElementBounding(canvas)

  const getRelativePointerPosition = ({ x, y }: { x: number; y: number }) => {
    if (!canvas.value) return

    return {
      x: ((x - left.value) / width.value) * 2 - 1,
      y: -((y - top.value) / height.value) * 2 + 1,
    }
  }

  const getIntersectsByRelativePointerPosition = ({ x, y }: { x: number; y: number }) => {
    if (!ctx.camera.value) return

    ctx.raycaster.value.setFromCamera(new Vector2(x, y), ctx.camera.value)

    intersects.value = ctx.raycaster.value.intersectObjects(objects.value, true)
    return intersects.value
  }

  const getIntersects = (event?: PointerEvent | MouseEvent | WheelEvent) => {
    const pointerPosition = getRelativePointerPosition({
      x: event?.clientX ?? x.value,
      y: event?.clientY ?? y.value,
    })
    if (!pointerPosition) return []

    return getIntersectsByRelativePointerPosition(pointerPosition) || []
  }

  const intersects: ShallowRef<Intersects[]> = shallowRef([])

  const eventHookClick = createEventHook<PointerClickEventPayload>()
  const eventHookDblClick = createEventHook<PointerClickEventPayload>()
  const eventHookPointerMove = createEventHook<PointerMoveEventPayload>()
  const eventHookPointerUp = createEventHook<PointerMoveEventPayload>()
  const eventHookPointerDown = createEventHook<PointerMoveEventPayload>()
  const eventHookPointerMissed = createEventHook<PointerClickEventPayload>()
  const eventHookContextMenu = createEventHook<PointerClickEventPayload>()
  const eventHookWheel = createEventHook<WheelEventPayload>()

  const triggerEventHook = (eventHook: EventHook, event: PointerEvent | MouseEvent | WheelEvent) => {
    eventHook.trigger({ event, intersects: intersects.value })
  }

  let previousPointerMoveEvent: PointerEvent | undefined = undefined
  const onPointerMove = (event: PointerEvent) => {
    // Update the raycast intersects
    getIntersects(event)
    triggerEventHook(eventHookPointerMove, event)
    previousPointerMoveEvent = event
  }

  const forceUpdate = () => {
    if (previousPointerMoveEvent)
      onPointerMove(previousPointerMoveEvent)
  }

  // a click event is fired whenever a pointerdown happened after pointerup on the same object
  let mouseDownObject: Object3D | undefined = undefined

  const onPointerDown = (event: PointerEvent) => {
    mouseDownObject = intersects.value[0]?.object
    triggerEventHook(eventHookPointerDown, event)
  }

  let previousClickObject: Object3D | undefined = undefined
  let doubleClickConfirmed: boolean = false

  const onPointerUp = (event: MouseEvent) => {
    if (!(event instanceof PointerEvent)) return // prevents triggering twice on mobile devices

    // We missed every object, trigger the pointer missed event
    if (intersects.value.length === 0) {
      triggerEventHook(eventHookPointerMissed, event)
    }

    if (mouseDownObject === intersects.value[0]?.object) {
      // We clicked on the object, update the count
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

  const onPointerLeave = (event: PointerEvent) => eventHookPointerMove.trigger({ event, intersects: [] })

  const onWheel = (event: WheelEvent) => eventHookWheel.trigger({ event, intersects: intersects.value })

  canvas.value.addEventListener('pointerup', onPointerUp)
  canvas.value.addEventListener('pointerdown', onPointerDown)
  canvas.value.addEventListener('pointermove', onPointerMove)
  canvas.value.addEventListener('pointerleave', onPointerLeave)
  canvas.value.addEventListener('dblclick', onDoubleClick)
  canvas.value.addEventListener('wheel', onWheel)

  onUnmounted(() => {
    if (!canvas?.value) return
    canvas.value.removeEventListener('pointerup', onPointerUp)
    canvas.value.removeEventListener('pointerdown', onPointerDown)
    canvas.value.removeEventListener('pointermove', onPointerMove)
    canvas.value.removeEventListener('pointerleave', onPointerLeave)
    canvas.value.removeEventListener('dblclick', onDoubleClick)
    canvas.value.removeEventListener('wheel', onWheel)
  })

  return {
    intersects,
    onClick: (fn: (value: PointerClickEventPayload) => void) => eventHookClick.on(fn).off,
    onDblClick: (fn: (value: PointerClickEventPayload) => void) => eventHookDblClick.on(fn).off,
    onContextMenu: (fn: (value: PointerClickEventPayload) => void) => eventHookContextMenu.on(fn).off,
    onPointerMove: (fn: (value: PointerMoveEventPayload) => void) => eventHookPointerMove.on(fn).off,
    onPointerUp: (fn: (value: PointerMoveEventPayload) => void) => eventHookPointerUp.on(fn).off,
    onPointerDown: (fn: (value: PointerMoveEventPayload) => void) => eventHookPointerDown.on(fn).off,
    onPointerMissed: (fn: (value: PointerClickEventPayload) => void) => eventHookPointerMissed.on(fn).off,
    onWheel: (fn: (value: WheelEventPayload) => void) => eventHookWheel.on(fn).off,
    forceUpdate,
  }
}
