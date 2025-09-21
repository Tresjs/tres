<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import type { PerspectiveCamera } from 'three'
import { Group } from 'three'
import { inject, shallowRef } from 'vue'
import type { GameStore } from './GameStore'

let offset = 0

const groupRef = shallowRef(new Group())
const rig = shallowRef(new Group())
const { mutation } = inject('gameStore') as GameStore
const { fov, scale, binormal, normal, track, mouse } = mutation

const { onBeforeRender } = useLoop()

onBeforeRender(({ camera }) => {
  if (!camera.value) { return }
  const t = mutation.t
  const pos = mutation.position.clone()
  const segments = track.tangents.length
  const pickt = t * segments
  const pick = Math.floor(pickt)
  const pickNext = (pick + 1) % segments
  binormal.subVectors(track.binormals[pickNext], track.binormals[pick])
  binormal.multiplyScalar(pickt - pick).add(track.binormals[pick])
  const dir = track.parameters.path.getTangentAt(t)
  offset += (Math.max(15, 15 + -mouse.y / 20) - offset) * 0.05
  normal.copy(binormal).cross(dir)
  pos.add(normal.clone().multiplyScalar(offset))
  camera.value.position.copy(pos)
  const lookAt = track.parameters.path.getPointAt((t + 30 / track.parameters.path.getLength()) % 1).multiplyScalar(scale)
  camera.value.matrix.lookAt(camera.value.position, lookAt, normal)
  camera.value.quaternion.setFromRotationMatrix(camera.value.matrix);
  (camera.value as PerspectiveCamera).fov += ((t > 0.4 && t < 0.45 ? 120 : fov) - (camera.value as PerspectiveCamera).fov) * 0.05;
  (camera.value as PerspectiveCamera).updateProjectionMatrix()
  const lightPos = track.parameters.path.getPointAt((t + 1 / track.parameters.path.getLength()) % 1).multiplyScalar(scale)
  groupRef.value.position.copy(lightPos)
  groupRef.value.quaternion.setFromRotationMatrix(camera.value.matrix)
})
</script>

<template>
  <TresGroup ref="groupRef">
    <TresDirectionalLight :intensity="1" color="indianred" />
    <TresGroup ref="rig" :position="[0, 0, -50]">
      <slot />
    </TresGroup>
  </TresGroup>
</template>