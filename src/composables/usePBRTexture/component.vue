<script setup lang="ts">
import { reactive } from 'vue'
import type { LoadingManager } from 'three'
import { type PBRTexturePaths, type PBRTextureResult, usePBRTexture } from '.'

const props = defineProps<{
  /**
   * PBR texture options containing paths to textures
   */
  paths: PBRTexturePaths
  /**
   * Optional THREE.js LoadingManager
   */
  manager?: LoadingManager
}>()

const emit = defineEmits<{
  (e: 'loaded'): void
  (e: 'error', error: Error): void
}>()

const textureData = reactive<PBRTextureResult>(usePBRTexture(props.paths, props.manager))

// Handle loading state
textureData.promise
  .then(() => emit('loaded'))
  .catch(err => emit('error', err))
</script>

<template>
  <slot
    :data="textureData.data"
    :is-loading="textureData.isLoading"
    :error="textureData.error"
  ></slot>
</template>
