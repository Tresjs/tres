<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import type { Group } from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { useElementSize, useMouse, useWindowSize } from '@vueuse/core'
import type { UseMouseOptions } from '@vueuse/core'

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
   */
  factor?: number
  /**
   * The factor to smooth the mouse movement by.
   * @type {number}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   */
  ease?: number
  /**
   * Whether to apply the parallax effect to the local canvas.
   * @type {boolean}
   * @default false
   * @memberof MouseParallaxProps
   *
   */
  local?: boolean
}

const props = withDefaults(defineProps<MouseParallaxProps>(), {
  disabled: false,
  factor: 2.5,
  ease: 0.1,
  local: false,
})

const { camera, renderer } = useTresContext()

const { disabled, factor, ease, local } = toRefs(props)

const mouseOptions: UseMouseOptions = {}

if (local.value) {
  mouseOptions.target = renderer.value.domElement
  mouseOptions.type = 'client'
}

const { x, y } = useMouse(mouseOptions)
const { width, height } = local.value
  ? useElementSize(renderer.value.domElement)
  : useWindowSize()

const cameraGroupRef = ref<Group>()

const cursorX = computed(() => (x.value / width.value - 0.5) * factor.value)
const cursorY = computed(() => -(y.value / height.value - 0.5) * factor.value)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (
    disabled.value
    || !cameraGroupRef.value
    || Number.isNaN(cursorX.value)
    || Number.isNaN(cursorY.value)
  ) {
    return
  }
  cameraGroupRef.value.position.x
    += (cursorX.value - cameraGroupRef.value.position.x) * ease.value * delta
  cameraGroupRef.value.position.y
    += (cursorY.value - cameraGroupRef.value.position.y) * ease.value * delta
})

watch(
  () => cameraGroupRef.value,
  value => value?.add(camera.value),
)
</script>

<template>
  <TresGroup ref="cameraGroupRef" />
</template>
