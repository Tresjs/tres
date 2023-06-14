import { useTres } from '../useTres'
import { Raycaster, Vector2 } from 'three'
import { Ref, computed, onUnmounted, watchEffect } from 'vue'
import { EventHook, createEventHook, useElementBounding, usePointer } from '@vueuse/core'

export type Intersects = THREE.Intersection<THREE.Object3D<THREE.Event>>[]
interface PointerMoveEventPayload {
  intersects?: Intersects
  event: PointerEvent
}

interface PointerClickEventPayload {
  intersects: Intersects
  event: PointerEvent
}

export const useRaycaster2 = (objects: Ref<THREE.Object3D[]>) => {
  const { state } = useTres()

  const canvas = computed(() => state.canvas?.value) // having a seperate computed makes useElementBounding work

  const { x, y } = usePointer({ target: canvas })

  const { width, height, top, left } = useElementBounding(canvas)

  const raycaster = new Raycaster()

  const getRelativePointerPosition = ({ x, y }: { x: number; y: number }) => {
    if (!canvas.value) return

    return {
      x: ((x - left.value) / width.value) * 2 - 1,
      y: -((y - top.value) / height.value) * 2 + 1,
    }
  }

  const getIntersectsByRelativePointerPosition = ({ x, y }: { x: number; y: number }) => {
    if (!state.camera) return

    raycaster.setFromCamera(new Vector2(x, y), state.camera)

    return raycaster.intersectObjects(objects.value, false)
  }

  const getIntersects = (event?: PointerEvent) => {
    const pointerPosition = getRelativePointerPosition({
      x: event?.clientX ?? x.value,
      y: event?.clientY ?? y.value,
    })
    if (!pointerPosition) return []

    return getIntersectsByRelativePointerPosition(pointerPosition) || []
  }

  // const intersects = ref<Intersects>([]) TODO

  // watchEffect(() => {
  //   intersects.value = getIntersects()
  // })

  const eventHookClick = createEventHook<PointerClickEventPayload>()
  const eventHookPointerMove = createEventHook<PointerMoveEventPayload>()

  const triggerEventHook = (eventHook: EventHook, event: PointerEvent) => {
    eventHook.trigger({ event, intersects: getIntersects(event) })
  }

  //distinguishing between clicks and drags (in cas of panning or dollying for example) // TODO discuss with other team members
  let clicked = false

  const onPointerDown = () => {
    clicked = true
  }
  const onPointerMove = (event: PointerEvent) => {
    clicked = false

    triggerEventHook(eventHookPointerMove, event)
  }

  const onPointerUp = (event: PointerEvent) => {
    if (!(event instanceof PointerEvent)) return // prevents triggering twice on mobile devices

    if (clicked) triggerEventHook(eventHookClick, event)
  }

  const onPointerLeave = (event: PointerEvent) => {
    eventHookPointerMove.trigger({ event, intersects: [] })
  }

  const unwatch = watchEffect(() => {
    if (!canvas?.value) return

    canvas.value.addEventListener('pointerdown', onPointerDown)
    canvas.value.addEventListener('pointermove', onPointerMove)
    canvas.value.addEventListener('pointerup', onPointerUp)
    canvas.value.addEventListener('pointerleave', onPointerLeave)

    unwatch()
  })

  onUnmounted(() => {
    if (!canvas?.value) return
    canvas.value.removeEventListener('pointerdown', onPointerDown)
    canvas.value.removeEventListener('pointermove', onPointerMove)
    canvas.value.removeEventListener('pointerup', onPointerUp)
    canvas.value.removeEventListener('pointerleave', onPointerLeave)
  })

  return {
    // intersects,
    onClick: (fn: (value: PointerClickEventPayload) => void) => eventHookClick.on(fn).off,
    onPointerMove: (fn: (value: PointerMoveEventPayload) => void) => eventHookPointerMove.on(fn).off,
  }
}
