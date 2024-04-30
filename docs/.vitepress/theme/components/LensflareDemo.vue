<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Lensflare, OrbitControls, Torus } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { shallowRef } from 'vue'
import '@tresjs/leches/styles'

const [x, z] = [shallowRef(0), shallowRef(0)]
useRenderLoop().onLoop(({ elapsed }) => {
  z.value = Math.cos(elapsed * 0.5) * 2
  x.value = Math.sin(elapsed)
})

const { value: scale } = useControls({
  scale: { value: 0.33, min: 0.01, max: 2, step: 0.01 },
})
</script>

<template>
  <TresLeches class="important-top-4 important-left-4" />
  <TresCanvas clear-color="#333">
    <OrbitControls />
    <TresPointLight :position="[x, 0, z]">
      <Lensflare
        :seed="1028"
        :scale="scale"
      />
    </TresPointLight>
    <Torus
      v-for="n in [-2, 0, 2]"
      :key="n"
      :args="[0.7, 0.15]"
      :position-z="n"
      :rotation-y="Math.PI * 0.5"
    >
      <TresMeshPhongMaterial color="#888" />
    </Torus>
    <TresGridHelper :position="[0, -0.9, 0]" />
  </TresCanvas>
</template>
