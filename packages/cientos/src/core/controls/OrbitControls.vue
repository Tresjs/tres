<script lang="ts" setup>
import { useTres } from '@tresjs/core'
import { MOUSE, TOUCH } from 'three'
import { OrbitControls } from 'three-stdlib'
import { shallowRef } from 'vue'
import {
  ORBIT_LIKE_DEFAULTS,
  type OrbitLikeControlsEmits,
  type OrbitLikeControlsProps,
  useOrbitLikeControls,
} from './useOrbitLikeControls'

export interface OrbitControlsProps extends OrbitLikeControlsProps {
  /**
   * This object contains references to the mouse actions used by the controls.
   * LEFT: Rotate around the target; MIDDLE: Zoom; RIGHT: Pan.
   *
   * @default { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.mouseButtons
   */
  mouseButtons?: {
    LEFT?: number
    MIDDLE?: number
    RIGHT?: number
  }
}

export type OrbitControlsEmits = OrbitLikeControlsEmits<OrbitControls>

const props = withDefaults(defineProps<OrbitControlsProps>(), {
  ...ORBIT_LIKE_DEFAULTS,
  touches: () => ({ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }),
  mouseButtons: () => ({ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }),
  screenSpacePanning: true,
})

const emit = defineEmits<OrbitControlsEmits>()

const { camera: activeCamera, renderer, extend } = useTres()

const controlsRef = shallowRef<OrbitControls | null>(null)

extend({ OrbitControls })

useOrbitLikeControls(
  controlsRef,
  props,
  (e, c) => (emit as (evt: 'change' | 'start' | 'end', controls: OrbitControls) => void)(e, c),
)

defineExpose({ instance: controlsRef })
</script>

<template>
  <TresOrbitControls
    v-if="(camera || activeCamera) && (domElement || renderer.domElement)"
    ref="controlsRef"
    :key="(camera || activeCamera)?.uuid"
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
