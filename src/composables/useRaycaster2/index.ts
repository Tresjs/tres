import { useTres } from '../useTres'
import { Raycaster, Vector2 } from 'three'
import { Ref, computed, onUnmounted, ref, watchEffect } from 'vue'
import { createEventHook, useElementBounding, usePointer } from '@vueuse/core'

export type Intersects = THREE.Intersection<THREE.Object3D<THREE.Event>>[]
interface ClickEventPayload {
  intersects: Intersects
  event: PointerEvent
}

export const useRaycaster2 = (objects: Ref<THREE.Object3D[]>) => {
  const { state } = useTres()

  const canvas = computed(() => state.canvas?.value) // having a seperate computed makes useElementBounding work

  const { x, y } = usePointer({ target: canvas }) // TODO advanced pointer options?

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

  const eventHookClick = createEventHook<ClickEventPayload>()

  const triggerEventHookClick = (event: PointerEvent) => {
    eventHookClick.trigger({ event, intersects: getIntersects(event) })
  }

  //distinguishing between clicks and drags (in cas of panning or dollying for example)
  let clicked = false

  const onPointerDown = () => {
    clicked = true
  }
  const onPointerMove = () => {
    clicked = false
  }
  const onPointerUp = (event: PointerEvent) => {
    if (!(event instanceof PointerEvent)) return // prevents triggering twice on mobile devices

    if (clicked) triggerEventHookClick(event)
  }

  const unwatch = watchEffect(() => {
    if (!canvas?.value) return

    canvas.value.addEventListener('pointerdown', onPointerDown)
    canvas.value.addEventListener('pointermove', onPointerMove)
    canvas.value.addEventListener('pointerup', onPointerUp)

    unwatch()
  })

  onUnmounted(() => {
    if (!canvas?.value) return
    canvas.value.removeEventListener('pointerdown', onPointerDown)
    canvas.value.removeEventListener('pointermove', onPointerMove)
    canvas.value.removeEventListener('pointerup', onPointerUp)
  })

  return {
    // intersects,
    onClick: (fn: (value: ClickEventPayload) => void) => eventHookClick.on(fn).off,
  }
}
