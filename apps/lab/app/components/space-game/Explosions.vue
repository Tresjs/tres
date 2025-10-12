<script setup lang="ts">
import { inject, shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Vector3 } from 'three'
import { Matrix4 } from 'three'
import type { GameStore } from './GameStore'

const instancedMeshesRef = shallowRef()
const gameStore = inject('gameStore') as GameStore
const dummy = gameStore.mutation.dummy

export interface ExplosionData {
  time: number
  particles: { position: Vector3; dPos: Vector3 }[]
  offset: Vector3
  color: string
}

function updateExplosions() {
  if (!Array.isArray(instancedMeshesRef.value)) { return }

  dummy.scale.set(1, 1, 1)
  dummy.rotation.set(0, 0, 0)
  const m = new Matrix4()
  let i = 0
  for (const instancedMesh of instancedMeshesRef.value) {
    const explosion = gameStore.explosions[i]
    if (explosion) {
      explosion.particles.forEach((particle, ii) => {
        (particle.position as Vector3).add(particle.dPos)
        dummy.position.copy(particle.position)
        dummy.updateMatrix()
        instancedMesh.setMatrixAt(ii, dummy.matrix)
        if (ii === 0 && i === 0) {
          instancedMesh.getMatrixAt(ii, m)
        }
        instancedMesh.instanceMatrix.needsUpdate = true
      })
      instancedMesh.material.opacity = Math.max(0, instancedMesh.material.opacity - 0.025)
      i++
    }
  }
}

const { onBeforeRender } = useLoop()
onBeforeRender(updateExplosions)
</script>

<template>
  <TresInstancedMesh v-for="explosion, i of gameStore.explosions" ref="instancedMeshesRef" :key="i"
    :args="[undefined, undefined, explosion.particles.length]" :position="explosion.offset" :frustum-culled="false"
    :scale="2">
    <TresDodecahedronGeometry :args="[10, 0]" />
    <TresMeshBasicMaterial :color="explosion.color" :transparent="true" :opacity="1" :fog="false" />
  </TresInstancedMesh>
</template>