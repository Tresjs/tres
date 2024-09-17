<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { Vector3 } from 'three'
import { watch } from 'vue'
import type { VectorCoordinates } from '@tresjs/core'
import { useRapierContextProvider } from '../composables/useRapier'

import { GRAVITY } from '../constants/physics'
import Debug from './Debug.vue'
import type { PhysicsProps } from '../types'

const props = withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    gravity: () => new Vector3(GRAVITY.x, GRAVITY.y, GRAVITY.z),
    debug: false,
  },
)

const { world, isPaused } = await useRapierContextProvider()

const setGravity = (gravity: PhysicsProps['gravity']) => {
  // If gravity is something like [0, -9.8, 0]
  if (Array.isArray(gravity)) {
    world.gravity.x = gravity[0]
    world.gravity.y = gravity[1]
    world.gravity.z = gravity[2]
  }
  else {
    const coordinates = gravity as VectorCoordinates
    world.gravity.x = coordinates.x
    world.gravity.y = coordinates.y
    world.gravity.z = coordinates.z
  }
}

watch(() => props.gravity, (gravity) => {
  setGravity(gravity)
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!world || isPaused) { return }
  if (typeof props.timestep === 'number') {
    world.timestep = props.timestep
  }

  world.step()
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
