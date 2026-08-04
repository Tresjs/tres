import { defineComponent, onUnmounted, shallowRef, watch } from 'vue'
import type { Camera, Object3D, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import { DragControls as ThreeDragControls } from 'three-stdlib'

export interface DragControlsProps {
  objects: Object3D[]
  camera?: Camera
  lock?: 'x' | 'y' | 'z' | 'none'
  enabled?: boolean
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

export const DragControls = defineComponent<DragControlsProps>({
  name: 'DragControls',
  props: [
    'objects',
    'camera',
    'enabled',
    'lock',
    'enabled',
    'dragLimits',
    'domElement',
  ] as unknown as undefined,
  setup(props, { expose, emit }) {
    const { camera: activeCamera, renderer, controls: defaultControls } = useTres()

    const controlsRef = shallowRef<ThreeDragControls | null>(null)
    const initialPositions = new WeakMap<Object3D, Vector3>()

    watch(
      () => props.objects,
      (objects) => {
        const validObjects = (objects ?? []).filter(Boolean)
        if (!validObjects.length) { return }

        if (controlsRef.value) {
          controlsRef.value.dispose()
        }

        controlsRef.value = new ThreeDragControls(
          validObjects,
          props.camera || activeCamera.value!,
          props.domElement || renderer.domElement,
        )

        if (props.enabled !== undefined) {
          controlsRef.value.enabled = props.enabled
        }

        addEventListeners(controlsRef.value)
      },
      { immediate: true },
    )

    function addEventListeners(dragControls: ThreeDragControls) {
      dragControls.addEventListener('dragstart', (e) => {
        if (defaultControls.value) { defaultControls.value.enabled = false }
        initialPositions.set(e.object, e.object.position.clone())
        emit('dragstart', dragControls)
      })

      dragControls.addEventListener('drag', (e) => {
        const obj = e.object
        if (props.enabled === false) {
          const origin = initialPositions.get(obj)
          if (origin) {
            obj.position.set(origin.x, origin.y, origin.z)
          }
        }
        if (props.lock && props.lock !== 'none') {
          const origin = initialPositions.get(obj)
          if (origin) {
            if (props.lock === 'x') { obj.position.x = origin.x }
            else if (props.lock === 'y') { obj.position.y = origin.y }
            else if (props.lock === 'z') { obj.position.z = origin.z }
          }
        }
        if (props.dragLimits) {
          const [xLim, yLim, zLim] = props.dragLimits
          if (xLim) { obj.position.x = Math.max(Math.min(obj.position.x, xLim[1]), xLim[0]) }
          if (yLim) { obj.position.y = Math.max(Math.min(obj.position.y, yLim[1]), yLim[0]) }
          if (zLim) { obj.position.z = Math.max(Math.min(obj.position.z, zLim[1]), zLim[0]) }
        }
        emit('drag', dragControls)
      })

      dragControls.addEventListener('dragend', (e) => {
        initialPositions.delete(e.object)
        if (defaultControls.value) { defaultControls.value.enabled = true }
        emit('dragend', dragControls)
      })

      dragControls.addEventListener('hoveron', () => emit('hoveron', dragControls))
      dragControls.addEventListener('hoveroff', () => emit('hoveroff', dragControls))
    }

    onUnmounted(() => {
      if (controlsRef.value) {
        controlsRef.value.dispose()
      }
    })

    expose({ instance: controlsRef })
  },
  render() { return null },
})
