<script setup lang="ts">
import type { TresObject3D } from '@tresjs/core'
import {
  ActiveCollisionTypes,
  ActiveEvents,
  ColliderDesc,
  HeightFieldFlags,
} from '@dimforge/rapier3d-compat'
import {
  inject,
  nextTick,
  onUnmounted,
  type ShallowRef,
  shallowRef,
  watch,
} from 'vue'

import { useRapierContext } from '../../composables'
import { createCollider } from '../../core/collider'
import { isVector3Like, makePropsWatcherCL } from '../../utils'
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

const updateShapeArgs = (shape: Exclude<ColliderProps['shape'], undefined>, args: any[]) => {
  const colliderDesc = ColliderDesc[shape]
  const safeArgs: any[] = []

  if (!colliderDesc) { return console.warn(`Invalid collider shape: ${shape}.`) }
  if (!colliderInfos.value?.collider) { return }

  if (
    shape === 'convexHull'
    || shape === 'convexMesh'
    || shape === 'polyline'
    || shape === 'trimesh'
  ) {
    safeArgs.push(
      args?.[0] instanceof Float32Array ? args?.[0] : new Float32Array(),
      args?.[1] instanceof Uint32Array ? args?.[1] : new Uint32Array(),
    )
  }
  else if (shape === 'heightfield') {
    safeArgs.push(
      typeof args?.[0] === 'number' ? args?.[0] : 1,
      typeof args?.[1] === 'number' ? args?.[1] : 1,
      args?.[2] instanceof Float32Array ? args?.[2] : new Float32Array(),
      isVector3Like(args?.[3]) ? args?.[3] : { x: 0, y: 0, z: 0 },
    )
    if (args?.[4] in HeightFieldFlags) {
      safeArgs.push(args?.[4])
    }
  }
  else {
    safeArgs.push(
      typeof args?.[0] === 'number' ? args?.[0] : 0.5,
      typeof args?.[1] === 'number' ? args?.[1] : 0.5,
      typeof args?.[2] === 'number' ? args?.[2] : 0.5,
      typeof args?.[3] === 'number' ? args?.[3] : 0.5,
    )
  }

  colliderInfos.value.collider.setShape(
    (colliderDesc(...safeArgs as [any, any, any, any, any]))?.shape ?? ColliderDesc.cuboid(1, 1, 1).shape,
  )
}

defineExpose({
  instance,
  colliderDesc,
  object: colliderGroup,
} satisfies { [K in keyof ExposedCollider]: ShallowRef<ExposedCollider[K] | undefined> })

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
watch(() => props.shape, (value) => {
  updateShapeArgs(value, props.args)
})
watch(() => props.args, (value) => {
  updateShapeArgs(props.shape, value)
})
watch(() => props.position, (value) => {
  if (!colliderInfos.value?.collider) { return }
  colliderInfos.value.collider.setTranslation({
    x: typeof value?.[0] === 'number' ? value?.[0] : 0,
    y: typeof value?.[1] === 'number' ? value?.[1] : 0,
    z: typeof value?.[2] === 'number' ? value?.[2] : 0,
  })
})
watch(() => props.rotation, (value) => {
  if (!colliderInfos.value?.collider) { return }
  colliderInfos.value.collider.setRotation({
    x: typeof value?.[0] === 'number' ? value?.[0] : 0,
    y: typeof value?.[1] === 'number' ? value?.[1] : 0,
    z: typeof value?.[2] === 'number' ? value?.[2] : 0,
    w: typeof value?.[3] === 'number' ? value?.[3] : 1,
  })
})
watch(() => props.solverGroups, value => colliderInfos.value?.collider.setSolverGroups(value ?? 0))
watch([() => props.collisionGroups, colliderInfos], ([_collisionGroups, _]) => {
  if (!colliderInfos.value?.collider || !_collisionGroups) { return }
  colliderInfos.value.collider.setCollisionGroups(_collisionGroups)
})
watch([
  () => props.activeCollision,
  () => props.activeContactForce,
  colliderInfos,
], ([activeCollision, activeContactForce]) => {
  if (!colliderInfos.value?.collider) { return }

  let flags = ActiveEvents.NONE
  if (activeCollision) { flags |= ActiveEvents.COLLISION_EVENTS }
  if (activeContactForce) { flags |= ActiveEvents.CONTACT_FORCE_EVENTS }

  colliderInfos.value.collider.setActiveEvents(flags)
})
watch([() => props.contactForceEventThreshold, colliderInfos], ([threshold]) => {
  if (!colliderInfos.value?.collider || threshold === undefined) { return }
  colliderInfos.value.collider.setContactForceEventThreshold(threshold)
})
makePropsWatcherCL(
  props,
  [
    'friction',
    'restitution',
    'density',
    'mass',
    'activeCollisionTypes',
    'sensor',
  ],
  colliderInfos,
)
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
