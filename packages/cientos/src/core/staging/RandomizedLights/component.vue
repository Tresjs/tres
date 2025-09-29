<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import type { VectorFlexibleParams } from '@tresjs/core'
import { extend, normalizeVectorFlexibleParam } from '@tresjs/core'
import RandomizedLights from './RandomizedLights'

export interface RandomizedLightsProps {
  /** Number of lights, 8 */
  count?: number
  /** Radius of the jiggle, higher values make softer light, 1 */
  radius?: number
  /** Light intensity, Math.PI */
  intensity?: number
  /** "Ambient occlusion" to directional light ratio, lower values mean less AO, 0.5 */
  ambient?: number
  /** If the lights cast shadows, true */
  castShadow?: boolean
  /** Default shadow bias, 0 */
  bias?: number
  /** Size of the lights' shadow map, 512 */
  mapSize?: number
  /** Size of the lights' shadow camera frustum, 10 */
  size?: number
  /** Lights' shadow camera near value, 0.5 */
  near?: number
  /** Lights' shadow camera far value, 500 */
  far?: number
  /** Position, [5, 5, -10] */
  position?: VectorFlexibleParams
}

const props = withDefaults(defineProps<RandomizedLightsProps>(), {
  count: 8,
  radius: 1,
  intensity: Math.PI,
  ambient: 0.5,
  castShadow: true,
  bias: 0,
  mapSize: 512,
  size: 10,
  near: 0.5,
  far: 500,
  position: () => [5, 5, -10],
})

extend({ RandomizedLights })

const lightsRef = shallowRef()

const pos = computed(() => normalizeVectorFlexibleParam(props.position))

defineExpose({ instance: lightsRef })
</script>

<template>
  <TresRandomizedLights
    ref="lightsRef"
    :count="count"
    :radius="radius"
    :intensity="intensity"
    :ambient="ambient"
    :cast-shadow="castShadow"
    :bias="bias"
    :map-size="mapSize"
    :size="size"
    :near="near"
    :far="far"
    :position="pos"
  />
</template>
