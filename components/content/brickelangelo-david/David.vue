<script setup lang="ts">
import type { Group } from 'three'
import { InstancedMesh, MeshPhongMaterial, Raycaster, Vector3, Object3D } from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'
import { useMouse } from '@vueuse/core'

const groupRef = ref<Group>()

const gltf = await useGLTF('/models/legolangelo/david.glb')
console.log(gltf)

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

/* function pointInsideDavidMesh(point) {
  const raycaster = new Raycaster()
  const direction = new Vector3(1, 0, 0) // Arbitrary direction
  const origin = point.clone()
  raycaster.set(origin, direction)

  const intersects = raycaster.intersectObject(david)

  return intersects.length % 2 === 1
}

const dummy = new Object3D()
let instanceIndex = 0

david.geometry.computeBoundingBox()
const boundingBox = david.geometry.boundingBox
const legoSize = 1 // Adjust the size of the lego piece

console.log(boundingBox)

for (let x = boundingBox.min.x; x < boundingBox.max.x; x += legoSize) {
  for (let y = boundingBox.min.y; y < boundingBox.max.y; y += legoSize) {
    for (let z = boundingBox.min.z; z < boundingBox.max.z; z += legoSize) {
      const point = new Vector3(x, y, z)
      if (pointInsideDavidMesh(point)) {
        dummy.position.copy(point)
        dummy.updateMatrix()
        legoInstancedMesh.setMatrixAt(instanceIndex++, dummy.matrix)
      }
    }
  }
}

legoInstancedMesh.instanceMatrix.needsUpdate = true */

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
