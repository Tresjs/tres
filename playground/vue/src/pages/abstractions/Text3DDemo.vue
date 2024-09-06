<script setup lang="ts">
import { OrbitControls, Text3D } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const reactiveText = ref('You can edit me')
</script>

<template>
  <div class="input-center">
    <input v-model="reactiveText" />
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <Suspense>
      <Text3D
        :text="reactiveText"
        :size="0.3"
        :font="fontPath"
        center
        :need-updates="true"
      />
    </Suspense>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style scoped>
.input-center {
  display: flex;
  justify-content: center;
  padding: 0.25rem;
}
</style>
