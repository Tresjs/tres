<script setup lang="ts">
import type { TresObject3D } from '@tresjs/core'

const props = defineProps<{
  progress: number
}>()

const { progress } = toRefs(props)

const { nodes } = await useGLTF(
  '/models/low-poly-planet/rocket.glb',
)

const rocket = nodes['Model-Toy-Rocket'] as TresObject3D

const rocketRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {

  if (!rocket) return
  rocket.rotation.y = - progress.value * Math.PI / 2 * 8

  if (progress.value > 0.5) {
    rocket.position.x = -(progress.value ** 2) * 7
  }

  /* if(progress.value === 1) {
      rocket.position.set(rocket.position.x + Math.random() * -.1, Math.random() * -.1, Math.random() * -.1)
    } */
})
</script>

<template>
  <TresGroup
    :position="[7, 3, 0]"
    :scale="[0.4, 0.4, 0.4]"
    :rotate-z="Math.PI / 4"
  >
    <primitive
      ref="rocketRef"
      :object="rocket"
    />
  </TresGroup>
</template>