<script setup lang="ts">
import type { Group } from 'three'
import { InstancedMesh, MeshPhongMaterial, Vector3, Object3D } from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'
import { useMouse } from '@vueuse/core'

const groupRef = ref<Group>()

const gltf = await useGLTF('/models/brickelangelo/david.glb')

const david = gltf.nodes.David

const { x, y } = useMouse()

watch([x, y], () => {
  if (!groupRef.value) return
  groupRef.value.rotation.y = -x.value * 0.0001
})

const { nodes: brickNodes } = await useGLTF('/models/brickelangelo/brick.glb')

const brick = brickNodes.LegoPiece

const brickMaterial = new MeshPhongMaterial({ color: 'lightgray' })
const brickInstancedMesh = new InstancedMesh(brick.geometry, brickMaterial, instanceCount)

useControls('fpsgraph')

const sampler = new MeshSurfaceSampler(david)
  .setWeightAttribute('uv') // Use UVs to weight the sampling
  .build()

const instanceCount = 75000 // or whatever count you want
const dummy = new Object3D()
const brickSize = 0.03 // Define according to the size of your brick piece

for (let i = 0; i < instanceCount; i++) {
  const sampledPoint = new Vector3()
  sampler.sample(sampledPoint)

  const alignedPoint = new Vector3(
    Math.round(sampledPoint.x / brickSize) * brickSize,
    Math.round(sampledPoint.y / brickSize) * brickSize,
    Math.round(sampledPoint.z / brickSize) * brickSize,
  )

  dummy.position.copy(alignedPoint)
  dummy.scale.set(brickSize, brickSize, brickSize)
  dummy.updateMatrix()
  brickInstancedMesh.setMatrixAt(i, dummy.matrix)
}

brickInstancedMesh.instanceMatrix.needsUpdate = true
</script>

<template>
  <TresGroup ref="groupRef">
    <primitive :object="brickInstancedMesh" />
  </TresGroup>
  <!-- <primitive :object="david" /> -->
</template>
