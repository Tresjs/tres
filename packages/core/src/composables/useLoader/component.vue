<script setup lang="ts" generic="T extends TresObjectMap">
import type { LoadingManager } from 'three'
import type { LoaderProto } from './index'
import { useLoader } from './index'
import { whenever } from '@vueuse/core'
import type { TresObjectMap } from '../../utils/graph'

const props = defineProps<{
  /**
   * The THREE.js loader to use
   */
  loader: LoaderProto<T>
  /**
   * Path to resource
   */
  path: string
  /**
   * Optional THREE.js LoadingManager
   */
  manager?: LoadingManager
}>()

const emit = defineEmits<{
  loaded: [result: T]
  error: [error: unknown]
}>()

const { state, isLoading, error } = useLoader(props.loader, props.path, { manager: props.manager })

whenever(error, (err) => {
  if (err) { emit('error', err) }
})

whenever(state, (value) => {
  if (value) { emit('loaded', value as T) }
})
</script>

<template>
  <slot
    :state="state"
    :is-loading="isLoading"
    :error="error"
  ></slot>
</template>
