<script setup lang="ts">
import { EventQueue } from '@dimforge/rapier3d-compat'
import { useLoop, useTresContext } from '@tresjs/core'
import { Vector3 } from 'three'
import { watch } from 'vue'
import type { VectorCoordinates } from '@tresjs/core'
import { useRapierContextProvider } from '../composables'
import { GRAVITY } from '../constants'

import {
  collisionEmisor,
  emitIntersection,
  get3DGroupFromSource,
  getSourceFromColliderHandle,
} from '../utils'
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

const eventQueue = new EventQueue(true)
const { scene } = useTresContext()

watch(() => props.gravity, (gravity) => {
  setGravity(gravity)
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!world || isPaused) { return }
  if (typeof props.timestep === 'number') {
    world.timestep = props.timestep
  }

  world.step(eventQueue)
  eventQueue.drainCollisionEvents((handle1, handle2, started) => {
    const source1 = getSourceFromColliderHandle(world, handle1)
    const source2 = getSourceFromColliderHandle(world, handle2)
    const group1 = get3DGroupFromSource(source1, scene)
    const group2 = get3DGroupFromSource(source2, scene)

    if (!group1 || !group2) {
      return
    }

    collisionEmisor(
      { object: group1, context: source1 },
      { object: group2, context: source2 },
      started,
    )

    emitIntersection(
      { object: group2, context: source2 },
      { object: group1, context: source1 },
      started && world.intersectionPair(source1.collider, source2.collider),
    )
  })
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
