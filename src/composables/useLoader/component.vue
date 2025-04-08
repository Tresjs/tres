<script setup lang="ts" generic="T extends TresObjectMap, G extends string | string[]">
import type { LoadingManager } from 'three'
import type { LoaderProto } from './index'
import { useLoader } from './index'
import { computed, defineEmits, defineProps } from 'vue'
import { whenever } from '@vueuse/core'
import type { TresObjectMap } from '../../utils/graph'

const props = defineProps<{
  /**
   * The THREE.js loader to use
   */
  loader: LoaderProto<T>
  /**
   * Path or array of paths to resource(s)
   */
  path: G
  /**
   * Optional THREE.js LoadingManager
   */
  manager?: LoadingManager
}>()

const emit = defineEmits<{
  loaded: [result: G extends string ? T : T[]]
  error: [error: G extends string ? unknown : unknown[]]
}>()

const state = useLoader(props.loader, props.path, { manager: props.manager })

// Type guard to check if we're dealing with an array of results
const isMultiple = (x: ReturnType<typeof useLoader<T, G>> | ReturnType<typeof useLoader<T, G>>[]): x is ReturnType<typeof useLoader<T, G>>[] => Array.isArray(x)

const errorOrErrors = computed(() =>
  (isMultiple(state) ? state.map(({ error }) => error.value) : state.error.value),
)

const hasError = computed(() =>
  isMultiple(state) ? state.some(({ error }) => error.value) : !!state.error.value,
)

whenever(hasError, () => {
  emit('error', errorOrErrors.value as unknown as G extends string ? unknown : unknown[])
})

const isReady = computed(() => {
  return isMultiple(state) ? state.every(({ isReady }) => isReady.value) : !!state.isReady
})

const dataOrDataArray = computed(() =>
  isMultiple(state) ? state.map(({ state }) => state.value) : state.state.value,
)

whenever(isReady, () => {
  emit('loaded', dataOrDataArray.value as unknown as G extends string ? T : T[])
})
</script>

<template>
  <slot v-bind="state"></slot>
</template>
