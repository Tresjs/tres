<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Stars, Sphere, Box, vAlwaysLookAt } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping, Vector3 } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const sphereRef = shallowRef()
const box1Ref = shallowRef()
const box2Ref = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (sphereRef.value && box1Ref.value && box2Ref.value) {
    sphereRef.value.value.position.y = Math.sin(elapsed) * 1.5
    box2Ref.value.value.position.y = Math.sin(elapsed * 1.2) * 1.5 + 2
    const boxAngle = elapsed * 0.75
    box1Ref.value.value.position.x = Math.cos(boxAngle) * 5
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <!-- The camera observe a TresMesh -->
    <TresPerspectiveCamera
      v-always-look-at="sphereRef"
      :position="[0, 2, 7.5]"
    />
    <Stars />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
    />
    <!-- This box use an array -->
    <Box
      ref="box1Ref"
      v-always-look-at="[0, 0, 0]"
      :color="0x00ff00"
      :args="[1, 1, 0.1]"
      name="greenBox"
      :scale="1"
      :position="[-2, 1, -3]"
    />
    <!-- This box use a Vector3 -->
    <Box
      ref="box2Ref"
      v-always-look-at="new Vector3(0, 0, 0)"
      :color="0xff0000"
      :scale="1"
      :position="[-2, 1, -3]"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
