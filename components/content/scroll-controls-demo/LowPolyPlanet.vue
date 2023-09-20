<script setup lang="ts">
import type { TresObject3D } from '@tresjs/core'
import { shallowRef } from 'vue'

const props = defineProps<{
  progress: number
}>()

const { progress } = toRefs(props)

const { nodes } = await useGLTF(
  '/models/low-poly-planet/low-poly-planet-v3.glb',
)

const planet = nodes['Planet'] as TresObject3D
const planetRef = shallowRef()
const clouds = Object.values(nodes).filter(node => node.name.includes('Cloud'))
const cloudsRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (!planet) return
  planet.rotation.y -= delta * 0.004
  planet.rotation.z -= delta * 0.002
  planet.rotation.x -= delta * 0.005
  planet.updateMatrixWorld()

  /* if(cloudsRef.value) {
    cloudsRef.value.forEach((cloud: TresObject3D) => {
      cloud.rotation.x = -progress.value * 2
    })
  } */
})
</script>

<template>
  <TresGroup :position="[-2, 2, 0]">
    <primitive
      ref="planetRef"
      :object="planet"
    />
    <TresGroup :rotation="[0, -progress, 0]">
      <primitive
        v-for="cloud in clouds"
        :key="cloud.id"
        ref="cloudsRef"
        :object="cloud"
      />
    </TresGroup>
  </TresGroup>
</template>
