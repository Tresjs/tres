<script setup lang="ts">
import { ActiveCollisionTypes } from '@dimforge/rapier3d-compat'
import { useLoop } from '@tresjs/core'
import { Object3D } from 'three'
import {
  nextTick,
  onUnmounted,
  onUpdated,
  provide,
  shallowRef,
  watch,
} from 'vue'
import type { ShallowRef } from 'vue'

import { useRapierContext } from '../composables'
import { createColliderPropsFromObject, createRigidBody } from '../core'
import { hasValidColliderGeometry } from '../utils'
import { makePropsWatcherRB } from '../utils/props'
import { Collider } from './colliders'
import type {
  ColliderProps,
  ExposedRigidBody,
  RigidBodyContext,
  RigidBodyProps,
} from '../types'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
  gravityScale: 1,
  additionalMass: 0,
  linearDamping: 0,
  angularDamping: 0,
  dominanceGroup: 0,
  lockTranslations: false,
  lockRotations: false,
  enableCcd: false,
  linvel: () => ({ x: 0, y: 0, z: 0 }),
  angvel: () => ({ x: 0, y: 0, z: 0 }),
  enabledRotations: () => [true, true, true],
  enabledTranslations: () => [true, true, true],

  // AUTOMATIC COLLIDERS PROPS
  friction: 0.5,
  mass: 1,
  restitution: 0,
  density: 1,
  activeCollision: false,
  activeCollisionTypes: ActiveCollisionTypes.DEFAULT,
  collisionGroups: undefined, // TODO: Make the `collisionGroups` (Not working yet).
  sensor: false,
})

const { onBeforeRender } = useLoop()
const { world } = useRapierContext()

const bodyGroup = shallowRef<RigidBodyContext['group']>()
const bodyContext = shallowRef<RigidBodyContext>()
const instance = shallowRef<RigidBodyContext['rigidBody']>()
const instanceDesc = shallowRef<RigidBodyContext['rigidBodyDesc']>()
const autoColliderProps = shallowRef<ColliderProps[]>([])

provide('bodyContext', bodyContext)

defineExpose({
  instance,
  rigidBodyDesc: instanceDesc,
  context: bodyContext,
  group: bodyGroup,
} satisfies { [K in keyof ExposedRigidBody]: ShallowRef<ExposedRigidBody[K] | undefined> })

watch(bodyGroup, async (group) => {
  await nextTick()

  if (!(group instanceof Object3D) || bodyContext.value) { return }

  const newPhysicsState: RigidBodyContext = {
    ...props,
    ...createRigidBody({
      object: group,
      rigidBodyType: props.type,
      world,
    }),
    group,
    colliders: [],
  }

  if (props.collider !== false) {
    const collidersProps: ColliderProps[] = []

    for (const child of group.children) {
      // Skip children without valid geometry (e.g., collider wrappers, empty Object3Ds)
      if (!hasValidColliderGeometry(child as Object3D)) { continue }

      const _props = createColliderPropsFromObject(child as Object3D, props.collider)
      _props.friction = props.friction
      _props.mass = props.mass
      _props.restitution = props.restitution
      _props.density = props.density
      _props.activeCollision = props.activeCollision
      _props.activeCollisionTypes = props.activeCollisionTypes
      _props.collisionGroups = props.collisionGroups
      _props.sensor = props.sensor

      collidersProps.push(_props)
    }

    autoColliderProps.value = collidersProps
  }

  instance.value = newPhysicsState.rigidBody
  instanceDesc.value = newPhysicsState.rigidBodyDesc
  bodyContext.value = newPhysicsState
}, { once: true })

makePropsWatcherRB(props, [
  'gravityScale',
  'additionalMass',
  'linearDamping',
  'angularDamping',
  'dominanceGroup',
  'linvel',
  'angvel',
  'enabledRotations',
  'enabledTranslations',
], instance)

watch([() => props.lockTranslations, instance], ([_lockTranslations, _]) => {
  if (!instance.value) { return }
  instance.value.lockTranslations(_lockTranslations, true)
})
watch([() => props.lockRotations, instance], ([_lockRotations, _]) => {
  if (!instance.value) { return }
  instance.value.lockRotations(_lockRotations, true)
})
watch([() => props.enableCcd, instance], ([_enableCcd, _]) => {
  if (!instance.value) { return }
  instance.value.enableCcd(_enableCcd)
})

onBeforeRender(() => {
  const context = bodyContext.value
  if (!context) { return }

  const position = context.rigidBody.translation()
  const rotation = context.rigidBody.rotation()

  context.group.position.set(position.x, position.y, position.z)
  context.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
})

onUpdated(() => {
  bodyContext.value?.rigidBody.wakeUp()
})

onUnmounted(() => {
  if (!bodyContext.value) { return }

  world.removeRigidBody(bodyContext.value.rigidBody)

  bodyContext.value.colliders.forEach((collider) => {
    world.removeCollider(collider.collider, false)
  })

  bodyContext.value = undefined
})
</script>

<template>
  <TresGroup ref="bodyGroup">
    <Collider
      v-for="(_props, id) in autoColliderProps"
      :key="id"
      :shape="_props.shape"
      :args="_props.args"
      :object="_props.object"
      :friction="_props.friction"
      :mass="_props.mass"
      :restitution="_props.restitution"
      :density="_props.density"
      :activeCollision="_props.activeCollision"
      :activeCollisionTypes="_props.activeCollisionTypes"
      :collisionGroups="_props.collisionGroups"
      :sensor="_props.sensor"
    />
    <slot v-once></slot>
  </TresGroup>
</template>
