<script setup lang="ts">
import { useTres } from '@tresjs/core/webgpu'

const emit = defineEmits<{ backend: [name: string] }>()

// `renderer` is typed as WebGPURenderer here, no cast needed.
const { renderer } = useTres()

// Children mount after the renderer `init()`, so the backend is final (WebGPU or the WebGL2 fallback).
emit('backend', 'isWebGPUBackend' in renderer.backend ? 'WebGPU' : 'WebGL2 (fallback)')
</script>

<template></template>
