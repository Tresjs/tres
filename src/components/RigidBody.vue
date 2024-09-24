<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { Object3D } from 'three'
import { nextTick, onUnmounted, onUpdated, provide, shallowRef, watch } from 'vue'

import type { ShallowRef } from 'vue'
import { useRapierContext } from '../composables'
import { createColliderPropsFromObject, createRigidBody } from '../core'
import { makePropsWatcherRB } from '../utils/props'
import { BaseCollider } from './colliders'
import type { ColliderProps, ExposedRigidBody, RigidBodyContext, RigidBodyProps } from '../types'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
  gravityScale: 1,
  additionalMass: 0,
  linearDamping: 0,
  angularDamping: 0,
  dominanceGroup: 0,
  linvel: () => ({ x: 0, y: 0, z: 0 }),
  angvel: () => ({ x: 0, y: 0, z: 0 }),
  enabledRotations: () => ({ x: true, y: true, z: true }),
  enabledTranslations: () => ({ x: true, y: true, z: true }),
  lockTranslations: false,
  lockRotations: false,
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
    const colliders = []

    for (const child of group.children) {
      colliders.push(createColliderPropsFromObject(child, props.collider))
    }

    autoColliderProps.value = colliders
  }

  instance.value = newPhysicsState.rigidBody
  instanceDesc.value = newPhysicsState.rigidBodyDesc
  bodyContext.value = newPhysicsState
}, { once: true })

// PROPS
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
    <BaseCollider
      v-for="(_props, id) in autoColliderProps"
      :key="id"
      :shape="_props.shape"
      :args="_props.args"
      :object="_props.object"
    />
    <slot v-once></slot>
  </TresGroup>
</template>
