<template>
  <Plane receive-shadow @pointer-move="onPointerMove" :args="[100, 100]" :rotation-x="- Math.PI / 2"
    :position="[0, 0, 0]">
    <TresShadowMaterial transparent :opacity=".3" />
  </Plane>

  <TresGroup ref="shapesGroupRef" name="shapes">
    <TresGroup v-for="row in grid.rows" :key="`row-${row}`">
      <TresGroup v-for="col in grid.cols" :key="`col-${col}-${row}`">
        <!-- Torus Mesh -->
        <TresMesh v-if="getShapeType(row, col) === 'torus'" name="torus" cast-shadow receive-shadow
          :position="computePosition(col, row)">
          <TresTorusGeometry :args="[.3, .12, 30, 200]" />
          <TresMeshPhysicalMaterial color="#3e2917" :metalness=".58" emissive="#000000" :roughness=".05" />
        </TresMesh>

        <!-- Cone -->
        <Cone v-else-if="getShapeType(row, col) === 'cone'" name="cone" :args="[.3, .5, 32]" cast-shadow receive-shadow
          :position="computePosition(col, row)">
          <TresMeshPhysicalMaterial color="#3e2917" :metalness=".58" emissive="#000000" :roughness=".05" />
        </Cone>

        <!-- Cylinder Mesh -->
        <TresMesh v-else name="cylinder" cast-shadow receive-shadow :position="computePosition(col, row)">
          <TresCylinderGeometry :args="[.25, .25, .75, 32]" />
          <TresMeshPhysicalMaterial color="#3e2917" :metalness=".58" emissive="#000000" :roughness=".05" />
        </TresMesh>
      </TresGroup>
    </TresGroup>

  </TresGroup>
</template>

<script setup lang="ts">
import { mapLinear, degToRad } from 'three/src/math/MathUtils'
import gsap from 'gsap'

const meshesRef = shallowRef(null)
const shapesGroupRef = shallowRef(null)
const grid = reactive({ rows: 5, cols: 11, gutter: 2.65 })

const gridOffset = computed(() => {
  const x = ((grid.cols - 1) * grid.gutter) / 2;
  const z = ((grid.rows - 1) * grid.gutter) / 2;

  return { x, z }
})

const { seekAll } = useSeek()

watch(shapesGroupRef, () => {
  meshesRef.value = seekAll(shapesGroupRef.value, 'type', 'Mesh')

  meshesRef.value.forEach(mesh => {
    mesh.initialRotation = {
      x: mesh.name === 'torus' ? degToRad(90) : mesh.rotation.x,
      y: mesh.rotation.y,
      z: mesh.name === 'cone' ? degToRad(-180) : mesh.rotation.z,
    };

    mesh.rotation.x = mesh.initialRotation.x
    mesh.rotation.y = mesh.initialRotation.y
    mesh.rotation.z = mesh.initialRotation.z
  })
})

const onPointerMove = ({ point }) => {
  if (!meshesRef.value) return

  const { x, y, z } = point

  meshesRef.value.forEach(mesh => {
    const mouseDistance = distance(x, z,
      mesh.position.x,
      mesh.position.z);

    const y = mapLinear(mouseDistance, 6, 0, 0, 10);

    gsap.to(mesh.position, { y: y < 1 ? 1 : y, duration: .3 });

    const scaleFactor = mesh.position.y / 2.5;
    const scale = scaleFactor < 1 ? 1 : scaleFactor;

    gsap.to(mesh.scale,
      {
        ease: "expo.Out",
        x: scale,
        y: scale,
        z: scale,
        duration: .3
      });


    gsap.to(mesh.rotation, {
      duration: .7,
      ease: "expo.Out",
      x: mapLinear(mesh.position.y, -1, degToRad(45), 1, mesh.initialRotation.x),
      z: mapLinear(mesh.position.y, -1, degToRad(-90), 1, mesh.initialRotation.y),
      y: mapLinear(mesh.position.y, -1, degToRad(90), 1, mesh.initialRotation.z),
    });
  })

}

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

const getShapeType = (row, col) => {
  const seed = (row + col) * row * col;
  const result = seed % 3; // Divide by 3 to obtain a remainder of 0, 1 or 2
  if (result === 0) return 'torus';
  if (result === 1) return 'cone';
  return 'cylinder'; // default
}

const computePosition = (col, row) => {
  return [(col - 1) * grid.gutter - gridOffset.value.x, 0, (row - 1) * grid.gutter - gridOffset.value.z];
}
</script>

<style></style>