<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { logWarning, useLoop, useTresContext } from '@tresjs/core'
import { OrthographicCamera, PerspectiveCamera } from 'three'

export interface ScreenSpaceProps {
  depth?: number
  top?: number
  bottom?: number
  left?: number
  right?: number
}

const props = withDefaults(defineProps<ScreenSpaceProps>(), {
  depth: -1,
})

const outerRef = shallowRef()
const { camera, sizes } = useTresContext()

const zoom = ref(1)
useLoop().onBeforeRender(({ camera }) => {
  if (!outerRef.value || !camera.value) {
    return
  }

  outerRef.value.quaternion.copy(camera.value.quaternion)
  outerRef.value.position.copy(camera.value.position)

  // Since `camera` is a shallow ref, we need to track zoom value on renders for `viewPlaneDimensions`
  if (camera.value instanceof PerspectiveCamera || camera.value instanceof OrthographicCamera) {
    zoom.value = camera.value.zoom
  }
})

const viewPlaneDimensions = computed(() => {
  let height: number = 0
  let width: number = 0

  const activeCamera = camera.activeCamera.value
  if (activeCamera instanceof PerspectiveCamera) {
    const fov = activeCamera.fov
    height = (2 * Math.tan(fov * Math.PI / 180 / 2) * props.depth) / zoom.value
    width = height * sizes.aspectRatio.value
  }
  else if (activeCamera instanceof OrthographicCamera) {
    height = (activeCamera.top - activeCamera.bottom) / zoom.value
    width = (activeCamera.right - activeCamera.left) / zoom.value
  }
  else if (activeCamera) {
    logWarning(`ScreenSpace: Unhandled active camera type, only PerspectiveCamera and OrthographicCamera are supported when using \`top\`, \`bottom\`, \`left\`, and \`right\` props`, activeCamera)
  }

  return { height, width }
})

const innerPosition = computed<[number, number, number]>(() => {
  // Default to center if no positioning specified
  const leftPos = props.left ?? (props.right !== undefined ? 1 - props.right : 0.5)
  const topPos = props.top ?? (props.bottom !== undefined ? 1 - props.bottom : 0.5)

  const x = viewPlaneDimensions.value.width * (leftPos - 0.5)
  const y = viewPlaneDimensions.value.height * (1 - topPos - 0.5) // Invert y so it behaves like CSS
  const z = -props.depth

  return [x, y, z]
})

defineExpose({ instance: outerRef })
</script>

<template>
  <TresGroup ref="outerRef">
    <TresGroup :position="innerPosition">
      <slot></slot>
    </TresGroup>
  </TresGroup>
</template>
