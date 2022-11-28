<script setup lang="ts">
import { ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
const redLightRef = ref(null)
const blueLightRef = ref(null)
</script>
<template>
  <Story title="lighting/RedBlue" icon="ph:lightbulb">
    <Variant title="playground">
      <TresCanvas shadows>
        <OrbitControls />
        <TresPerspectiveCamera :position="[5, 5, 5]" />
        <TresScene>
          <TresMesh :position="[0, 0, 0]" cast-shadow>
            <TresSphereGeometry :args="[2, 32, 32]" />
            <TresMeshStandardMaterial :roughness="0.4" />
          </TresMesh>
          <TresDirectionalLight ref="redLightRef" color="red" :position="[-8, 0, 0]" :intensity="0.7" cast-shadow />
          <TresDirectionalLightHelper v-if="redLightRef" :args="[redLightRef, 5]" />
          <TresDirectionalLight ref="blueLightRef" color="blue" :position="[8, 0, 0]" :intensity="0.7" cast-shadow />
          <TresDirectionalLightHelper v-if="blueLightRef" :args="[blueLightRef, 5]" />
        </TresScene>
      </TresCanvas>
    </Variant>
  </Story>
</template>
