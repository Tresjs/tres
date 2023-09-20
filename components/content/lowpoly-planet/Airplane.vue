<script setup lang="ts">
import type { Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/airplane.gltf',
)

const airplaneRef = shallowRef()

const airplane = scene
airplane.rotation.set(0, Math.PI, 0)
scene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true
  }
})
airplane.updateMatrixWorld()

const { onLoop } = useRenderLoop()

watch(
  () => props.planet,
  (planet) => {
    if (!planet) return
    planet.geometry.computeBoundingSphere()
    const radius = Math.abs(planet.geometry.boundingSphere?.radius | 1)
    airplane.position.set(radius, 0, 0)

    airplane.lookAt(planet.position)
  },
)

let angle = 0
const speed = 0.2
onLoop(({ delta }) => {
  if (!airplane || !props.planet) return

  const radius = Math.abs(props.planet.geometry.boundingSphere.radius) + 0.5
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  airplane.position.x = x
  airplane.position.z = z
  airplane.rotation.z = -Math.PI / 2
  airplane.rotation.y = -angle
  airplane.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="airplane" />
</template>
