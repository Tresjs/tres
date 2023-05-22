<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, MeshWobbleMaterial } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { ref } from 'vue'
import { watchEffect } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const context = ref()

watchEffect(() => {
  if (context.value) {
    console.log(context.value.state.scene)
  }
})
</script>

<template>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial color="orange" :speed="10" :factor="5" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
