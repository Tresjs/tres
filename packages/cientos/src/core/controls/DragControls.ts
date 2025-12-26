import { defineComponent, onUnmounted, shallowRef, watch } from 'vue'
import type { Camera, Object3D, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { DragControls as TypesDragControls } from 'three-stdlib'

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
    const { camera: activeCamera, renderer } = useTres()

    const controlsRef = shallowRef<TypesDragControls | null>(null)
    const initialPositions = new WeakMap<Object3D, Vector3>()

    watch(
      () => props.objects,
      () => {
        controlsRef.value = new TypesDragControls(
          props.objects,
          props.camera || activeCamera.value!,
          props.domElement || renderer.domElement,
        )
        // Apply initial enabled state if provided
        if (props.enabled !== undefined && controlsRef.value) {
          (controlsRef.value as any).enabled = props.enabled
        }
        addEventListeners()
      },
      { immediate: true },
    )

    function addEventListeners() {
      useEventListener(controlsRef.value as any, 'dragstart', (e: any) => {
        const obj = e?.object as Object3D | undefined
        if (obj) {
          initialPositions.set(obj, obj.position.clone())
        }
        emit('dragstart', controlsRef.value)
      })

      useEventListener(controlsRef.value as any, 'drag', (e: any) => {
        const obj = e?.object as Object3D | undefined
        if (props.enabled === false && obj) {
          const origin = initialPositions.get(obj)
          if (origin && obj) {
            obj.position.set(origin.x, origin.y, origin.z)
          }
        }
        if (obj && props.lock && props.lock !== 'none') {
          const origin = initialPositions.get(obj)
          if (origin) {
            if (props.lock === 'x') {
              obj.position.x = origin.x
            }
            else if (props.lock === 'y') {
              obj.position.y = origin.y
            }
            else if (props.lock === 'z') {
              obj.position.z = origin.z
            }
          }
        }

        if (obj && props.dragLimits) {
          const [xLim, yLim, zLim] = props.dragLimits
          if (xLim) {
            obj.position.x = Math.max(Math.min(obj.position.x, xLim[1]), xLim[0])
          }
          if (yLim) {
            obj.position.y = Math.max(Math.min(obj.position.y, yLim[1]), yLim[0])
          }
          if (zLim) {
            obj.position.z = Math.max(Math.min(obj.position.z, zLim[1]), zLim[0])
          }
        }
        emit('drag', controlsRef.value)
      })

      useEventListener(controlsRef.value as any, 'dragend', (e: any) => {
        const obj = e?.object as Object3D | undefined
        if (obj) {
          initialPositions.delete(obj)
        }
        emit('dragend', controlsRef.value)
      })

      useEventListener(controlsRef.value as any, 'hoveron', () =>
        emit('hoveron', controlsRef.value))
      useEventListener(controlsRef.value as any, 'hoveroff', () =>
        emit('hoveroff', controlsRef.value))
    }

    onUnmounted(() => {
      if (controlsRef.value) {
        controlsRef.value.dispose()
      }
    })

    expose({ instance: controlsRef })
  },
})
