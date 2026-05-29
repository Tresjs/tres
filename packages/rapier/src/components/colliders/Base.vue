<script setup lang="ts">
import type { TresObject3D } from '@tresjs/core'
import { ActiveCollisionTypes, ActiveEvents, ColliderDesc } from '@dimforge/rapier3d-compat'
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
  solverGroups: undefined,
  sensor: false,
  activeContactForce: false,
  contactForceEventThreshold: 5.0,
})

const { world } = useRapierContext()

const colliderGroup = shallowRef<TresObject3D>()
const bodyContext = inject<ShallowRef<RigidBodyContext>>('bodyContext') ?? shallowRef<RigidBodyContext>()
const colliderInfos = shallowRef<CreateColliderReturnType>()
const instance = shallowRef<CreateColliderReturnType['collider']>()
const colliderDesc = shallowRef<CreateColliderReturnType['colliderDesc']>()

defineExpose({
  instance,
  colliderDesc,
  object: colliderGroup,
} satisfies { [K in keyof ExposedCollider]: ShallowRef<ExposedCollider[K] | undefined> })

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

watch(bodyContext, async (state) => {
  await nextTick()

  const isValidCollider = !!state?.colliders.find((item) => {
    return item.object.uuid === props.object?.uuid
  })

  if (!state || isValidCollider) { return }

  const object = props.object ?? state.group
  const infos = {
    ...createCollider({
      ...props,
      object,
      rigidBody: state.rigidBody,
      world,
    }),
    object,
    group: colliderGroup,
  }

  infos.collider.userData = {
    uuid: colliderGroup.value?.uuid,
  }
  instance.value = infos.collider
  colliderDesc.value = infos.colliderDesc
  colliderInfos.value = infos

  state.colliders.push(infos)
}, { immediate: true })

// Props watchers
watch(() => props.shape, value => {
  if (!colliderInfos.value?.collider) { return }
  colliderInfos.value.collider.setShape(
    (ColliderDesc[value](
      props.args?.[0] ?? 1,
      props.args?.[1] ?? 1,
      props.args?.[2] ?? 1,
      props.args?.[3] ?? 1,
    ) ?? ColliderDesc.cuboid(1, 1, 1)
    ).shape)
})
watch(() => props.args, value => {
  if (!colliderInfos.value?.collider) { return }
  colliderInfos.value.collider.setShape(
    (ColliderDesc[props.shape](
      value?.[0] ?? 1,
      value?.[1] ?? 1,
      value?.[2] ?? 1,
      value?.[3] ?? 1,
    ) ?? ColliderDesc.cuboid(1, 1, 1)).shape)
})
watch(() => props.position, value => {
  if (!colliderInfos.value?.collider) { return }
  colliderInfos.value.collider.setTranslation({
    x: typeof value?.[0] === 'number' ? value?.[0] : 0,
    y: typeof value?.[1] === 'number' ? value?.[1] : 0,
    z: typeof value?.[2] === 'number' ? value?.[2] : 0,
  })
})
watch(() => props.rotation, value => {
  if (!colliderInfos.value?.collider) { return }
  colliderInfos.value.collider.setRotation({
    x: typeof value?.[0] === 'number' ? value?.[0] : 0,
    y: typeof value?.[1] === 'number' ? value?.[1] : 0,
    z: typeof value?.[2] === 'number' ? value?.[2] : 0,
    w: typeof value?.[3] === 'number' ? value?.[3] : 1,
  })
})
watch(() => props.friction, value => colliderInfos.value?.collider.setFriction(value))
watch(() => props.mass, value => colliderInfos.value?.collider.setMass(value))
watch(() => props.restitution, value => colliderInfos.value?.collider.setRestitution(value))
watch(() => props.density, value => colliderInfos.value?.collider.setDensity(value))
watch(() => props.activeCollision, value => colliderInfos.value?.collider.setActiveEvents(value ? ActiveEvents.COLLISION_EVENTS : ActiveEvents.NONE))
watch(() => props.activeCollisionTypes, value => colliderInfos.value?.collider.setActiveCollisionTypes(value))
watch(() => props.collisionGroups, value => colliderInfos.value?.collider.setCollisionGroups(value ?? 0))
watch(() => props.solverGroups, value => colliderInfos.value?.collider.setSolverGroups(value ?? 0))
watch(() => props.sensor, value => colliderInfos.value?.collider.setSensor(value))
watch(() => props.activeContactForce, value => colliderInfos.value?.collider.setActiveEvents(value ? ActiveEvents.CONTACT_FORCE_EVENTS : ActiveEvents.NONE))
watch(() => props.contactForceEventThreshold, value => colliderInfos.value?.collider.setContactForceEventThreshold(value))
watch([() => props.collisionGroups, colliderInfos], ([_collisionGroups, _]) => {
  if (!colliderInfos.value?.collider || !_collisionGroups) { return }
  colliderInfos.value.collider.setCollisionGroups(_collisionGroups)
})
watch([() => props.activeCollision, () => props.activeContactForce, colliderInfos], () => {
  if (!colliderInfos.value?.collider) { return }

  let flags = ActiveEvents.NONE

  if (props.activeCollision) { flags |= ActiveEvents.COLLISION_EVENTS }

  if (props.activeContactForce) { flags |= ActiveEvents.CONTACT_FORCE_EVENTS }
  colliderInfos.value.collider.setActiveEvents(flags)
})
watch([() => props.contactForceEventThreshold, colliderInfos], ([threshold]) => {
  if (!colliderInfos.value?.collider || threshold === undefined) { return }
  colliderInfos.value.collider.setContactForceEventThreshold(threshold)
})

onUnmounted(() => {
  if (!bodyContext.value || !colliderInfos.value?.collider) { return }

  world.value.removeCollider(colliderInfos.value.collider, false)

  colliderInfos.value = undefined
})
</script>

<template>
  <TresObject3D ref="colliderGroup">
    <slot></slot>
  </TresObject3D>
</template>
