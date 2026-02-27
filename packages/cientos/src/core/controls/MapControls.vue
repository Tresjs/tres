<script lang="ts" setup>
import { useTres } from '@tresjs/core'
import { MapControls } from 'three-stdlib'
import { shallowRef } from 'vue'
import { MOUSE, TOUCH } from 'three'
import {
  ORBIT_LIKE_DEFAULTS,
  type OrbitLikeControlsEmits,
  type OrbitLikeControlsProps,
  useOrbitLikeControls,
} from './useOrbitLikeControls'

export type MapControlsProps = OrbitLikeControlsProps

export type MapControlsEmits = OrbitLikeControlsEmits<MapControls>

const props = withDefaults(defineProps<MapControlsProps>(), {
  ...ORBIT_LIKE_DEFAULTS,
  touches: () => ({ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }),
  mouseButtons: () => ({ LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE }),
  screenSpacePanning: false,
})

const emit = defineEmits<MapControlsEmits>()

const { camera: activeCamera, renderer, extend } = useTres()

const controlsRef = shallowRef<MapControls | null>(null)

extend({ MapControls })

useOrbitLikeControls(
  controlsRef,
  props,
  emit,
)

defineExpose({
  instance: controlsRef,
})
</script>

<template>
  <TresMapControls
    v-if="(camera || activeCamera) && (domElement || renderer.domElement)"
    ref="controlsRef"
    :args="[camera || activeCamera, domElement || renderer.domElement]"
    :target
    :auto-rotate
    :auto-rotate-speed
    :enable-damping
    :damping-factor
    :enable-pan
    :key-pan-speed
    :keys
    :max-azimuth-angle
    :min-azimuth-angle
    :max-polar-angle
    :min-polar-angle
    :min-distance
    :max-distance
    :min-zoom
    :max-zoom
    :touches
    :enable-zoom
    :zoom-speed
    :enable-rotate
    :rotate-speed
    :mouse-buttons
    :screen-space-panning
  />
</template>
