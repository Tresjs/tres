<script setup lang="ts">
import { type TresObject, useLoop } from '@tresjs/core'
import { shallowRef, watch } from 'vue'
import { useRapierContext } from '../composables/useRapier'
import { createCollidersFromChildren } from '../utils/collider'
import { createRigidBody } from '../utils/rigid-body'
import type { CreateColliderReturnType } from '../types/collider'
import type { CreateRigidBodyReturnType, RigidBodyProps } from '../types/rigid-body'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const parentObject = shallowRef<TresObject>()
const rigidBodyInfos = shallowRef<CreateRigidBodyReturnType>()
const colliderInfos = shallowRef<CreateColliderReturnType[]>()
const rigidBodyInstance = shallowRef()

defineExpose({
  instance: rigidBodyInstance,
  rigidBodyInfos,
  collider: colliderInfos,
  group: parentObject,
})

const { world } = await useRapierContext()
const { onBeforeRender } = useLoop()

watch(parentObject, (object?: TresObject) => {
  if (!object) { return }

  rigidBodyInfos.value = createRigidBody({
    object,
    rigidBodyType: props.type,
    world,
  })

  colliderInfos.value = createCollidersFromChildren({
    colliderShape: props.collider,
    rigidBody: rigidBodyInfos.value.rigidBody,
    object,
    world,
  })

  rigidBodyInstance.value = rigidBodyInfos.value.rigidBody
})

onBeforeRender(() => {
  if (!colliderInfos.value || !rigidBodyInfos.value) { return }

  const position = rigidBodyInfos.value.rigidBody.translation()
  rigidBodyInfos.value.object.position.copy(position)

  const rotation = rigidBodyInfos.value.rigidBody.rotation()
  rigidBodyInfos.value.object.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
})
</script>

<template>
  <TresGroup ref="parentObject">
    <slot></slot>
  </TresGroup>
</template>
