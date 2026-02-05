<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { SimplexNoise } from 'three-stdlib'
import { onUnmounted, shallowRef, toRefs, watch } from 'vue'

/**
 * Props for CameraShake
 */
export interface CameraShakeProps {
  /**
   * The intensity of the shake.
   * @default 1
   * @type {number}
   */
  intensity?: number
  /**
   * If true, the intensity decays over time.
   * @default false
   * @type {boolean}
   */
  decay?: boolean
  /**
   * How fast the intensity decays when `decay` is true.
   * @default 0.65
   * @type {number}
   */
  decayRate?: number
  /**
   * Maximum yaw angle in radians.
   * @default 0.01
   * @type {number}
   */
  maxYaw?: number
  /**
   * Maximum pitch angle in radians.
   * @default 0.01
   * @type {number}
   */
  maxPitch?: number
  /**
   * Maximum roll angle in radians.
   * @default 0.01
   * @type {number}
   */
  maxRoll?: number
  /**
   * Frequency of yaw oscillation.
   * @default 0.1
   * @type {number}
   */
  yawFrequency?: number
  /**
   * Frequency of pitch oscillation.
   * @default 0.1
   * @type {number}
   */
  pitchFrequency?: number
  /**
   * Frequency of roll oscillation.
   * @default 0.1
   * @type {number}
   */
  rollFrequency?: number
}

const props = withDefaults(defineProps<CameraShakeProps>(), {
  intensity: 1,
  decay: false,
  decayRate: 0.65,
  maxYaw: 0.01,
  maxPitch: 0.01,
  maxRoll: 0.01,
  yawFrequency: 0.1,
  pitchFrequency: 0.1,
  rollFrequency: 0.1,
})

const {
  intensity,
  decay,
  decayRate,
  maxYaw,
  maxPitch,
  maxRoll,
  yawFrequency,
  pitchFrequency,
  rollFrequency,
} = toRefs(props)

const { camera, controls } = useTresContext()

let cleanUpFn: ReturnType<typeof useEventListener> | null = null

const currentIntensity = shallowRef(props.intensity)
const initialRotation = shallowRef(camera.activeCamera.value?.rotation.clone())

const yawNoise = new SimplexNoise()
const pitchNoise = new SimplexNoise()
const rollNoise = new SimplexNoise()

function constrainIntensity() {
  if (currentIntensity.value < 0) { currentIntensity.value = 0 }
  if (currentIntensity.value > 1) { currentIntensity.value = 1 }
}

watch(intensity, (newVal) => {
  currentIntensity.value = newVal
  constrainIntensity()
})

function updateInitialRotation() {
  if (camera.activeCamera.value) {
    initialRotation.value = camera.activeCamera.value.rotation.clone()
  }
}

watch([camera.activeCamera, controls], () => {
  cleanUpFn?.()

  if (controls.value) {
    cleanUpFn = useEventListener(controls.value as any, 'change', updateInitialRotation)
  }

  updateInitialRotation()
})

function setIntensity(v: number) {
  currentIntensity.value = Math.min(1, Math.max(0, v))
}

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed, delta }) => {
  const cam = camera.activeCamera.value
  if (!cam) { return }

  if (!decay.value && currentIntensity.value < intensity.value) {
    setIntensity(currentIntensity.value + decayRate.value * delta)
  }

  const shakeFactor = currentIntensity.value * currentIntensity.value

  const yaw = maxYaw.value * shakeFactor * yawNoise.noise(elapsed * yawFrequency.value, 1)
  const pitch = maxPitch.value * shakeFactor * pitchNoise.noise(elapsed * pitchFrequency.value, 1)
  const roll = maxRoll.value * shakeFactor * rollNoise.noise(elapsed * rollFrequency.value, 1)

  cam.rotation.set(
    initialRotation.value.x + pitch,
    initialRotation.value.y + yaw,
    initialRotation.value.z + roll,
  )

  if (decay.value) {
    setIntensity(currentIntensity.value - decayRate.value * delta)
  }
})

onUnmounted(() => {
  cleanUpFn?.()
})
</script>

<template>
  <slot></slot>
</template>
