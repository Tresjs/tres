<script setup lang="ts">
import { reactive } from 'vue'
import type { LoadingManager, Texture } from 'three'
import { useTexture, type UseTextureReturn } from './index'

interface Props {
  /**
   * Path or array of paths to texture(s)
   */
  path: string | string[]
  /**
   * Optional THREE.js LoadingManager
   */
  manager?: LoadingManager
}

interface Emits {
  (e: 'loaded'): void
  (e: 'error', error: Error): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Type guard to handle the union type
const textureData = Array.isArray(props.path)
  ? reactive<UseTextureReturn<Texture[]>>(useTexture(props.path, props.manager))
  : reactive<UseTextureReturn<Texture>>(useTexture(props.path, props.manager))

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
