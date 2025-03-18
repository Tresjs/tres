<script setup lang="ts">
import { reactive } from 'vue'
import type { LoaderProto, UseLoaderReturn } from './index'
import { useLoader } from './index'

const props = defineProps<{
  /**
   * The THREE.js loader to use
   */
  loader: LoaderProto<unknown>
  /**
   * Path or array of paths to resource(s)
   */
  url: string | string[]
}>()

const emit = defineEmits<{
  /**
   * Emitted when the resource is loaded successfully
   */
  (e: 'loaded'): void
  /**
   * Emitted when there is an error loading the resource
   */
  (e: 'error', error: Error): void
}>()

// Type guard to handle the union type
const loaderData = reactive<UseLoaderReturn<unknown>>(useLoader(props.loader, props.url))

// Handle loading state
loaderData.promise
  .then(() => emit('loaded'))
  .catch(err => emit('error', err))
</script>

<template>
  <slot
    :data="loaderData.data"
    :is-loading="loaderData.isLoading"
    :error="loaderData.error"
  ></slot>
</template>
