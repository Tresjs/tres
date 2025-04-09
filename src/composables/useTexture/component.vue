<script setup lang="ts" generic="T extends string | string[]">
import type { LoadingManager, Texture } from 'three'
import { useTexture } from './index'
import { computed, defineEmits, defineProps } from 'vue'
import { whenever } from '@vueuse/core'

const props = defineProps<{
  /**
   * Path or array of paths to texture(s)
    */
  path: T
  /**
   * Optional THREE.js LoadingManager
   */
  manager?: LoadingManager
}>()

const emit = defineEmits<{
  loaded: [texture: T extends string ? Texture : Texture[]]
  error: [error: T extends string ? unknown : unknown[]] // this is unknown because TextureLoader's error type is unknown
}>()

const state = useTexture(props.path, { manager: props.manager })

const isMultiple = (x: ReturnType<typeof useTexture<string, any>> | ReturnType<typeof useTexture<string[], any>>): x is ReturnType<typeof useTexture<string[], any>> => Array.isArray(x)

const errorOrErrors = computed(() =>
  (isMultiple(state) ? state.map(({ error }) => error.value) : state.error.value),
)
const hasError = computed(() =>
  isMultiple(state) ? state.some(({ error }) => error.value) : !!state.error.value,
)
whenever(hasError, () => {
  emit('error', errorOrErrors.value as unknown as T extends string ? unknown : unknown[])
})

const isReady = computed(() => {
  return isMultiple(state) ? state.every(({ isReady }) => isReady.value) : !!state.isReady
})
const dataOrDataArray = computed(() =>
  isMultiple(state) ? state.map(({ state }) => state.value) : state.state.value,
)
whenever(isReady, () => {
  emit('loaded', dataOrDataArray.value as unknown as T extends string ? Texture : Texture[])
})
</script>

<template>
  <slot v-bind="state"></slot>
</template>
