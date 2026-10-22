import { computed, defineComponent, onUnmounted, shallowRef, watch } from 'vue'
import type { PropType } from 'vue'
import type { Camera, Object3D, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import type { TresControl } from '@tresjs/core'
import { DragControls as ThreeDragControls } from 'three-stdlib'

/** The three-stdlib `DragControls` instance that the events send and `instance` exposes. */
export type DragControlsInstance = ThreeDragControls

export interface DragControlsEmits {
  dragstart: [controls: DragControlsInstance]
  drag: [controls: DragControlsInstance]
  dragend: [controls: DragControlsInstance]
  hoveron: [controls: DragControlsInstance]
  hoveroff: [controls: DragControlsInstance]
}

export interface DragControlsProps {
  objects: Object3D[]
  camera?: Camera
  lock?: 'x' | 'y' | 'z' | 'none'
  enabled?: boolean
  /**
   * Drags the first entry of `objects` as a whole when any of its descendants is hit,
   * instead of the hit mesh. Use it with a single `Group` or a loaded model.
   */
  transformGroup?: boolean
  /**
     * Limits for dragging along each axis.
     * Each limit is a tuple of [min, max] values.
     *
     * @type {[[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]}
     * @memberof DragControlsProps
     */
  dragLimits?: [
        [number, number] | undefined,
        [number, number] | undefined,
        [number, number] | undefined,
  ]
  /**
     * The dom element to listen to.
     *
     * @type {HTMLElement}
     * @memberof DragControlsProps
     * @see https://threejs.org/docs/#DragControls
     */
  domElement?: HTMLElement
}

const isDragControls = (controls: DragControlsInstance) => controls instanceof ThreeDragControls

export const DragControls = defineComponent({
  name: 'DragControls',
  props: {
    objects: { type: Array as PropType<DragControlsProps['objects']>, required: true },
    camera: Object as PropType<DragControlsProps['camera']>,
    lock: { type: String as PropType<NonNullable<DragControlsProps['lock']>>, default: 'none' },
    enabled: { type: Boolean, default: true },
    transformGroup: { type: Boolean, default: false },
    dragLimits: Array as PropType<DragControlsProps['dragLimits']>,
    domElement: Object as PropType<DragControlsProps['domElement']>,
  },
  emits: {
    dragstart: isDragControls,
    drag: isDragControls,
    dragend: isDragControls,
    hoveron: isDragControls,
    hoveroff: isDragControls,
  },
  setup(props, { expose, emit }) {
    const { camera: activeCamera, renderer, controls: defaultControls, invalidate } = useTres()

    const controlsRef = shallowRef<ThreeDragControls | null>(null)
    // Shared with the three-stdlib instance and refilled in place, so a new `objects` array does not rebuild the controls
    const draggableObjects: Object3D[] = []
    const initialPositions = new WeakMap<Object3D, Vector3>()
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

    const constrainDraggedObject = (obj: Object3D) => {
      const origin = initialPositions.get(obj)
      if (origin && props.lock !== 'none') {
        obj.position[props.lock] = origin[props.lock]
      }
      if (props.dragLimits) {
        const [xLim, yLim, zLim] = props.dragLimits
        if (xLim) { obj.position.x = Math.max(Math.min(obj.position.x, xLim[1]), xLim[0]) }
        if (yLim) { obj.position.y = Math.max(Math.min(obj.position.y, yLim[1]), yLim[0]) }
        if (zLim) { obj.position.z = Math.max(Math.min(obj.position.z, zLim[1]), zLim[0]) }
      }
    }

    const addEventListeners = (dragControls: ThreeDragControls) => {
      dragControls.addEventListener('dragstart', ({ object }) => {
        pauseDefaultControls()
        initialPositions.set(object, object.position.clone())
        emit('dragstart', dragControls)
      })

      dragControls.addEventListener('drag', ({ object }) => {
        constrainDraggedObject(object)
        invalidate()
        emit('drag', dragControls)
      })

      dragControls.addEventListener('dragend', ({ object }) => {
        initialPositions.delete(object)
        resumeDefaultControls()
        emit('dragend', dragControls)
      })

      dragControls.addEventListener('hoveron', () => emit('hoveron', dragControls))
      dragControls.addEventListener('hoveroff', () => emit('hoveroff', dragControls))
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
      controlsRef.value?.dispose()
      controlsRef.value = null
      // A disposed instance never fires `dragend`, so hand the default controls back here
      resumeDefaultControls()
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
