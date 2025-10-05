<script setup lang="ts">
import { Mesh } from 'three';
import { watch } from 'vue'

const props = defineProps<{
  planet: TresObject
}>()

const { nodes } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/airplane.gltf',
)


const airplane = computed(() => nodes.value.Low_Poly_Airplane)

watch(airplane, (airplane) => {
  if (!airplane) return
  airplane.rotation.set(0, Math.PI, 0)
  airplane.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
    }
  })
  airplane.updateMatrixWorld()
})


watch(
  () => props.planet,
  (planet) => {
    if (!planet || !airplane.value) return
    const radius = Math.abs(planet.geometry.boundingSphere?.radius | 1)
    airplane.value.position.set(radius, 0, 0)

    airplane.value.lookAt(planet.position)
  },
)

let angle = 0
const speed = 0.2

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (!airplane.value || !props.planet) return
  const radius = Math.abs(props.planet.geometry.boundingSphere.radius) + 0.5
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  airplane.value.position.x = x
  airplane.value.position.z = z
  airplane.value.rotation.z = -Math.PI / 2
  airplane.value.rotation.y = -angle
  airplane.value.updateMatrixWorld()
})
</script>

<template>
  <primitive v-if="airplane" ref="airplaneRef" :object="airplane" />
</template>
