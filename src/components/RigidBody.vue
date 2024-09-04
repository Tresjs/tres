<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { type TresObject, useLoop } from '@tresjs/core'

import { InstancedMesh } from 'three'
import { useRapierContext } from '../composables/useRapier'
import { createRigidBody } from '../utils/rigid-body'
import { createCollider, createCollidersFromChildren } from '../utils/collider'
import { MATRIX_ZERO, QUATERNION_ZERO, VECTOR_ZERO } from '../constants/object'
import type { CreateRigidBodyReturnType, RigidBodyProps } from '../types/rigid-body'
import type { CreateColliderReturnType } from '../types/collider'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
  instanced: false,
})

const { world } = await useRapierContext()
const { onBeforeRender } = useLoop()

const parentObject = shallowRef<TresObject>()
const rigidBodyInfos = shallowRef<CreateRigidBodyReturnType[]>()
const colliderInfos = shallowRef<CreateColliderReturnType[]>()

watch(parentObject, (object?: TresObject) => {
  if (!object) { return }

  if (props.instanced) {
    const child = parentObject.value?.children[0]
    if (
      !(child instanceof InstancedMesh)
      || typeof parentObject.value?.children?.length !== 'number'
      || parentObject.value.children.length > 1
    ) {
      throw new Error('Incorrect data assignment detected! #RigidBody support only one #InstancedMesh')
    }

    const instanceArray = child.instanceMatrix.array
    const rigidBodies: CreateRigidBodyReturnType[] = []
    const colliders: CreateColliderReturnType[] = []

    for (let i = 0; i < child.count; i++) {
      const matrix = MATRIX_ZERO.fromArray(instanceArray, i * 16)
      const position = VECTOR_ZERO.clone()
      const quaternion = QUATERNION_ZERO.clone()
      const scale = VECTOR_ZERO.clone()
      matrix.decompose(position, quaternion, scale)

      const rigidBodyInfo = createRigidBody({
        object: child,
        rigidBodyType: props.type,
        world,
      })
      rigidBodyInfo.rigidBody.setTranslation(position, true)
      rigidBodyInfo.rigidBody.setRotation(quaternion, true)

      const colliderInfo = createCollider({
        object: child,
        colliderShape: props.collider,
        rigidBody: rigidBodyInfo.rigidBody,
        world,
      })

      rigidBodies.push(rigidBodyInfo)
      colliders.push(colliderInfo)
    }

    rigidBodyInfos.value = rigidBodies
    colliderInfos.value = colliders

    return
  }

  rigidBodyInfos.value = [createRigidBody({
    object,
    rigidBodyType: props.type,
    world,
  })]

  colliderInfos.value = createCollidersFromChildren({
    colliderShape: props.collider,
    rigidBody: rigidBodyInfos.value[0].rigidBody,
    object,
    world,
  })
})

onBeforeRender(() => {
  if (!colliderInfos.value || !rigidBodyInfos.value) { return }

  if (props.instanced) {
    const child: InstancedMesh = parentObject.value?.children[0]
    const array = child.instanceMatrix.array

    for (let i = 0; i < child.count; i++) {
      let position = VECTOR_ZERO.clone()
      let quaternion = QUATERNION_ZERO.clone()
      let scale = VECTOR_ZERO.clone()

      child.getMatrixAt(i, MATRIX_ZERO)
      MATRIX_ZERO.decompose(position, quaternion, scale)

      position = position.copy(
        rigidBodyInfos.value[i].rigidBody.translation(),
      )
      quaternion = quaternion.copy(
        rigidBodyInfos.value[i].rigidBody.rotation(),
      )
      scale = scale.copy(scale)

      MATRIX_ZERO
        .compose(position, quaternion, scale)
        .toArray(array, i * 16)
    }

    child.instanceMatrix.needsUpdate = true
    child.computeBoundingSphere()

    return
  }

  rigidBodyInfos.value.forEach((item: CreateRigidBodyReturnType) => {
    const position = item.rigidBody.translation()
    item.object.position.set(position.x, position.y, position.z)

    const rotation = item.rigidBody.rotation()
    item.object.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
  })
})
</script>

<template>
  <TresGroup ref="parentObject">
    <slot></slot>
  </TresGroup>
</template>
