<script setup lang="ts">
import { degToRad } from 'three/src/math/MathUtils'
import { gsap } from 'gsap'

const meshesRef = shallowRef(null)
const shapesGroupRef = shallowRef(null)
const grid = reactive({ rows: 6, cols: 14, gutter: 2.2 })

const gridOffset = computed(() => {
  const x = ((grid.cols - 1) * grid.gutter) / 2
  const z = ((grid.rows - 1) * grid.gutter) / 2

  return { x, z }
})

const { seekAll } = useSeek()

watch(shapesGroupRef, () => {
  meshesRef.value = seekAll(shapesGroupRef.value, 'type', 'Mesh')

  meshesRef.value.forEach((mesh) => {
    mesh.initialRotation = {
      x: mesh.name === 'torus' ? degToRad(90) : mesh.rotation.x,
      y: mesh.rotation.y,
      z: mesh.name === 'cone' || mesh.name === 'cylinder' ? degToRad(-180) : mesh.rotation.z,
    }

    mesh.rotation.x = mesh.initialRotation.x
    mesh.rotation.y = mesh.initialRotation.y
    mesh.rotation.z = mesh.initialRotation.z
  })
})

const onPointerMove = ({ point }) => {
  if (!meshesRef.value) return

  const { x, y, z } = point

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
      x: map(mesh.position.y, -1, 1, degToRad(270), mesh.initialRotation.x),
      z: map(mesh.position.y, -1, 1, degToRad(-90), mesh.initialRotation.z),
      y: map(mesh.position.y, -1, 1, degToRad(45), mesh.initialRotation.y),
    })
  })

}

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

const map = (value, start1, stop1, start2, stop2) => (value - start1) / (stop1 - start1) * (stop2 - start2) + start2

const getShapeType = (row, col) => {
  const randomIndex = Math.floor(Math.random() * 3) // Generate a random number between 0 and 2

  // Assigning shape types based on the random index
  if (randomIndex === 0) return 'torus'
  if (randomIndex === 1) return 'cone'
  return 'cylinder'
}

const computePosition = (col, row) => [(col - 1) * grid.gutter - gridOffset.value.x, 0, (row - 1) * grid.gutter - gridOffset.value.z]
</script>

<template>
  <Plane
    receive-shadow
    :args="[100, 100]"
    :rotation-x="-Math.PI / 2"
    :position="[0, 0, 0]"
    @pointer-move="onPointerMove"
  >
    <TresShadowMaterial
      transparent
      :opacity=".3"
    />
  </Plane>

  <TresGroup
    ref="shapesGroupRef"
    name="shapes"
  >
    <TresGroup
      v-for="row in grid.rows"
      :key="`row-${row}`"
    >
      <TresGroup
        v-for="col in grid.cols"
        :key="`col-${col}-${row}`"
      >
        <!-- Torus Mesh -->
        <TresMesh
          v-if="getShapeType(row, col) === 'torus'"
          name="torus"
          cast-shadow
          receive-shadow
          :position="computePosition(col, row)"
        >
          <TresTorusGeometry :args="[.25, .08, 30, 200]" />
          <TresMeshPhysicalMaterial
            color="#3e2917"
            :metalness=".58"
            emissive="#000000"
            :roughness=".05"
          />
        </TresMesh>

        <!-- Cone -->
        <Cone
          v-else-if="getShapeType(row, col) === 'cone'"
          name="cone"
          :args="[.3, .5, 32]"
          cast-shadow
          receive-shadow
          :position="computePosition(col, row)"
        >
          <TresMeshPhysicalMaterial
            color="#3e2917"
            :metalness=".58"
            emissive="#000000"
            :roughness=".05"
          />
        </Cone>

        <!-- Cylinder Mesh -->
        <TresMesh
          v-else
          name="cylinder"
          cast-shadow
          receive-shadow
          :position="computePosition(col, row)"
        >
          <TresCylinderGeometry :args="[.3, .3, .2, 64]" />
          <TresMeshPhysicalMaterial
            color="#3e2917"
            :metalness=".58"
            emissive="#000000"
            :roughness=".05"
          />
        </TresMesh>
      </TresGroup>
    </TresGroup>
  </TresGroup>
</template>

<style></style>