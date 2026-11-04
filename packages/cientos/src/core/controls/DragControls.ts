import { computed, defineComponent, onUnmounted, shallowRef, watch } from 'vue'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { Camera, Object3D, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import type { TresControl } from '@tresjs/core'
import { DragControls as ThreeDragControls } from 'three-stdlib'

/** The three-stdlib `DragControls` instance that `instance` exposes and every event carries. */
export type DragControlsInstance = ThreeDragControls

/** The payload of every DragControls event. */
export interface DragControlsEvent {
  /**
   * The dragged or hovered object. With `transformGroup`, the dragged object is the first entry of `objects`.
   */
  object: Object3D
  /** The three-stdlib instance that fired the event. */
  controls: DragControlsInstance
}

const LOCK_AXES = ['x', 'y', 'z', 'none'] as const

type DragLimit = [number, number] | undefined

const dragControlsProps = {
  /**
   * The objects to make draggable. A hit on any descendant drags the hit mesh, or the first entry with `transformGroup`.
   *
   * @see https://github.com/pmndrs/three-stdlib/blob/main/src/controls/DragControls.ts
   */
  objects: { type: Array as PropType<Object3D[]>, required: true },
  /**
   * The camera used for raycasting.
   *
   * @default the active camera
   */
  camera: Object as PropType<Camera>,
  /**
   * Freezes the position on one axis while dragging, so the object only moves along the other two.
   *
   * @default 'none'
   */
  lock: {
    type: String as PropType<typeof LOCK_AXES[number]>,
    default: 'none',
    validator: (lock: string) => (LOCK_AXES as readonly string[]).includes(lock),
  },
  /**
   * If `false`, objects cannot be dragged and the controls stop listening to the DOM element.
   *
   * @default true
   */
  enabled: { type: Boolean, default: true },
  /**
   * Drags the first entry of `objects` as a whole when any of its descendants is hit,
   * instead of the hit mesh. Use it with a single `Group` or a loaded model.
   *
   * @default false
   */
  transformGroup: { type: Boolean, default: false },
  /**
   * Per-axis `[min, max]` limits on the local position. Pass `undefined` for an axis with no limit.
   */
  dragLimits: Array as PropType<[DragLimit, DragLimit, DragLimit]>,
  /**
   * The DOM element that listens for pointer events.
   *
   * @default the renderer's canvas
   */
  domElement: Object as PropType<HTMLElement>,
}

export type DragControlsProps = ExtractPublicPropTypes<typeof dragControlsProps>

const isDragControlsEvent = (event: DragControlsEvent) => event.controls instanceof ThreeDragControls

const dragControlsEmits = {
  dragstart: isDragControlsEvent,
  drag: isDragControlsEvent,
  dragend: isDragControlsEvent,
  hoveron: isDragControlsEvent,
  hoveroff: isDragControlsEvent,
}

export type DragControlsEmits = {
  [Name in keyof typeof dragControlsEmits]: Parameters<typeof dragControlsEmits[Name]>
}

export const DragControls = defineComponent({
  name: 'DragControls',
  props: dragControlsProps,
  emits: dragControlsEmits,
  setup(props, { expose, emit }) {
    const { camera: activeCamera, renderer, controls: defaultControls, invalidate } = useTres()

    const controlsRef = shallowRef<ThreeDragControls | null>(null)
    // Shared with the three-stdlib instance and refilled in place, so a new `objects` array does not rebuild the controls
    const draggableObjects: Object3D[] = []
    // The drag in progress and the local position it started from, so a disposal mid-drag can still end it
    let activeDrag: { object: Object3D, origin: Vector3 } | null = null
    // The default controls paused by the drag in progress, with their `enabled` state from before it
    let pausedDefaultControls: { control: TresControl, wasEnabled: boolean } | null = null

    const camera = computed(() => props.camera || activeCamera.value)
    const domElement = computed(() => props.domElement || renderer.domElement)

    const syncDraggableObjects = (objects: Object3D[]) => {
      draggableObjects.length = 0
      draggableObjects.push(...objects.filter(Boolean))
    }

    const pauseDefaultControls = () => {
      const control = defaultControls.value
      if (!control || pausedDefaultControls) { return }
      pausedDefaultControls = { control, wasEnabled: control.enabled }
      control.enabled = false
    }

    const resumeDefaultControls = () => {
      if (!pausedDefaultControls) { return }
      pausedDefaultControls.control.enabled = pausedDefaultControls.wasEnabled
      pausedDefaultControls = null
    }

    const constrainDraggedObject = (object: Object3D) => {
      if (activeDrag && props.lock !== 'none') {
        object.position[props.lock] = activeDrag.origin[props.lock]
      }
      if (props.dragLimits) {
        const [xLim, yLim, zLim] = props.dragLimits
        if (xLim) { object.position.x = Math.max(Math.min(object.position.x, xLim[1]), xLim[0]) }
        if (yLim) { object.position.y = Math.max(Math.min(object.position.y, yLim[1]), yLim[0]) }
        if (zLim) { object.position.z = Math.max(Math.min(object.position.z, zLim[1]), zLim[0]) }
      }
    }

    const startDrag = (object: Object3D, controls: ThreeDragControls) => {
      pauseDefaultControls()
      activeDrag = { object, origin: object.position.clone() }
      emit('dragstart', { object, controls })
    }

    const endDrag = (controls: ThreeDragControls) => {
      const object = activeDrag?.object
      activeDrag = null
      resumeDefaultControls()
      if (object) { emit('dragend', { object, controls }) }
    }

    const addEventListeners = (dragControls: ThreeDragControls) => {
      dragControls.addEventListener('dragstart', ({ object }) => startDrag(object, dragControls))

      dragControls.addEventListener('drag', ({ object }) => {
        constrainDraggedObject(object)
        invalidate()
        emit('drag', { object, controls: dragControls })
      })

      dragControls.addEventListener('dragend', () => endDrag(dragControls))
      dragControls.addEventListener('hoveron', ({ object }) => emit('hoveron', { object, controls: dragControls }))
      dragControls.addEventListener('hoveroff', ({ object }) => emit('hoveroff', { object, controls: dragControls }))
    }

    const createControls = (cam: Camera, element: HTMLElement) => {
      const dragControls = new ThreeDragControls(draggableObjects, cam, element)
      dragControls.transformGroup = props.transformGroup
      if (!props.enabled) {
        // three-stdlib still fires `dragstart` and hover events when only `enabled` is false, so stop listening too
        dragControls.deactivate()
        dragControls.enabled = false
      }
      addEventListeners(dragControls)
      return dragControls
    }

    const disposeControls = () => {
      const controls = controlsRef.value
      if (!controls) { return }
      controls.dispose()
      controlsRef.value = null
      // A disposed instance never fires `dragend`, so end the drag in progress here
      endDrag(controls)
    }

    watch(() => [...(props.objects ?? [])], syncDraggableObjects, { immediate: true })

    // three-stdlib reads `transformGroup` on each press, so the live instance can take the new value
    watch(() => props.transformGroup, (transformGroup) => {
      if (controlsRef.value) { controlsRef.value.transformGroup = transformGroup }
    })

    // A fresh instance on each change, so re-enabling can never resume a drag that a disabled instance left selected
    watch([camera, domElement, () => props.enabled], ([cam, element]) => {
      disposeControls()
      if (cam && element) {
        controlsRef.value = createControls(cam, element)
      }
    }, { immediate: true })

    onUnmounted(disposeControls)

    expose({ instance: controlsRef })
  },
  render() { return null },
})
