<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const props = defineProps<{
  activeCameraUuid?: string
}>()

const { setCameraActive } = useTresContext()

watchEffect(() => {
  if (props.activeCameraUuid) { setCameraActive(props.activeCameraUuid) }
})
</script>

<template>
  <slot></slot>
</template>
