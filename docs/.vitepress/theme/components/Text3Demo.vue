<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Text3D } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const reactiveText = ref('You can edit me...')
</script>

<template>
  <div class="bg-gray-100 flex justify-center">
    <input
      v-model="reactiveText"
      class="p-2 m-2 rounded-md bg-white border border-gray-400 color-red"
    />
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
      >
        <TresMeshNormalMaterial />
      </Text3D>
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
