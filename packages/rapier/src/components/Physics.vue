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
  contactForceTrigger,
  emitIntersection,
  getCollisionSourceFromColliderHandle,
  getNodeObjectsFromCollisionSource,
  MAX_VARY_SOLVER_TIMESTEP,
  resolveTimestep,
} from '../utils'
import Debug from './Debug.vue'
import type { PhysicsProps, SourceTarget } from '../types'

const props = withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    gravity: () => new Vector3(GRAVITY.x, GRAVITY.y, GRAVITY.z),
    debug: false,
    speed: 1,
  },
)

const context = useRapierContextProvider()!
defineExpose(context)
await context.init()
const { world, isPaused, beforeStepCallbacks } = context

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

onBeforeRender(({ delta }) => {
  if (!world.value || isPaused.value) { return }
  const frameTime = resolveTimestep(props.timestep, delta, world.value.timestep, props.speed)
  // 'vary' frames covering more sim time than a single solver step can handle
  // (low fps, speed > 1) are solved in equal substeps — one oversized step
  // destabilizes springs/suspensions and shows up as jitter
  const substeps = props.timestep === 'vary'
    ? Math.max(1, Math.ceil(frameTime / MAX_VARY_SOLVER_TIMESTEP))
    : 1

  world.value.timestep = frameTime / substeps

  for (let i = 0; i < substeps; i++) {
    beforeStepCallbacks.forEach(callback => callback(world.value.timestep))
    world.value.step(eventQueue)
  }
  eventQueue.drainCollisionEvents((handle1, handle2, started) => {
    const source1 = getCollisionSourceFromColliderHandle(world.value, handle1)
    const source2 = getCollisionSourceFromColliderHandle(world.value, handle2)
    const [groupObject1, currentObject1] = getNodeObjectsFromCollisionSource(source1, scene)
    const [groupObject2, currentObject2] = getNodeObjectsFromCollisionSource(source2, scene)

    if (!groupObject1 || !currentObject1 || !groupObject2 || !currentObject2) { return }

    const sourceTarget1: SourceTarget = {
      objects: [groupObject1, currentObject1],
      context: source1,
    }
    const sourceTarget2: SourceTarget = {
      objects: [groupObject2, currentObject2],
      context: source2,
    }

    collisionTrigger(sourceTarget1, sourceTarget2, started)
    emitIntersection(
      sourceTarget2,
      sourceTarget1,
      started && world.value.intersectionPair(source1.collider, source2.collider),
    )
  })

  eventQueue.drainContactForceEvents((event) => {
    const source1 = getCollisionSourceFromColliderHandle(world.value, event.collider1())
    const source2 = getCollisionSourceFromColliderHandle(world.value, event.collider2())
    const [groupObject1, currentObject1] = getNodeObjectsFromCollisionSource(source1, scene)
    const [groupObject2, currentObject2] = getNodeObjectsFromCollisionSource(source2, scene)

    if (!groupObject1 || !currentObject1 || !groupObject2 || !currentObject2) { return }

    const forcePayload = {
      totalForce: event.totalForce(),
      totalForceMagnitude: event.totalForceMagnitude(),
      maxForceDirection: event.maxForceDirection(),
      maxForceMagnitude: event.maxForceMagnitude(),
    }

    contactForceTrigger(
      { objects: [groupObject1, currentObject1], context: source1 },
      { objects: [groupObject2, currentObject2], context: source2 },
      forcePayload,
    )
    contactForceTrigger(
      { objects: [groupObject2, currentObject2], context: source2 },
      { objects: [groupObject1, currentObject1], context: source1 },
      forcePayload,
    )
  })
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
