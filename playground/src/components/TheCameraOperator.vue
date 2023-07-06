<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core';

const { setCameraActive } = useTresContext()

const props = defineProps<{
  activeCameraUuid?: string
}>()

watchEffect(() => {
  if (props.activeCameraUuid)
    setCameraActive(props.activeCameraUuid)
})

</script>
