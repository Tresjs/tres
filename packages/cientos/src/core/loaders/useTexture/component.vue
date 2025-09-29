<script setup lang="ts">
import type { LoadingManager, Texture } from 'three'
import { useTexture } from '.'
import { whenever } from '@vueuse/core'

const props = defineProps<{
  /**
   * The path to the texture file.
   *
   * @type {string}
   * @required
   * @memberof TextureProps
   */
  path: string
  /**
   * Optional THREE.js LoadingManager
   */
  manager?: LoadingManager
}>()

const emit = defineEmits<{
  loaded: [result: Texture]
  error: [error: unknown]
}>()
// Use the useTexture composable to load the texture
const { state: texture, isLoading, error } = useTexture(props.path)

whenever(error, (err) => {
  if (err) { emit('error', err) }
})

whenever(texture, (value) => {
  if (value) { emit('loaded', value) }
})
</script>

<template>
  <slot
    :state="texture"
    :is-loading="isLoading"
    :error="error"
  ></slot>
</template>
