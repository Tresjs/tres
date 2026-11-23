<script setup lang="ts">
import {
  ActiveCollisionTypes,
  RigidBodyType as RapierRigidBodyType,
} from '@dimforge/rapier3d-compat'
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
import { bodyContextInjectionKey, createRigidBody, createRigidBodyAutoColliderPropsFromObject } from '../core'
import { hasValidColliderGeometry } from '../utils'
import { makeAutoColliderPropsWatchers, makePropsWatcherRB } from '../utils/props'
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
  enabledRotations: undefined,
  enabledTranslations: undefined,

  // Auto-generated colliders props
  activeContactForce: false,
  contactForceEventThreshold: 0,
  friction: 0.5,
  mass: 1,
  restitution: 0,
  density: 1,
  activeCollision: false,
  activeCollisionTypes: ActiveCollisionTypes.DEFAULT,
  collisionGroups: undefined,
  solverGroups: undefined,
  sensor: false,
})

const { onBeforeRender } = useLoop()
const { world } = useRapierContext()

const bodyGroup = shallowRef<RigidBodyContext['group']>()
const bodyContext = shallowRef<RigidBodyContext>()
const instance = shallowRef<RigidBodyContext['rigidBody']>()
const instanceDesc = shallowRef<RigidBodyContext['rigidBodyDesc']>()
const autoColliderProps = shallowRef<ColliderProps[]>([])

provide(bodyContextInjectionKey, bodyContext)

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

      const createdProps = createRigidBodyAutoColliderPropsFromObject(
        child,
        props.collider,
        newPhysicsState.rigidBody,
      )
      collidersProps.push({ ...props, ...createdProps })
    }

    autoColliderProps.value = collidersProps
  }

  instance.value = newPhysicsState.rigidBody
  instanceDesc.value = newPhysicsState.rigidBodyDesc
  bodyContext.value = newPhysicsState
}, { once: true })

// reactively set autoColliderProps
const setAutoColliderProp = <K extends keyof ColliderProps>(prop: K, value: ColliderProps[K]) => {
  if (autoColliderProps.value.length === 0 || props.collider === false) { return }
  autoColliderProps.value = autoColliderProps.value.map(p => ({ ...p, [prop]: value }))
}

// Watchers for RigidBody props
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

watch([() => props.type, instance], ([value]) => {
  const capitalizeString = <T extends string = string>(str: T): Capitalize<T> => {
    return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>
  }

  if (!instance.value) { return }
  instance.value.setBodyType(RapierRigidBodyType[
    value === 'kinematic'
      ? 'KinematicPositionBased'
      : value === 'kinematicVelocity'
        ? 'KinematicVelocityBased'
        : capitalizeString(value)
  ], true)
})
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

// Watchers for autoColliderProps
watch(() => props.collider, (value) => {
  if (value === false) {
    autoColliderProps.value = []
    return
  }
  setAutoColliderProp('shape', value)
})
makeAutoColliderPropsWatchers(props, [
  'friction',
  'mass',
  'restitution',
  'density',
  'activeCollision',
  'activeCollisionTypes',
  'collisionGroups',
  'solverGroups',
  'sensor',
  'activeContactForce',
  'contactForceEventThreshold',
], setAutoColliderProp)

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

  world.value.removeRigidBody(bodyContext.value.rigidBody)

  bodyContext.value = undefined
})
</script>

<template>
  <TresGroup ref="bodyGroup">
    <Collider
      v-for="(_props, idx) in autoColliderProps"
      :key="_props.object?.uuid ?? idx"
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
      :solverGroups="_props.solverGroups"
      :sensor="_props.sensor"
      :activeContactForce="_props.activeContactForce"
      :contactForceEventThreshold="_props.contactForceEventThreshold"
    />
    <slot></slot>
  </TresGroup>
</template>
