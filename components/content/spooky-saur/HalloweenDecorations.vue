<script setup lang="ts">
import { Color, MeshStandardMaterial } from 'three'

const { scene } = await useGLTF('/models/halloween/halloween-decoration.glb', { draco: true })
scene.traverse((child: TresObject) => {
  if (child.isMesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
})

const { seekByName } = useSeek()
const flames = [seekByName(scene, 'Flame'), seekByName(scene, 'Flame001'), seekByName(scene, 'Flame002')]

flames.forEach((flame) => {
  flame.material = new MeshStandardMaterial({
    color: new Color('#FF3F00'),
    emissive: new Color('#FF3F00'),
  })
})

const flameOffsets = flames.map(() => Math.random() * 2 * Math.PI)
const flameSpeeds = flames.map(() => Math.random() * 0.2 + 0.9) // Random speeds between 0.9 and 1.1
const flameRandoms = flames.map(() => Math.random() * Math.PI) // Additional randomness

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  flames.forEach((flame, index) => {
    const timeFactor = elapsed * flameSpeeds[index]
    
    const pseudoRandom 
      = 0.25 * Math.sin(timeFactor + flameRandoms[index]) 
      * Math.cos(timeFactor * 2 + flameRandoms[index])
      
    let intensity = (Math.cos(timeFactor + flameOffsets[index]) + pseudoRandom) * 70 + 80
    intensity = Math.max(intensity, 100) // Ensuring a minimum intensity so it doesn't go completely black

    // Calculate opacity based on intensity. This maps the intensity range [50, 150] to the opacity range [0.5, 1].
    const opacity = 0.5 + 0.005 * (intensity - 50)
    
    flame.material.emissiveIntensity = intensity
    flame.material.opacity = opacity
    flame?.rotateY(0.02)
  })
})
</script>

<template>
  <primitive :object="scene" />
</template>