<script lang="ts" setup>
import { type ImpulseJoint, type JointAxesMask, type JointData, Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { onUnmounted, onUpdated, shallowRef } from 'vue'

import { useRapier } from '../../composables'
import type { JointProps, QuaternionArray, VectorArray } from '../../types'

const {
  type = 'fixed',
  bodies,
  params = [
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
  ],
  wakeUpOnChanges = true,
} = defineProps<JointProps>()
const { world, rapier } = useRapier()

const joints = shallowRef<ImpulseJoint>()

const dispose = () => {
  if (joints.value) {
    world.value.removeImpulseJoint(joints.value, wakeUpOnChanges)
    joints.value = undefined
  }
}

const setup = (bodies: JointProps['bodies'], params: JointProps['params']) => {
  dispose()

  if (
    !(bodies?.[0] instanceof rapier.value.RigidBody)
    || !(bodies?.[1] instanceof rapier.value.RigidBody)
    || !Array.isArray(params)
  ) {
    return
  }

  let jointParams: JointData | undefined
  let hasErrMsg: string | undefined

  if (
    type === 'fixed'
    && params.length >= 4
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 4)
    && (Array.isArray(params[2]) && params[2].length >= 3)
    && (Array.isArray(params[3]) && params[3].length >= 4)
  ) {
    jointParams = rapier.value.JointData.fixed(
      new Vector3(...params[0] as VectorArray),
      new Quaternion(...params[1] as QuaternionArray),
      new Vector3(...params[2] as VectorArray),
      new Quaternion(...params[3] as QuaternionArray),
    )
  }
  else if (type === 'fixed') {
    hasErrMsg = `Invalid ${type} joint parameters. Expected 4 arrays with at least 3 numbers.`
  }

  if (
    type === 'generic'
    && params.length >= 3
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 3)
    && typeof params[3] === 'number'
  ) {
    jointParams = rapier.value.JointData.generic(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
      new Vector3(...params[2] as VectorArray),
      params[3] as JointAxesMask,
    )
  }
  else if (type === 'generic') {
    hasErrMsg = `Invalid ${type} joint parameters. Expected 3 arrays with at least 3 numbers.`
  }

  if (
    type === 'prismatic'
    && params.length >= 4
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 3)
  ) {
    jointParams = rapier.value.JointData.prismatic(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
      new Vector3(...params[1] as VectorArray),
    )
  }
  else if (type === 'prismatic') {
    hasErrMsg = `'Invalid ${type} joint parameters. Expected 3 arrays with at least 3 numbers.`
  }

  if (
    type === 'revolute'
    && params.length >= 3
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 3)
  ) {
    jointParams = rapier.value.JointData.revolute(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
      new Vector3(...params[2] as VectorArray),
    )
  }
  else if (type === 'revolute') {
    hasErrMsg = `Invalid ${type} joint parameters. Expected 3 arrays with at least 3 numbers.`
  }

  if (
    type === 'rope'
    && params.length >= 3
    && typeof params[0] === 'number'
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 4)
  ) {
    jointParams = rapier.value.JointData.rope(
      params[0],
      new Vector3(...params[1] as VectorArray),
      new Quaternion(...params[2] as QuaternionArray),
    )
  }
  else if (type === 'rope') {
    hasErrMsg = `Invalid ${type} joint parameters. Expected a number, an array with at least 3 numbers, and an array with at least 4 numbers.`
  }

  if (
    type === 'spherical'
    && params.length >= 2
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
  ) {
    jointParams = rapier.value.JointData.spherical(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
    )
  }
  else if (type === 'spherical') {
    hasErrMsg = `Invalid ${type} joint parameters. Expected 2 arrays with at least 3 numbers.`
  }

  if (
    type === 'spring'
    && params.length >= 5
    && typeof params[0] === 'number'
    && typeof params[1] === 'number'
    && typeof params[2] === 'number'
    && (Array.isArray(params[3]) && params[3].length >= 3)
    && (Array.isArray(params[4]) && params[4].length >= 3)
  ) {
    jointParams = rapier.value.JointData.spring(
      params[0],
      params[1],
      params[2],
      new Vector3(...params[3] as VectorArray),
      new Vector3(...params[4] as VectorArray),
    )
  }
  else if (type === 'spring') {
    hasErrMsg = `Invalid ${type} joint parameters. Expected 5 parameters: 3 numbers and 2 arrays with at least 3 numbers.`
  }

  if (hasErrMsg) {
    throw new Error(`🚧 An error occurred while creating the joint: ${hasErrMsg}`)
  }

  if (!jointParams) {
    throw new Error(`Unsupported joint type. If you think this is a bug or the "${type}" type should be implemented, please open an issue.`)
  }

  joints.value = world.value.createImpulseJoint(jointParams, bodies[0], bodies[1], wakeUpOnChanges)
}

onUpdated(() => setup(bodies, params))

onUnmounted(() => {
  dispose()
})

defineExpose({
  joints,
})
</script>

<template>
  <slot v-once></slot>
</template>
