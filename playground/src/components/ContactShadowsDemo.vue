<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, useTweakPane, ContactShadows, Box, Plane } from '@cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { shallowRef } from 'vue'
import { watchEffect } from 'vue'

const gl = {
  clearColor: '#fff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { pane } = useTweakPane()

const groupRef = shallowRef()

watchEffect(() => {
  console.log(groupRef)
})

const boxRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.value.rotation.y += 0.02
    boxRef.value.value.rotation.x += 0.01
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />

    <Box ref="boxRef" :position="[0, 1, 0]">
      <TresMeshNormalMaterial />
    </Box>
    <ContactShadows :frames="3" />
    <Plane :args="[10, 10, 10]" :position="[0, -0.02, 0]">
      <TresMeshBasicMaterial :color="'#ffffff'" />
    </Plane>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
