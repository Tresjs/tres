<script setup lang="ts">
import { HolographicMaterial, OrbitControls, Sphere } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { shallowRef, watch } from 'vue'

const gl = {
  clearColor: '#333',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const holographicMaterialRef = shallowRef()

watch(holographicMaterialRef, (value) => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ watch ~ value:', value)
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <Sphere :scale="0.5">
      <HolographicMaterial
        ref="holographicMaterialRef"
        :fresnel-amount="0.8"
        :enable-blinking="true"
        :blink-fresnel-only="true"
        :hologram-brightness="0.17"
      />
      <!--
        :fresnel-opacity="0.15"
        :scanline-size="6"
        :signal-speed="2.3"
        hologram-color="#ff0000"
        :hologram-opacity="1."
        :enable-additive="true"
        :side="FrontSide" -->
    </Sphere>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[2, 2, 2]"
    />
    <OrbitControls />
  </TresCanvas>
</template>
