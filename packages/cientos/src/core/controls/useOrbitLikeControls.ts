import { useLoop, useTres } from '@tresjs/core'
import { whenever } from '@vueuse/core'
import { onUnmounted, type ShallowRef, watch } from 'vue'
import type { TresVector3 } from '@tresjs/core'
import type { Camera } from 'three'
import type { OrbitControls } from 'three-stdlib'

/** Shared props for OrbitControls and MapControls (three-stdlib OrbitControls API). */
export interface OrbitLikeControlsProps {
  /**
   * Whether to make this the default controls.
   * @default false
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.camera
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.domElement
   */
  domElement?: HTMLElement
  /**
   * The target to orbit around.
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.target
   */
  target?: TresVector3
  /**
   * Whether to enable damping (inertia)
   * @default false
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enableDamping
   */
  enableDamping?: boolean
  /**
   * The damping inertia used if `.enableDamping` is set to true
   * @default 0.05
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.dampingFactor
   */
  dampingFactor?: number
  /**
   * Set to true to automatically rotate around the target.
   * @default false
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.autoRotate
   */
  autoRotate?: boolean
  /**
   * How fast to rotate around the target if `.autoRotate` is true.
   * @default 2
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.autoRotateSpeed
   */
  autoRotateSpeed?: number
  /**
   * Whether to enable panning.
   * @default true
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enablePan
   */
  enablePan?: boolean
  /**
   * How fast to pan the camera when the keyboard is used. Default is 7.0 pixels per keypress.
   * @default 7.0
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.keyPanSpeed
   */
  keyPanSpeed?: number
  /**
   * This object contains references to the keycodes for controlling camera panning.
   * Default is the 4 arrow keys.
   * @default `{ LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }`
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.keys
   */
  keys?: Record<string, string>
  /**
   * How far you can orbit horizontally, upper limit.
   * If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ],
   * with ( max - min < 2 PI ). Default is Infinity.
   * @default Infinity
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxAzimuthAngle
   */
  maxAzimuthAngle?: number
  /**
   * How far you can orbit horizontally, lower limit.
   * If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ],
   * with ( max - min < 2 PI ). Default is - Infinity.
   * @default -Infinity
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minAzimuthAngle
   */
  minAzimuthAngle?: number
  /**
   * How far you can orbit vertically, upper limit.
   * Range is 0 to Math.PI radians, and default is Math.PI.
   * @default Math.PI
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxPolarAngle
   */
  maxPolarAngle?: number
  /**
   * How far you can orbit vertically, lower limit.
   * Range is 0 to Math.PI radians, and default is 0.
   * @default 0
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minPolarAngle
   */
  minPolarAngle?: number
  /**
   * The minimum distance of the camera to the target. Default is 0.
   * @default 0
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minDistance
   */
  minDistance?: number
  /**
   * The maximum distance of the camera to the target. Default is Infinity.
   * @default Infinity
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxDistance
   */
  maxDistance?: number
  /**
   * The minimum field of view angle, in radians. Default is 0.
   * @default 0
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minZoom
   */
  minZoom?: number
  /**
   * The maximum field of view angle, in radians. ( OrthographicCamera only ). Default is Infinity.
   * @default Infinity
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxZoom
   */
  maxZoom?: number
  /**
   * Touch action mapping.
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.touches
   */
  touches?: { ONE?: number, TWO?: number }
  /**
   * Whether to enable zooming.
   * @default true
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enableZoom
   */
  enableZoom?: boolean
  /**
   * How fast to zoom in and out. Default is 1.
   * @default 1
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.zoomSpeed
   */
  zoomSpeed?: number
  /**
   * Whether to enable rotating.
   * @default true
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enableRotate
   */
  enableRotate?: boolean
  /**
   * How fast to rotate around the target. Default is 1.
   * @default 1
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.rotateSpeed
   */
  rotateSpeed?: number
  /**
   * This object contains references to the mouse actions used by the controls.
   * LEFT: Rotate around the target; MIDDLE: Zoom the camera; RIGHT: Pan the camera.
   * @default OrbitControls: { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }
   *          MapControls: { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE }
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.mouseButtons
   */
  mouseButtons?: { LEFT?: number, MIDDLE?: number, RIGHT?: number }

  /**
   * Defines how the camera's position is translated when panning.
   * If true, the camera pans in screen space. Otherwise, the camera
   * pans in the plane orthogonal to the camera's up direction.
   * @default OrbitControls: true
   *          MapControls: false
   * @see https://threejs.org/docs/pages/OrbitControls.html#screenSpacePanning
   */
  screenSpacePanning?: boolean
}

/** Shared default values for orbit-like controls (excludes touches, mouseButtons, screenSpacePanning). */
export const ORBIT_LIKE_DEFAULTS = {
  makeDefault: false,
  autoRotate: false,
  autoRotateSpeed: 2,
  enableDamping: true,
  dampingFactor: 0.05,
  enablePan: true,
  keyPanSpeed: 7,
  maxAzimuthAngle: Number.POSITIVE_INFINITY,
  minAzimuthAngle: Number.NEGATIVE_INFINITY,
  maxPolarAngle: Math.PI,
  minPolarAngle: 0,
  minDistance: 0,
  maxDistance: Number.POSITIVE_INFINITY,
  minZoom: 0,
  maxZoom: Number.POSITIVE_INFINITY,
  enableZoom: true,
  zoomSpeed: 1,
  enableRotate: true,
  rotateSpeed: 1,
  target: () => [0, 0, 0] as [number, number, number],
} as const

export interface OrbitLikeControlsEmits<T extends OrbitControls = OrbitControls> {
  change: [controls: T]
  start: [controls: T]
  end: [controls: T]
}

export type OrbitLikeControlsEmitFn<T extends OrbitControls> = <E extends keyof OrbitLikeControlsEmits<T>>(
  event: E,
  ...args: OrbitLikeControlsEmits<T>[E]
) => void

export function useOrbitLikeControls<T extends OrbitControls>(
  controlsRef: ShallowRef<T | null>,
  props: OrbitLikeControlsProps,
  emit: OrbitLikeControlsEmitFn<T>,
) {
  const { controls, invalidate } = useTres()

  watch(props, () => {
    invalidate()
  })

  whenever(controlsRef, (value) => {
    value.addEventListener('change', () => {
      invalidate()
      if (value) {
        emit('change', controlsRef.value as T)
      }
    })
    value.addEventListener('start', () => {
      controlsRef.value && emit('start', controlsRef.value as T)
    })
    value.addEventListener('end', () => {
      controlsRef.value && emit('end', controlsRef.value as T)
    })

    if (props.makeDefault) {
      controls.value = value
    }
    else {
      controls.value = null
    }
  }, { once: true })

  const { onBeforeRender } = useLoop()
  onBeforeRender(() => {
    if (controlsRef.value && (props.enableDamping || props.autoRotate)) {
      controlsRef.value.update()
    }
  })

  onUnmounted(() => {
    if (controlsRef.value) {
      controlsRef.value.dispose()
    }
  })
}
