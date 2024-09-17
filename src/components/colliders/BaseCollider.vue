<script setup lang="ts">
import { inject, nextTick, onUnmounted, type ShallowRef, shallowRef, watch } from 'vue'

import { useRapierContext } from '../../composables'
import { createCollider } from '../../utils/collider'
import type { ColliderProps, CreateColliderReturnType, RigidBodyContext } from '../../types'

const props = withDefaults(defineProps<Partial<ColliderProps>>(), {
  shape: 'cuboid',
  args: () => [1, 1, 1],
})

const { world } = useRapierContext()

const bodyContext = inject<ShallowRef<RigidBodyContext>>('bodyContext') ?? shallowRef<RigidBodyContext>()
const colliderInfos = shallowRef<CreateColliderReturnType>()
const instance = shallowRef<CreateColliderReturnType['collider']>()
const instanceDesc = shallowRef<CreateColliderReturnType['colliderDesc']>()

defineExpose({
  instance,
  colliderDesc: instanceDesc,
})

watch(bodyContext, async (state) => {
  await nextTick()

  const isColliderExist = !!state?.colliders.find((item) => {
    return item.object.uuid === props.object?.uuid
  })

  if (!state || isColliderExist) { return }

  const object = props.object ?? state.group
  const infos = {
    ...createCollider({
      ...props,
      object,
      rigidBody: state.rigidBody,
      world,
    }),
    object,
  }

  instance.value = infos.collider
  instanceDesc.value = infos.colliderDesc
  colliderInfos.value = infos

  state.colliders.push(infos)
}, { immediate: true })

onUnmounted(() => {
  if (!bodyContext.value || !colliderInfos.value?.collider) { return }

  world.removeCollider(colliderInfos.value.collider, false)

  colliderInfos.value = undefined
})
</script>

<template>
  <slot></slot>
</template>
