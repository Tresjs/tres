import { Vector2 } from 'three'
import type { Object3D, type Intersection } from 'three'
import type { Ref } from 'vue'
import { computed, onUnmounted, ref } from 'vue'
import type { EventHook } from '@vueuse/core'
import { createEventHook, useElementBounding, usePointer, useWindowSize } from '@vueuse/core'

import { type TresContext } from '../useTresContextProvider'

export type Intersects = Intersection<THREE.Object3D<THREE.Event>>[]
interface PointerMoveEventPayload {
  intersects?: Intersects
  event: PointerEvent
}

interface PointerClickEventPayload {
  intersects: Intersects
  event: PointerEvent
}

export const useRaycaster = (
  objects: Ref<THREE.Object3D[]>,
  { renderer, camera, raycaster }: Pick<TresContext, 'renderer' | 'camera' | 'raycaster'>,
  isWindow?: boolean,
) => {
  // having a separate computed makes useElementBounding work
  const canvas = computed(() => renderer.value.domElement as HTMLCanvasElement)
  const target = isWindow ? window : canvas

  const { x, y } = usePointer({ target })

  const windowSize = {
    ...useWindowSize(),
    top: ref(0),
    left: ref(0),
  }

  const { width, height, top, left } = isWindow ? windowSize : useElementBounding(canvas)

  const getRelativePointerPosition = ({ x, y }: { x: number; y: number }) => {
    if (!canvas.value) return

    return {
      x: ((x - left.value) / width.value) * 2 - 1,
      y: -((y - top.value) / height.value) * 2 + 1,
    }
  }

  const getIntersectsByRelativePointerPosition = ({ x, y }: { x: number; y: number }) => {
    if (!camera.value) return

    raycaster.value.setFromCamera(new Vector2(x, y), camera.value)

    return raycaster.value.intersectObjects(objects.value, false)
  }

  const getIntersects = (event?: PointerEvent | MouseEvent) => {
    const pointerPosition = getRelativePointerPosition({
      x: event?.clientX ?? x.value,
      y: event?.clientY ?? y.value,
    })
    if (!pointerPosition) return []

    return getIntersectsByRelativePointerPosition(pointerPosition) || []
  }

  const intersects = computed<Intersects>(() => getIntersects())

  const eventHookClick = createEventHook<PointerClickEventPayload>()
  const eventHookPointerMove = createEventHook<PointerMoveEventPayload>()

  const triggerEventHook = (eventHook: EventHook, event: PointerEvent | MouseEvent) => {
    eventHook.trigger({ event, intersects: getIntersects(event) })
  }

  const onPointerMove = (event: PointerEvent) => {
    triggerEventHook(eventHookPointerMove, event)
  }

  // a click event is fired whenever a pointerdown happened after pointerup on the same object

  let mouseDownObject: Object3D | undefined = undefined

  const onPointerDown = (event: PointerEvent) => {
    mouseDownObject = getIntersects(event)[0]?.object
  }

  const onPointerUp = (event: MouseEvent) => {
    if (!(event instanceof PointerEvent)) return // prevents triggering twice on mobile devices

    if (mouseDownObject === getIntersects(event)[0]?.object) triggerEventHook(eventHookClick, event)
  }

  const onPointerLeave = (event: PointerEvent) => eventHookPointerMove.trigger({ event, intersects: [] })

  if (isWindow) {
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
  }
  else { 
    canvas.value.addEventListener('pointerup', onPointerUp)
    canvas.value.addEventListener('pointerdown', onPointerDown)
    canvas.value.addEventListener('pointermove', onPointerMove)
    canvas.value.addEventListener('pointerleave', onPointerLeave)
  }

  onUnmounted(() => {
    if (!canvas?.value) return
    canvas.value.removeEventListener('pointerup', onPointerUp)
    canvas.value.removeEventListener('pointerdown', onPointerDown)
    canvas.value.removeEventListener('pointermove', onPointerMove)
    canvas.value.removeEventListener('pointerleave', onPointerLeave)
  })

  return {
    intersects,
    onClick: (fn: (value: PointerClickEventPayload) => void) => eventHookClick.on(fn).off,
    onPointerMove: (fn: (value: PointerMoveEventPayload) => void) => eventHookPointerMove.on(fn).off,
  }
}
