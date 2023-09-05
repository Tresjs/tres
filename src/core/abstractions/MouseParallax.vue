<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import type { Group } from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { useMouse, useWindowSize } from '@vueuse/core'

export interface MouseParallaxProps {
  /**
   * Whether to disable the mouse controls.
   * @type {boolean}
   * @default false
   * @memberof MouseParallaxProps
   *
   */
  disabled?: boolean
  /**
   * The factor to multiply the mouse movement by.
   * @type {number}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   **/
  factor?: number
  /**
   * The factor to multiply the mouse movement by.
   * @type {number}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   **/
  ease?: number
}

const props = withDefaults(defineProps<MouseParallaxProps>(), {
  disabled: false,
  factor: 2.5,
  ease: 0.1,
})

const { camera } = useTresContext()

const { disabled, factor, ease } = toRefs(props)

const { x, y } = useMouse()
const { width, height } = useWindowSize()

const cameraGroupRef = ref<Group>()

const cursorX = computed(() => (x.value / width.value - 0.5) * factor.value)
const cursorY = computed(() => -(y.value / height.value - 0.5) * factor.value)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (disabled.value || !cameraGroupRef.value) return
  cameraGroupRef.value.position.x += (cursorX.value - cameraGroupRef.value.position.x) * ease.value * delta
  cameraGroupRef.value.position.y += (cursorY.value - cameraGroupRef.value.position.y) * ease.value * delta
})

watch(
  () => cameraGroupRef.value,
  (value) => {
    value?.add(camera.value)
  },
)
</script>

<template>
  <TresGroup ref="cameraGroupRef" />
</template>
