<script setup lang="ts">
import { BakeShadows, CameraControls } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop, vLightHelper } from '@tresjs/core'
import { Color, NoToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  shadows: true,
}

const cubeRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (cubeRef.value) {
    cubeRef.value.rotation.y = elapsed * 0.5
    cubeRef.value.rotation.x = elapsed * 0.5
  }
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <CameraControls />
    <BakeShadows />
    <TresMesh
      ref="cubeRef"
      cast-shadow
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial :color="new Color(0x00FF00)" />
    </TresMesh>
    <TresMesh
      receive-shadow
      :position="[0, -2, 0]"
      :rotation-x="-Math.PI / 2"
    >
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshStandardMaterial :color="new Color(0xF7F7F7)" />
    </TresMesh>
    <TresDirectionalLight
      v-light-helper
      cast-shadow
      :position="[0, 10, 0]"
    />
  </TresCanvas>
</template>
