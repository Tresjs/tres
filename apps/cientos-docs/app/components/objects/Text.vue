<script setup lang="ts">
import { OrbitControls, Text3D } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const fontPath
  = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const reactiveText = ref('You can edit me...')

const {
  size,
  height,
  curveSegments,
  bevelEnabled,
  bevelThickness,
  bevelSize,
  bevelOffset,
  bevelSegments,
  center,
  needUpdates,
} = useControls({
  size: { value: 0.3, min: 0.05, max: 2, step: 0.05 },
  height: { value: 0.01, min: 0, max: 1, step: 0.01 },
  curveSegments: { value: 12, min: 1, max: 64, step: 1 },
  bevelEnabled: false,
  bevelThickness: { value: 0.01, min: 0, max: 0.5, step: 0.01 },
  bevelSize: { value: 0.01, min: 0, max: 0.5, step: 0.01 },
  bevelOffset: { value: 0, min: 0, max: 0.5, step: 0.01 },
  bevelSegments: { value: 3, min: 0, max: 16, step: 1 },
  center: true,
  needUpdates: true,
})
</script>

<template>
  <div class="bg-gray-100 flex justify-center">
    <input
      v-model="reactiveText"
      class="p-2 m-2 rounded-md bg-white border text-red-500 border-gray-400"
    />
  </div>
  <div class="aspect-video">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 0.5, 5]" />
      <OrbitControls />
      <Suspense>
        <Text3D
          :text="reactiveText"
          :size="size"
          :height="height"
          :curve-segments="curveSegments"
          :bevel-enabled="bevelEnabled"
          :bevel-thickness="bevelThickness"
          :bevel-size="bevelSize"
          :bevel-offset="bevelOffset"
          :bevel-segments="bevelSegments"
          :font="fontPath"
          :center="center"
          :need-updates="needUpdates"
        >
          <TresMeshNormalMaterial />
        </Text3D>
      </Suspense>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
