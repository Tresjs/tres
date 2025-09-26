<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const props = defineProps<{
  activeCameraUuid?: string
}>()

const { camera } = useTresContext()

watchEffect(() => {
  if (props.activeCameraUuid) { camera.setActiveCamera(props.activeCameraUuid) }
})
</script>

<template>
  <slot></slot>
</template>
