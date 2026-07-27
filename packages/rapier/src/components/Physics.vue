<script setup lang="ts">
import { EventQueue } from '@dimforge/rapier3d-compat'
import { useLoop, useTresContext } from '@tresjs/core'
import { Vector3 } from 'three'
import { watch } from 'vue'
import type { VectorCoordinates } from '@tresjs/core'
import { useRapierContextProvider } from '../composables'
import { DEFAULT_TIMESTEP, GRAVITY, MAX_PHYSICS_DELTA } from '../constants'

import {
  collisionTrigger,
  contactForceTrigger,
  emitIntersection,
  getCollisionSourceFromColliderHandle,
  getNodeObjectsFromCollisionSource,
} from '../utils'
import Debug from './Debug.vue'
import type { PhysicsProps, SourceTarget } from '../types'

const props = withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    gravity: () => new Vector3(GRAVITY.x, GRAVITY.y, GRAVITY.z),
    debug: false,
    pause: false,
    timeStep: DEFAULT_TIMESTEP,
    timeScale: 1,
  },
)

const context = useRapierContextProvider()!
defineExpose(context)
await context.init()
const { world, isPaused, timeStep, timeScale, isDebug } = context

const resolveGravity = (gravity: PhysicsProps['gravity']): [number, number, number] => {
  if (typeof gravity === 'number') {
    return [gravity, gravity, gravity]
  }
  if (Array.isArray(gravity)) {
    return [gravity[0], gravity[1], gravity[2]]
  }
  const coordinates = gravity as VectorCoordinates
  return [coordinates.x, coordinates.y, coordinates.z]
}

const eventQueue = new EventQueue(true)
const { scene } = useTresContext()

/**
 * Accumulates unused frame time so fixed timesteps stay in sync with real time
 * across different refresh rates. @see https://gafferongames.com/post/fix_your_timestep/
 */
let accumulator = 0

// Track components so array / Vector3 updates apply at runtime.
watch(
  () => resolveGravity(props.gravity),
  ([x, y, z]) => {
    world.value.gravity.x = x
    world.value.gravity.y = y
    world.value.gravity.z = z
  },
  { immediate: true },
)

watch(() => props.timeStep, (value) => {
  timeStep.value = value
}, { immediate: true })

watch(() => props.timeScale, (value) => {
  timeScale.value = value
}, { immediate: true })

watch(timeStep, () => {
  accumulator = 0
})

watch(() => props.debug, (value) => {
  isDebug.value = value
}, { immediate: true })

watch(() => props.pause, (value) => {
  isPaused.value = value
}, { immediate: true })

const drainEvents = () => {
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
}

const stepWorld = (dt: number) => {
  world.value.timestep = dt
  world.value.step(eventQueue)
  drainEvents()
}

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (!world.value || isPaused.value || timeScale.value <= 0) { return }

  const clampedDelta = Math.min(Math.max(delta * timeScale.value, 0), MAX_PHYSICS_DELTA)

  if (timeStep.value === 'vary') {
    stepWorld(clampedDelta)
    return
  }

  const fixedStep = typeof timeStep.value === 'number' ? timeStep.value : DEFAULT_TIMESTEP

  if (!(fixedStep > 0)) { return }

  accumulator += clampedDelta

  while (accumulator >= fixedStep) {
    stepWorld(fixedStep)
    accumulator -= fixedStep
  }
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
