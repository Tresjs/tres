<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: TresObject
}>()

const { nodes } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/cloud.gltf')

watch(nodes, (nodes) => {
  console.log(nodes)
})

const cloud = computed(() => nodes.value.Low_Poly_Cloud)
const cloudRef = shallowRef<TresObject>()

// create a function to return a random number between two values with random sign
function random(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min
  return Math.random() < 0.5 ? -randomNumber : randomNumber
}

watch(cloud, (cloud) => {
  if (!cloud) return
  cloud.castShadow = true
  cloud.position.set(random(-8, 8), random(0.5, 1), random(-8, 8))
  const size = random(0.5, 1)
  cloud.scale.set(size, size, size)
  cloud.updateMatrixWorld()
})



watch(
  () => props.planet,
  (planet) => {
    if (!cloudRef.value) return
    cloudRef.value.lookAt(planet.position)
    cloudRef.value.updateMatrixWorld()
  },
)

const { onBeforeRender } = useLoop()

let angle = random(-1, 1) * Math.PI
const speed = Math.random() / 10


onBeforeRender(({ delta }) => {
  if (!cloudRef.value || !props.planet) return

  const radius = Math.abs(props.planet.geometry.boundingSphere.radius)
  angle += delta * speed
  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  cloudRef.value.position.x = x
  cloudRef.value.position.z = z
  cloudRef.value.rotation.y = -angle
  cloudRef.value.lookAt(props.planet.position)
  cloudRef.value.updateMatrixWorld()
})
</script>

<template>
  <primitive v-if="cloud" ref="cloudRef" :object="cloud" cast-shadow />
</template>
