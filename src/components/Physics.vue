<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { Vector3 } from 'three'

import { watch } from 'vue'
import type { TresVector3, VectorCoordinates } from '@tresjs/core'
import { useRapierContextProvider } from '../composables/useRapier'
// import type { PhysicsProps } from '../types/physics'
import { GRAVITY } from '../constants/physics'
import Debug from './Debug.vue'

export interface PhysicsProps {
  debug: boolean
  gravity: TresVector3 | VectorCoordinates
}

const props = withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    gravity: () => new Vector3(GRAVITY.x, GRAVITY.y, GRAVITY.z),
    debug: false,
  },
)

const { world } = await useRapierContextProvider()

const setGravity = (gravity: TresVector3) => {
  // If gravity is somethign like [0, -9.8, 0]
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
  if (!world) { return }
  world.step()
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
