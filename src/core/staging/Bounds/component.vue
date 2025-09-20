<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import type { BoundsControlsProto, OnLookAtCallbackArg } from './Bounds'
import { Bounds } from './Bounds'
import { useLoop, useTres } from '@tresjs/core'
import { PerspectiveCamera } from 'three'
import { useDebounceFn } from '@vueuse/core'

export interface BoundsProps {
  /**
   * Duration of the `lookAt` animation in seconds, 1.0
   */
  duration?: number
  /**
   * Additional distance from the target when using `lookAt` with a `Box3` or `Object3D`, 0.2
   */
  offset?: number
  /**
   * Whether to re`lookAt` the last target when the screen is resized, false
   */
  useResize?: boolean
  /**
   * Whether to `lookAt` the `Bounds` object when the component is mounts, false
   */
  useMounted?: boolean
  /**
   * Whether to adjust the camera's `near` and `far` settings when using `lookAt`, false
   */
  clip?: boolean
  /**
   * Animation's easing function. `t` and the returned value should be in the interval `[0, 1]`, cubicEaseOut
   */
  easing?: (t: number) => number
}

const props = withDefaults(defineProps<BoundsProps>(), {
  duration: 1.0,
  offset: 0.2,
  useResize: false,
  useMounted: false,
  clip: false,
})

const emit = defineEmits<{
  (e: 'start', sizeProps: OnLookAtCallbackArg): void
  (e: 'cancel', sizeProps: OnLookAtCallbackArg): void
  (e: 'end', sizeProps: OnLookAtCallbackArg): void
}>()

const { camera, controls, sizes: size, invalidate } = useTres()
const defaultEasing = (t: number) => 1 - (1 - t) ** 3

const bounds = new Bounds(camera.value ?? new PerspectiveCamera())
bounds.easing = props.easing ?? defaultEasing
bounds.onStart = (arg: OnLookAtCallbackArg) => emit('start', arg)
bounds.onCancel = (arg: OnLookAtCallbackArg) => emit('cancel', arg)
bounds.onEnd = (arg: OnLookAtCallbackArg) => emit('end', arg)

const refresh = () => {
  bounds.offset = props.offset
  bounds.duration = props.duration
  bounds.clip = props.clip
  bounds.lookAt()
  invalidate()
}

useLoop().onBeforeRender(({ delta }) => {
  if (bounds.animate(delta)) {
    invalidate()
  }
})

watchEffect(() => {
  if (controls.value) { bounds.controls = controls.value as unknown as BoundsControlsProto }
})

const shallowCam = computed(() => camera.value?.uuid)
watch(shallowCam, () => {
  if (camera.value) { bounds.camera = camera.value }
}, { immediate: true, deep: false })

const refreshDebounce = useDebounceFn(refresh, 250, { maxWait: 2000 })

watch(() => [size.width.value, size.height.value], () => {
  if (props.useResize) { refreshDebounce() }
})

// NOTE: Tres core doesn't currently allow for most
// callback props to declaratively redefine methods.
// (Most method props will be called instead.)
// So we need to watch and update here.
watch(() => [props.easing], () => {
  bounds.easing = props.easing ?? defaultEasing
}, { immediate: true })

onMounted(() => { if (props.useMounted) { refreshDebounce() } })
onUnmounted(() => bounds.dispose())
defineExpose({ instance: bounds })
</script>

<template>
  <primitive
    :object="bounds"
    :duration="duration"
    :offset="offset"
  >
    <slot></slot>
  </primitive>
</template>
