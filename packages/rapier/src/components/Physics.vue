<script setup lang="ts">
import { EventQueue } from '@dimforge/rapier3d-compat'
import { useLoop, useTresContext } from '@tresjs/core'
import { Vector3 } from 'three'
import { watch } from 'vue'
import type { VectorCoordinates } from '@tresjs/core'
import { useRapierContextProvider } from '../composables'
import { GRAVITY } from '../constants'

import {
  collisionTrigger,
  emitIntersection,
  getCollisionObjectFromSource,
  getCollisionSourceFromColliderHandle,
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

const context = useRapierContextProvider()!
defineExpose(context)
await context.init()
const { world, isPaused } = context

const setGravity = (gravity: PhysicsProps['gravity']) => {
  // If gravity is something like [0, -9.8, 0]
  if (Array.isArray(gravity)) {
    world.value.gravity.x = gravity[0]
    world.value.gravity.y = gravity[1]
    world.value.gravity.z = gravity[2]
  }
  else {
    const coordinates = gravity as VectorCoordinates
    world.value.gravity.x = coordinates.x
    world.value.gravity.y = coordinates.y
    world.value.gravity.z = coordinates.z
  }
}

const eventQueue = new EventQueue(true)
const { scene } = useTresContext()

watch(() => props.gravity, (gravity) => {
  setGravity(gravity)
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!world.value || isPaused.value) { return }
  if (typeof props.timestep === 'number') {
    world.value.timestep = props.timestep
  }

  world.value.step(eventQueue)
  eventQueue.drainCollisionEvents((handle1, handle2, started) => {
    const source1 = getCollisionSourceFromColliderHandle(world.value, handle1)
    const source2 = getCollisionSourceFromColliderHandle(world.value, handle2)
    const object1 = getCollisionObjectFromSource(source1, scene)
    const object2 = getCollisionObjectFromSource(source2, scene)

    if (!object1 || !object2) { return }

    collisionTrigger(
      { objects: object1, context: source1 },
      { objects: object2, context: source2 },
      started,
    )

    emitIntersection(
      { objects: object2, context: source2 },
      { objects: object1, context: source1 },
      started && world.value.intersectionPair(source1.collider, source2.collider),
    )
  })
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
