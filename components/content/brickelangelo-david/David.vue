<script setup lang="ts">
import type { Group } from 'three'
import { InstancedMesh, MeshPhongMaterial, Raycaster, Vector3, Object3D } from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'
import { useMouse } from '@vueuse/core'

const groupRef = ref<Group>()

const gltf = await useGLTF('/models/legolangelo/david.glb')

const david = gltf.nodes.David

const { x, y } = useMouse()

watch([x, y], () => {
  if (!groupRef.value) return
  groupRef.value.rotation.y = -x.value * 0.0001
})

const { nodes: legoNodes } = await useGLTF('/models/legolangelo/lego.glb')

const lego = legoNodes.LegoPiece

const legoMaterial = new MeshPhongMaterial({ color: 'lightgray' })
const legoInstancedMesh = new InstancedMesh(lego.geometry, legoMaterial, instanceCount)

useControls('fpsgraph')

const sampler = new MeshSurfaceSampler(david)
  .setWeightAttribute('uv') // Use UVs to weight the sampling
  .build()

const instanceCount = 75000 // or whatever count you want
const dummy = new Object3D()
const legoSize = 0.03 // Define according to the size of your LEGO piece

for (let i = 0; i < instanceCount; i++) {
  const sampledPoint = new Vector3()
  sampler.sample(sampledPoint)

  const alignedPoint = new Vector3(
    Math.round(sampledPoint.x / legoSize) * legoSize,
    Math.round(sampledPoint.y / legoSize) * legoSize,
    Math.round(sampledPoint.z / legoSize) * legoSize,
  )

  dummy.position.copy(alignedPoint)
  dummy.scale.set(legoSize, legoSize, legoSize)
  dummy.updateMatrix()
  legoInstancedMesh.setMatrixAt(i, dummy.matrix)
}

legoInstancedMesh.instanceMatrix.needsUpdate = true
</script>

<template>
  <TresGroup ref="groupRef">
    <primitive :object="legoInstancedMesh" />
  </TresGroup>
  <!-- <primitive :object="david" /> -->
</template>
