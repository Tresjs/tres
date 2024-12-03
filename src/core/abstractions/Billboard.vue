<script setup lang="ts">
import type { Camera } from 'three'
import { Euler, Group, Quaternion } from 'three'
import { shallowRef } from 'vue'
import { useLoop, useTres } from '@tresjs/core'

export interface BillboardProps {
  /**
   * Whether the Billboard should face the camera automatically on every frame.
   */
  autoUpdate?: boolean
  /**
   * Whether to lock the x-axis.
   */
  lockX?: boolean
  /**
   * Whether to lock the y-axis.
   */
  lockY?: boolean
  /**
   * Whether to lock the z-axis.
   */
  lockZ?: boolean
}

const props = withDefaults(defineProps<BillboardProps>(), {
  autoUpdate: true,
  lockX: false,
  lockY: false,
  lockZ: false,
})

const outerRef = shallowRef(new Group())
const innerRef = shallowRef(new Group())
const q = new Quaternion()
const r = new Euler()

function update(camera?: Camera) {
  if (!outerRef.value) { return }

  if (!camera) {
    const t = useTres()
    camera = t.camera.value
    if (!camera) { return }
  }

  // NOTE: Save current rotation in case we're locking an axis
  innerRef.value.rotation.copy(r)

  // NOTE: Face the camera
  outerRef.value.updateMatrix()
  outerRef.value.updateWorldMatrix(false, false)
  outerRef.value.getWorldQuaternion(q)
  camera.getWorldQuaternion(innerRef.value.quaternion).premultiply(q.invert())

  // NOTE: Overwrite locked axes
  if (props.lockX) { innerRef.value.rotation.x = r.x }
  if (props.lockY) { innerRef.value.rotation.y = r.y }
  if (props.lockZ) { innerRef.value.rotation.z = r.z }
}

useLoop().onBeforeRender(({ camera }) => {
  if (props.autoUpdate) { update(camera) }
})

defineExpose({ instance: outerRef, update })
</script>

<template>
  <TresGroup ref="outerRef">
    <TresGroup ref="innerRef">
      <slot></slot>
    </TresGroup>
  </TresGroup>
</template>
