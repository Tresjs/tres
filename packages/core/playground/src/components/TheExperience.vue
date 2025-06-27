<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { ref, watchEffect } from 'vue'
import TheSphere from './TheSphere.vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}

const wireframe = ref(true)
const { isVisible } = useControls({
  isVisible: true,
})
const canvas = ref()

watchEffect(() => {
  if (canvas.value) {
    // eslint-disable-next-line no-console
    console.log(canvas.value.context)
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="canvas"
    class="awiwi"
  >
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
      :look-at="[0, 4, 0]"
    />
    <OrbitControls />
    <TresFog
      :color="gl.clearColor"
      :near="5"
      :far="15"
    />
    <TresMesh
      :position="[-2, 6, 0]"
      :rotation="[0, Math.PI, 0]"
      cast-shadow
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      v-if="isVisible"
      :position="[0, 4, 0]"
      cast-shadow
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial
        color="#4F4F4F"
        :wireframe="wireframe"
      />
    </TresMesh>
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
      @click="wireframe = !wireframe"
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial color="#D3FC8A" />
    </TresMesh>
    <TheSphere />
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
    <TresOrthographicCamera />
  </TresCanvas>
</template>
