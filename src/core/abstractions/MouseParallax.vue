<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { useElementSize, useMouse, useWindowSize } from '@vueuse/core'
import { computed, ref, shallowRef, toRefs, watch } from 'vue'
import type { UseMouseOptions } from '@vueuse/core'
import type { Group, Object3D } from 'three'

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
   * @type {number | [number, number]}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   */
  factor?: number | [number, number]
  /**
   * The factor to smooth the mouse movement by.
   * @type {number | [number, number]}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   */
  ease?: number | [number, number]
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

const cameraGroupRef = shallowRef<Group>()
const _factor = ref()
const _ease = ref()

watch(
  [factor, ease],
  () => {
    _factor.value = Array.isArray(factor.value) ? factor.value : [factor.value, factor.value]
    _ease.value = Array.isArray(ease.value) ? ease.value : [ease.value, ease.value]
  },
  { immediate: true },
)

const cursorX = computed(() => (x.value / width.value - 0.5) * _factor.value[0])
const cursorY = computed(() => -(y.value / height.value - 0.5) * _factor.value[1])

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, invalidate }) => {
  if (
    disabled.value
    || !cameraGroupRef.value
    || Number.isNaN(cursorX.value)
    || Number.isNaN(cursorY.value)
  ) {
    return
  }
  cameraGroupRef.value.position.x
    += (cursorX.value - cameraGroupRef.value.position.x) * _ease.value[0] * delta
  cameraGroupRef.value.position.y
    += (cursorY.value - cameraGroupRef.value.position.y) * _ease.value[1] * delta

  invalidate()
})

watch(
  () => cameraGroupRef.value,
  value => value?.add(camera.value as Object3D),
)
</script>

<template>
  <TresGroup ref="cameraGroupRef" />
</template>
