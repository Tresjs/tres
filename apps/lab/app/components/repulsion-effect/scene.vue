<script setup lang="ts">
import type { Group, Mesh } from 'three';
import { ConeGeometry, CylinderGeometry, MathUtils, MeshPhysicalMaterial, TorusGeometry } from 'three'
import { gsap } from 'gsap'

const { degToRad } = MathUtils

const meshesRef = shallowRef<Mesh[]>([])
const shapesGroupRef = shallowRef<Group>(null)
const grid = reactive({ rows: 6, cols: 14, gutter: 2.2 })

const gridOffset = computed(() => {
  const x = ((grid.cols - 1) * grid.gutter) / 2
  const z = ((grid.rows - 1) * grid.gutter) / 2

  return { x, z }
})


watch(shapesGroupRef, () => {
  meshesRef.value = shapesGroupRef.value?.children
    .flatMap(child => child.children)
    .flatMap(child => child.children)
    .filter(child => child.type === 'Mesh') as Mesh[]

  meshesRef.value.forEach((mesh) => {
    mesh.userData.initialRotation = {
      x: mesh.name === 'torus' ? degToRad(90) : mesh.rotation.x,
      y: mesh.rotation.y,
      z: mesh.name === 'cone' || mesh.name === 'cylinder' ? degToRad(-180) : mesh.rotation.z,
    }

    mesh.rotation.x = mesh.userData.initialRotation.x
    mesh.rotation.y = mesh.userData.initialRotation.y
    mesh.rotation.z = mesh.userData.initialRotation.z
  })
})

const onPointerMove = ({ point }) => {
  if (!meshesRef.value) return

  const { x, z } = point

  meshesRef.value.forEach((mesh) => {
    const mouseDistance = distance(x, z,
      mesh.position.x,
      mesh.position.z)

    const y = map(mouseDistance, 7, 0, 0, 6)

    gsap.to(mesh.position, { y: y < 1 ? 1 : y, duration: .3 })

    const scaleFactor = mesh.position.y / 1.2
    const scale = scaleFactor < 1 ? 1 : scaleFactor

    gsap.to(mesh.scale,
      {
        ease: 'expo.out',
        x: scale,
        y: scale,
        z: scale,
        duration: .3,
      })

    gsap.to(mesh.rotation, {
      duration: .7,
      ease: 'expo.out',
      x: map(mesh.position.y, -1, 1, degToRad(270), mesh.userData.initialRotation.x),
      z: map(mesh.position.y, -1, 1, degToRad(-90), mesh.userData.initialRotation.z),
      y: map(mesh.position.y, -1, 1, degToRad(45), mesh.userData.initialRotation.y),
    })
  })

}

const distance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

const map = (value: number, start1: number, stop1: number, start2: number, stop2: number) => (value - start1) / (stop1 - start1) * (stop2 - start2) + start2

const getShapeType = () => {
  const randomIndex = Math.floor(Math.random() * 3) // Generate a random number between 0 and 2

  // Assigning shape types based on the random index
  if (randomIndex === 0) return 'torus'
  if (randomIndex === 1) return 'cone'
  return 'cylinder'
}

const computePosition = (col: number, row: number) => [(col - 1) * grid.gutter - gridOffset.value.x, 0, (row - 1) * grid.gutter - gridOffset.value.z]


const geometryMap = {
  torus: new ConeGeometry(0.3, 0.5, 32),
  cone: new CylinderGeometry(0.3, 0.3, 0.2, 64),
  cylinder: new TorusGeometry(0.25, 0.08, 30, 200)

} as const

const chocolateMaterial = new MeshPhysicalMaterial({
  color: '#3e2917',
  metalness: 0.58,
  emissive: '#000000',
  roughness: 0.05,
})
</script>

<template>
  <Plane receive-shadow :args="[100, 100]" :rotation-x="-Math.PI / 2" :position="[0, 0, 0]"
    @pointermove="onPointerMove">
    <TresShadowMaterial transparent :opacity=".3" />
  </Plane>

  <TresGroup ref="shapesGroupRef" name="shapes">
    <TresGroup v-for="row in grid.rows" :key="`row-${row}`">
      <TresGroup v-for="col in grid.cols" :key="`col-${col}-${row}`">
        <TresMesh :geometry="geometryMap[getShapeType()]" :material="chocolateMaterial"
          :position="computePosition(col, row)" />
      </TresGroup>
    </TresGroup>
  </TresGroup>
</template>

<style></style>