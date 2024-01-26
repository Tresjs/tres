
import type { Star } from '#build/components';
<script setup lang="ts">
const { nodes } = await useGLTF('/models/star.glb', { draco: true })

const model = nodes['star']

const stars = Array.from({ length: 1000 }, () => ({
  position: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80],
  rotation: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
  scale: [1, 1, 2],
}))

const starsRef = ref(null)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (starsRef.value) {
    for (const star of starsRef.value.children) {
      star.rotation.x += delta * 0.2
      star.rotation.y += delta * 0.2
      star.rotation.z += delta * 0.2

      if (star.position.y < -80) {
        star.position.y = 40
      }
      if (star.position.x < -80) {
        star.position.x = 40
      }
      star.position.y -= delta * 0.2
      star.position.x -= delta * 0.2
    }
  }
})
</script>

<template>
  <TresGroup ref="starsRef">
    <!-- <primitive
      v-for="star in stars"
      :key="star"
      :position="star.position"
      :rotation="star.rotation"
      :scale="star.scale"
      :object="model"
    /> -->
    <primitive
      v-for="star in stars"
      :key="star"
      :position="star.position"
      :rotation="star.rotation"
      :scale="star.scale"
      :object="model.clone()"
    />
  </TresGroup>
</template>