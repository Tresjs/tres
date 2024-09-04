<script setup lang="ts">
import { useLoop } from '@tresjs/core'

import { useRapierContextProvider } from '../composables/useRapier'
import type { PhysicsProps } from '../types/physics'
import Debug from './Debug.vue'

withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    debug: false,
  },
)

const { world } = await useRapierContextProvider()
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
