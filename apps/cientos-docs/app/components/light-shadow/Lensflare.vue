<script setup lang="ts">
import { Lensflare, OrbitControls, Torus } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const [x, z] = [shallowRef(0), shallowRef(0)]

function onLoop({ elapsed }: { elapsed: number }) {
  z.value = Math.cos(elapsed * 0.5) * 2
  x.value = Math.sin(elapsed)
}
</script>

<template>
  <TresCanvas clear-color="#333" @loop="onLoop">
    <OrbitControls />
    <TresPointLight :position="[x, 0, z]">
      <Lensflare
        :seed="1028"
        :scale="0.33"
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
