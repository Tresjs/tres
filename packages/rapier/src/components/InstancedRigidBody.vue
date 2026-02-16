<script lang="ts" setup>
import { type TresObject, useLoop } from '@tresjs/core'
import { InstancedMesh, Object3D } from 'three'
import { onUnmounted, onUpdated, shallowRef, watch } from 'vue'

import { useRapierContext } from '../composables'
import { MATRIX_ZERO, QUATERNION_ZERO, VECTOR_ZERO } from '../constants/'
import { createCollider, createRigidBody } from '../core'
import type { InstancedRigidBodyProps, RigidBodyContext } from '../types'

const props = withDefaults(defineProps<Partial<InstancedRigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { onBeforeRender } = useLoop()
const { world } = useRapierContext()

const bodyGroup = shallowRef<TresObject>()
const bodiesContexts = shallowRef<RigidBodyContext[]>([])

defineExpose({
  contexts: bodiesContexts,
})

watch(bodyGroup, (group) => {
  if (!(group instanceof Object3D)) { return }

  const child = bodyGroup.value?.children[0]
  if (
    !(child instanceof InstancedMesh)
    || typeof bodyGroup.value?.children?.length !== 'number'
    || bodyGroup.value.children.length > 1
  ) {
    throw new Error('Incorrect data assignment detected! #RigidBody support only one #InstancedMesh')
  }

  const instanceArray = child.instanceMatrix.array

  for (let i = 0; i < child.count; i++) {
    const matrix = MATRIX_ZERO.fromArray(instanceArray, i * 16)
    const position = VECTOR_ZERO.clone()
    const quaternion = QUATERNION_ZERO.clone()
    const scale = VECTOR_ZERO.clone()
    matrix.decompose(position, quaternion, scale)

    const rigidBodyInfo: RigidBodyContext = {
      ...props,
      ...createRigidBody({
        object: child,
        rigidBodyType: props.type,
        world,
      }),
      collider: props.collider,
      group,
      colliders: [],
    }

    rigidBodyInfo.rigidBody.setTranslation(position, true)
    rigidBodyInfo.rigidBody.setRotation(quaternion, true)

    const colliderInfo = {
      ...createCollider({
        object: child,
        shape: props.collider,
        rigidBody: rigidBodyInfo.rigidBody,
        world,
      }),
      object: child,
    }

    rigidBodyInfo.colliders.push(colliderInfo)
    bodiesContexts.value.push(rigidBodyInfo)
  }
}, { once: true })

onBeforeRender(() => {
  const child: InstancedMesh | undefined = bodyGroup.value?.children[0]

  if (!bodiesContexts.value?.length || !(child instanceof InstancedMesh)) { return }

  const array = child.instanceMatrix.array

  for (let i = 0; i < child.count; i++) {
    let position = VECTOR_ZERO.clone()
    let quaternion = QUATERNION_ZERO.clone()
    let scale = VECTOR_ZERO.clone()

    child.getMatrixAt(i, MATRIX_ZERO)
    MATRIX_ZERO.decompose(position, quaternion, scale)

    position = position.copy(
      bodiesContexts.value[i].rigidBody.translation(),
    )
    quaternion = quaternion.copy(
      bodiesContexts.value[i].rigidBody.rotation(),
    )
    scale = scale.copy(scale)

    MATRIX_ZERO
      .compose(position, quaternion, scale)
      .toArray(array, i * 16)
  }

  child.instanceMatrix.needsUpdate = true
  child.computeBoundingSphere()
})

onUpdated(() => {
  for (const context of bodiesContexts.value) {
    context?.rigidBody.wakeUp()
  }
})

onUnmounted(() => {
  if (!bodiesContexts.value) { return }

  bodiesContexts.value.forEach((context) => {
    world.value.removeRigidBody(context.rigidBody)

    context.colliders.forEach((collider) => {
      world.value.removeCollider(collider.collider, false)
    })
  })

  bodiesContexts.value = []
})
</script>

<template>
  <TresGroup ref="bodyGroup">
    <slot v-once></slot>
  </TresGroup>
</template>
