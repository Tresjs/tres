<script setup lang="ts">
import { Lensflare, OrbitControls, Torus } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { shallowRef } from 'vue'

const [x, z] = [shallowRef(0), shallowRef(0)]

const { scale, seed, color, distance, size } = useControls({
  scale: { value: 0.33, min: 0.1, max: 2, step: 0.1 },
  seed: { value: 1028, min: 1, max: 5000, step: 1 },
  color: '#ffffff',
  distance: { value: 0, min: -2, max: 2, step: 0.1 },
  size: { value: 1, min: 0.1, max: 10, step: 0.5 },
})

function onLoop({ elapsed }: { elapsed: number }) {
  z.value = Math.cos(elapsed * 0.5) * 2
  x.value = Math.sin(elapsed)
}
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#333" @loop="onLoop">
      <OrbitControls />
      <TresPointLight :position="[x, 0, z]">
        <Lensflare
          :seed="seed"
          :scale="scale"
          :color="color"
          :distance="distance"
          :size="size"
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
  </div>
  <TresLeches :float="false" />
</template>
