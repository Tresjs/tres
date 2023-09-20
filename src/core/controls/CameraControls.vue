<script lang="ts" setup>
import CameraControls from 'camera-controls'
import { ref, watchEffect, onUnmounted, toRefs } from 'vue'
import type {
  PerspectiveCamera,
  OrthographicCamera,
  Object3D } from 'three'
import {
  Box3,
  MathUtils,
  Matrix4,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4,
} from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'

export interface CameraControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof CameraControlsProps
   */
  makeDefault?: boolean

  /**
   * The camera to control.
   *
   * @type {PerspectiveCamera | OrthographicCamera}
   * @memberof CameraControlsProps
   */
  camera?: PerspectiveCamera | OrthographicCamera

  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof CameraControlsProps
   */
  domElement?: HTMLElement

  /**
   * Minimum vertical angle in radians.
   * The angle has to be between `0` and `.maxPolarAngle` inclusive.
   *
   * @default 0
   * @type {number}
   * @memberof CameraControlsProps
   */
  minPolarAngle?: number

  /**
   * Maximum vertical angle in radians.
   * The angle has to be between `.maxPolarAngle` and `Math.PI` inclusive.
   *
   * @default Math.PI
   * @type {number}
   * @memberof CameraControlsProps
   */
  maxPolarAngle?: number

  /**
   * Minimum horizontal angle in radians.
   * The angle has to be less than `.maxAzimuthAngle`.
   *
   * @default -Infinity
   * @type {number}
   * @memberof CameraControlsProps
   */
  minAzimuthAngle?: number

  /**
   * Maximum horizontal angle in radians.
   * The angle has to be greater than `.minAzimuthAngle`.
   *
   * @default Infinity
   * @type {number}
   * @memberof CameraControlsProps
   */
  maxAzimuthAngle?: number

  /**
   * Current disatnce.
   *
   * @type {number}
   * @memberof CameraControlsProps
   */
  distance?: number

  /**
   * Minimum distance for dolly. The value must be higher than `0`.
   * PerspectiveCamera only.
   *
   * @default Number.EPSILON
   * @type {number}
   * @memberof CameraControlsProps
   */
  minDistance?: number

  /**
   * Maximum distance for dolly. The value must be higher than `minDistance`.
   * PerspectiveCamera only.
   *
   * @default Infinity
   * @type {number}
   * @memberof CameraControlsProps
   */
  maxDistance?: number

  /**
   * `true` to enable Infinity Dolly for wheel and pinch. Use this with `minDistance` and `maxDistance`.
   * If the Dolly distance is less (or over) than the `minDistance` (or `maxDistance`),
   * `infinityDolly` will keep the distance and pushes the target position instead.
   *
   * @default false
   * @type {boolean}
   * @memberof CameraControlsProps
   */
  infinityDolly?: boolean

  /**
   * Minimum camera zoom.
   *
   * @default 0.01
   * @type {number}
   * @memberof CameraControlsProps
   */
  minZoom?: number

  /**
   * Maximum camera zoom.
   *
   * @default Infinity
   * @type {number}
   * @memberof CameraControlsProps
   */
  maxZoom?: number

  /**
   * Approximate time in seconds to reach the target. A smaller value will reach the target faster.
   *
   * @default 0.25
   * @type {number}
   * @memberof CameraControlsProps
   */
  smoothTime?: number

  /**
   * The smoothTime while dragging.
   *
   * @default 0.125
   * @type {number}
   * @memberof CameraControlsProps
   */
  draggingSmoothTime?: number

  /**
   * Max transition speed in unit-per-seconds.
   *
   * @default Infinity
   * @type {number}
   * @memberof CameraControlsProps
   */
  maxSpeed?: number

  /**
   * Speed of azimuth (horizontal) rotation.
   *
   * @default 1.0
   * @type {number}
   * @memberof CameraControlsProps
   */
  azimuthRotateSpeed?: number

  /**
   * Speed of polar (vertical) rotation.
   *
   * @default 1.0
   * @type {number}
   * @memberof CameraControlsProps
   */
  polarRotateSpeed?: number

  /**
   * Speed of mouse-wheel dollying.
   *
   * @default 1.0
   * @type {number}
   * @memberof CameraControlsProps
   */
  dollySpeed?: number

  /**
   * `true` to invert direction when dollying or zooming via drag.
   *
   * @default false
   * @type {boolean}
   * @memberof CameraControlsProps
   */
  dollyDragInverted?: boolean

  /**
   * Speed of drag for truck and pedestal.
   *
   * @default 2.0
   * @type {number}
   * @memberof CameraControlsProps
   */
  truckSpeed?: number

  /**
   * `true` to enable Dolly-in to the mouse cursor coords.
   *
   * @default false
   * @type {boolean}
   * @memberof CameraControlsProps
   */
  dollyToCursor?: boolean

  /**
   * @default false
   * @type {boolean}
   * @memberof CameraControlsProps
   */
  dragToOffset?: boolean

  /**
   * The same as `.screenSpacePanning` in three.js's OrbitControls.
   *
   * @default false
   * @type {boolean}
   * @memberof CameraControlsProps
   */
  verticalDragToForward?: boolean

  /**
   * Friction ratio of the boundary.
   *
   * @default 0.0
   * @type {number}
   * @memberof CameraControlsProps
   */
  boundaryFriction?: number

  /**
   * Controls how soon the `rest` event fires as the camera slows.
   *
   * @default 0.01
   * @type {number}
   * @memberof CameraControlsProps
   */
  restThreshold?: number

  /**
   * An array of Meshes to collide with the camera.
   * Be aware colliderMeshes may decrease performance.
   * The collision test uses 4 raycasters from the camera since the near plane has 4 corners.
   *
   * @default []
   * @type {Object3D[]}
   * @memberof CameraControlsProps
   */
  colliderMeshes?: Object3D[]

  /**
   * User's mouse input config.
   *
   * @default See description
   * @memberof CameraControlsProps
   */
  mouseButtons?: {
    left?: number
    right?: number
    wheel?: number
    middle?: number
  }

  /**
   * User's touch input config.
   *
   * @default See description
   * @memberof CameraControlsProps
   */
  touches?: {
    one?: number
    two?: number
    three?: number
  }
}

const props = withDefaults(defineProps<CameraControlsProps>(), {
  makeDefault: false,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
  minAzimuthAngle: -Infinity,
  maxAzimuthAngle: Infinity,
  distance: () => useTresContext().camera.value!.position.z,
  minDistance: Number.EPSILON,
  maxDistance: Infinity,
  infinityDolly: false,
  minZoom: 0.01,
  maxZoom: Infinity,
  smoothTime: 0.25,
  draggingSmoothTime: 0.125,
  maxSpeed: Infinity,
  azimuthRotateSpeed: 1.0,
  polarRotateSpeed: 1.0,
  dollySpeed: 1.0,
  dollyDragInverted: false,
  truckSpeed: 2.0,
  dollyToCursor: false,
  dragToOffset: false,
  verticalDragToForward: false,
  boundaryFriction: 0.0,
  restThreshold: 0.01,
  colliderMeshes: () => [],
  // FIXME: set default values for mouseButtons and touches
  // mouseButtons: {},
  // touches: {}
})

const emit = defineEmits(['change', 'start', 'end'])

const {
  makeDefault,
  minPolarAngle,
  maxPolarAngle,
  minAzimuthAngle,
  maxAzimuthAngle,
  distance,
  minDistance,
  maxDistance,
  infinityDolly,
  minZoom,
  maxZoom,
  smoothTime,
  draggingSmoothTime,
  maxSpeed,
  azimuthRotateSpeed,
  polarRotateSpeed,
  dollySpeed,
  dollyDragInverted,
  truckSpeed,
  dollyToCursor,
  dragToOffset,
  verticalDragToForward,
  boundaryFriction,
  restThreshold,
  colliderMeshes,
} = toRefs(props)

// allow for tree shaking, only importing required classes
const subsetOfTHREE = {
  Box3,
  MathUtils: {
    clamp: MathUtils.clamp,
  },
  Matrix4,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4,
}
CameraControls.install({ THREE: subsetOfTHREE })

const { camera: activeCamera, renderer, extend, controls } = useTresContext()

const controlsRef = ref<CameraControls | null>(null)
extend({ CameraControls })

watchEffect(() => {
  addEventListeners()
  if (controlsRef.value && makeDefault.value) {
    controls.value = controlsRef.value
  }
  else {
    controls.value = null
  }
})

function addEventListeners() {
  useEventListener(controlsRef.value as any, 'update', () => emit('change', controlsRef.value))
  useEventListener(controlsRef.value as any, 'controlend', () => emit('end', controlsRef.value))
  useEventListener(controlsRef.value as any, 'controlstart', () => emit('start', controlsRef.value))
}

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (controlsRef.value?.enabled) controlsRef.value?.update(delta)
})

onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.disconnect()
  }
})

defineExpose({
  value: controlsRef,
})
</script>

<template>
  <TresCameraControls
    v-if="(camera || activeCamera) && (domElement || renderer)"
    ref="controlsRef"
    :min-polar-angle="minPolarAngle"
    :max-polar-angle="maxPolarAngle"
    :min-azimuth-angle="minAzimuthAngle"
    :max-azimuth-angle="maxAzimuthAngle"
    :distance="distance"
    :min-distance="minDistance"
    :max-distance="maxDistance"
    :infinity-dolly="infinityDolly"
    :min-zoom="minZoom"
    :max-zoom="maxZoom"
    :smooth-time="smoothTime"
    :dragging-smooth-time="draggingSmoothTime"
    :max-speed="maxSpeed"
    :azimuth-rotate-speed="azimuthRotateSpeed"
    :polar-rotate-speed="polarRotateSpeed"
    :dolly-speed="dollySpeed"
    :dolly-drag-inverted="dollyDragInverted"
    :truck-speed="truckSpeed"
    :dolly-to-cursor="dollyToCursor"
    :drag-to-offset="dragToOffset"
    :vertical-drag-to-forward="verticalDragToForward"
    :boundary-friction="boundaryFriction"
    :rest-threshold="restThreshold"
    :collider-meshes="colliderMeshes"
    :args="[camera || activeCamera, domElement || renderer.domElement]"
  />
</template>
