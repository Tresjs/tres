<script setup lang="ts">
import { type TresObject, useLoop } from '@tresjs/core'
import { Object3D } from 'three'
import { nextTick, onUnmounted, onUpdated, provide, shallowRef, watch } from 'vue'

import { useRapierContext } from '../composables'
import { createColliderPropsFromObject, createRigidBody } from '../utils'
import { BaseCollider } from './colliders'
import type { ColliderProps, RigidBodyContext, RigidBodyProps } from '../types'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { onBeforeRender } = useLoop()
const { world } = useRapierContext()

const bodyGroup = shallowRef<TresObject>()
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
})

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
