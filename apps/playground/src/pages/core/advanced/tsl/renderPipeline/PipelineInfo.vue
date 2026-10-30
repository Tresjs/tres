<script setup lang="ts">
import { useRenderPipeline } from '@tresjs/core/webgpu'

const emit = defineEmits<{ info: [text: string] }>()

// Read-only: it never creates or keeps a pipeline alive.
const { isReady, passes } = useRenderPipeline()

watchEffect(() => {
  emit('info', isReady.value ? `pipeline: on, scene pass camera: ${passes.scenePass?.camera.type ?? '-'}` : 'pipeline: off')
})
</script>

<template>
  <slot></slot>
</template>
