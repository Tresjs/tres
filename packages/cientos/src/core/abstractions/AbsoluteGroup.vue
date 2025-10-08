<script lang="ts" setup>
import { PerspectiveCamera } from 'three'
import { useTresContext } from '@tresjs/core'
import { computed } from 'vue'

const props = defineProps<{
  distance: number
} & (
  // top OR bottom
  {
    top?: number
    bottom?: never
  } | {
    top?: never
    bottom?: number
  }
) & (
  // left OR right
  {
    left?: number
    right?: never
  } | {
    left?: never
    right?: number
  }
)>()

const { camera, sizes } = useTresContext()

const position = computed<[number, number, number]>(() => {
  const fov = camera.activeCamera.value instanceof PerspectiveCamera
    ? camera.activeCamera.value.fov
    : 50

  const height = 2 * Math.tan(fov * Math.PI / 180 / 2) * props.distance
  const width = height * sizes.aspectRatio.value

  // Default to 50% 50% (center of the screen)
  const left = props.left ?? 1 - (props.right ?? 0.5)
  const top = props.top ?? 1 - (props.bottom ?? 0.5)

  // Invert y so it behaves like
  return [width * (left - 0.5), height * (1 - top - 0.5), 0]
})
</script>

<template>
  <TresGroup :position="position">
    <slot></slot>
  </TresGroup>
</template>
