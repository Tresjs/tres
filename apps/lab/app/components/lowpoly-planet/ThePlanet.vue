<script setup lang="ts">
import { Mesh } from 'three'

const { nodes } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/planet.gltf',
)

const planet = computed(() => nodes.value.Planet)

watch(planet, (planet: TresObject) => {
  planet.traverse((child: TresObject) => {
    if (child instanceof Mesh) {
      child.receiveShadow = true
    }
  })
})

const { onBeforeRender } = useLoop()

const planetRef = shallowRef<TresObject>()
onBeforeRender(({ delta }) => {
  if (!planetRef.value) return
  const planet = planetRef.value
  planet.rotation.y += delta * 0.04
  planet.rotation.z += delta * 0.02
  planet.rotation.x += delta * 0.05
  planet.updateMatrixWorld()
})
const icosphere = computed(() => nodes.value.Icosphere)

watch(icosphere, (icosphere: TresObject) => {
  icosphere.geometry.computeBoundingSphere()
})

</script>

<template>
  <primitive v-if="planet" ref="planetRef" :object="planet" />
  <LowpolyPlanetAirplane v-if="icosphere" :planet="icosphere" />
  <LowpolyPlanetCloud v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="cloud" :planet="icosphere" />
</template>
