<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import FBOCube from './FBOCube.vue'
import '@tresjs/leches/styles'

const groupRef = ref()

const onLoop = ({ elapsed }: { elapsed: number }) => {
  groupRef.value.position.y = Math.sin(elapsed)
}
</script>

<template>
  <TresCanvas clear-color="#82DBC5" @loop="onLoop">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresGroup ref="groupRef">
      <FBOCube />
    </TresGroup>
    <TresMesh :position="[4, 0, 0]">
      <TresTorusKnotGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh :position="[-4, 0, 0]">
      <TresTorusGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
