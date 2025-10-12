<script setup lang="ts">
import { Color, MeshStandardMaterial } from 'three'

const { state, nodes } = useGLTF('/models/halloween/halloween-decoration.glb', { draco: true })


watch(nodes, (newState) => {
  console.log(newState)
})

const flames = computed(() => Object.values(nodes.value ?? {}).filter((node) => node.name.includes('Flame')) ?? [])

watch(flames, (newFlames) => {
  console.log(newFlames)
})

const flameMaterial = new MeshStandardMaterial({
  color: new Color('#FF3F00'),
  emissive: new Color('#FF3F00'),
})

watch(flames, (newFlames) => {
  newFlames.forEach((flame) => {
    flame.material = flameMaterial
  })
})

const flameOffsets = computed(() => flames.value.map(() => Math.random() * 2 * Math.PI))
const flameSpeeds = computed(() => flames.value.map(() => Math.random() * 0.2 + 0.9)) // Random speeds between 0.9 and 1.1
const flameRandoms = computed(() => flames.value.map(() => Math.random() * Math.PI)) // Additional randomness

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  flames.value.forEach((flame, index) => {
    const timeFactor = elapsed * (flameSpeeds.value[index] ?? 0)

    const pseudoRandom
      = 0.25 * Math.sin(timeFactor + (flameRandoms.value[index] ?? 0))
      * Math.cos(timeFactor * 2 + (flameRandoms.value[index] ?? 0))

    let intensity = (Math.cos(timeFactor + (flameOffsets.value[index] ?? 0)) + pseudoRandom) * 70 + 80
    intensity = Math.max(intensity, 100) // Ensuring a minimum intensity so it doesn't go completely black

    // Calculate opacity based on intensity. This maps the intensity range [50, 150] to the opacity range [0.5, 1].
    const opacity = 0.5 + 0.005 * (intensity - 50)

    flame.material.emissiveIntensity = intensity
    flame.material.opacity = opacity
    flame?.rotateY(0.02)
  })
})

/* const flames = computed(() => nodes.value.filter((node) => node.name.includes('Flame')))

const flameMaterial = new MeshStandardMaterial({
  color: new Color('#FF3F00'),
  emissive: new Color('#FF3F00'),
})

watch(flames, (newFlames) => {
  newFlames.forEach((flame) => {
    flame.material = flameMaterial
  })
}) */

/* const flameOffsets = computed(() => flames.value.map(() => Math.random() * 2 * Math.PI))
const flameSpeeds = computed(() => flames.value.map(() => Math.random() * 0.2 + 0.9)) // Random speeds between 0.9 and 1.1
const flameRandoms = computed(() => flames.value.map(() => Math.random() * Math.PI)) // Additional randomness

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  flames.value.forEach((flame, index) => {
    const timeFactor = elapsed * flameSpeeds.value[index]

    const pseudoRandom
      = 0.25 * Math.sin(timeFactor + flameRandoms.value[index])
      * Math.cos(timeFactor * 2 + flameRandoms.value[index])

    let intensity = (Math.cos(timeFactor + flameOffsets.value[index]) + pseudoRandom) * 70 + 80
    intensity = Math.max(intensity, 100) // Ensuring a minimum intensity so it doesn't go completely black

    // Calculate opacity based on intensity. This maps the intensity range [50, 150] to the opacity range [0.5, 1].
    const opacity = 0.5 + 0.005 * (intensity - 50)

    flame.material.emissiveIntensity = intensity
    flame.material.opacity = opacity
    flame?.rotateY(0.02)
  })
}) */
</script>

<template>
  <primitive v-if="state" :object="state.scene" />
</template>