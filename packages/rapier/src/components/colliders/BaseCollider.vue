<script setup lang="ts">
import { ActiveCollisionTypes, ActiveEvents } from '@dimforge/rapier3d-compat'
import { inject, nextTick, onUnmounted, type ShallowRef, shallowRef, watch } from 'vue'

import { useRapierContext } from '../../composables'
import { createCollider } from '../../core/collider'
import { makePropsWatcherCL } from '../../utils'
import type { ColliderProps, CreateColliderReturnType, ExposedCollider, RigidBodyContext } from '../../types'

const props = withDefaults(defineProps<Partial<ColliderProps>>(), {
  shape: 'cuboid',
  args: () => [1, 1, 1],
  friction: 0.5,
  mass: 1,
  restitution: 0,
  density: 1,
  activeCollision: false,
  activeCollisionTypes: ActiveCollisionTypes.DEFAULT,
  collisionGroups: undefined,
  sensor: false,
})

const { world } = useRapierContext()

const bodyContext = inject<ShallowRef<RigidBodyContext>>('bodyContext') ?? shallowRef<RigidBodyContext>()
const colliderInfos = shallowRef<CreateColliderReturnType>()
const instance = shallowRef<CreateColliderReturnType['collider']>()
const colliderDesc = shallowRef<CreateColliderReturnType['colliderDesc']>()

defineExpose({
  instance,
  colliderDesc,
} satisfies { [K in keyof ExposedCollider]: ShallowRef<ExposedCollider[K] | undefined> })

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
  colliderDesc.value = infos.colliderDesc
  colliderInfos.value = infos

  state.colliders.push(infos)
}, { immediate: true })

// TODO: collisionGroups
makePropsWatcherCL(
  props,
  [
    'friction',
    'restitution',
    'density',
    'mass',
    'activeCollisionTypes',
    'activeCollision',
    'sensor',
  ],
  colliderInfos,
)

watch([() => props.collisionGroups, colliderInfos], ([_collisionGroups, _]) => {
  if (!colliderInfos.value?.collider || !_collisionGroups) { return }
  colliderInfos.value.collider.setCollisionGroups(_collisionGroups)
})

watch([() => props.activeCollision, colliderInfos], ([_activeCollision]) => {
  if (!colliderInfos.value?.collider) { return }
  if (_activeCollision) {
    colliderInfos.value.collider.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
  }
  else {
    colliderInfos.value.collider.setActiveEvents(ActiveEvents.NONE)
  }
})

onUnmounted(() => {
  if (!bodyContext.value || !colliderInfos.value?.collider) { return }

  world.value.removeCollider(colliderInfos.value.collider, false)

  colliderInfos.value = undefined
})
</script>

<template>
  <TresObject3D>
    <slot></slot>
  </TresObject3D>
</template>
