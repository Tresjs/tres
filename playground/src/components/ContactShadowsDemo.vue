<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, useTweakPane, ContactShadows, Box, Plane, Icosahedron } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { reactive, shallowRef } from 'vue'

const gl = {
  clearColor: '#fff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const state = reactive({
  blur: 3.5,
  opacity: 1,
  resolution: 512,
  color: '#0000ff',
  helper: false,
})

const { pane } = useTweakPane()

pane.addInput(state, 'blur', {
  step: 0.1,
  min: 0,
  max: 10,
})
pane.addInput(state, 'opacity', {
  step: 0.1,
  min: 0,
  max: 1,
})

pane.addInput(state, 'resolution', {
  step: 1,
  min: 0,
  max: 1024,
})

pane.addInput(state, 'color').on('change', ev => {
  state.color = ev.value
})

pane.addInput(state, 'helper')

const boxRef = shallowRef()
const icoRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.value.rotation.y += 0.02
    boxRef.value.value.rotation.x += 0.01
  }
  if (icoRef.value) {
    icoRef.value.value.rotation.y += 0.02
    icoRef.value.value.rotation.x += 0.01
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />

    <Box ref="boxRef" :args="[0.4, 0.4, 0.4]" :position="[0, 1, 0]">
      <TresMeshNormalMaterial />
    </Box>
    <Icosahedron ref="icoRef" :args="[0.3]" :position="[1, 1, 1]">
      <TresMeshNormalMaterial />
    </Icosahedron>
    <ContactShadows
      :blur="state.blur"
      :resolution="state.resolution"
      :opacity="state.opacity"
      :color="state.color"
      :helper="state.helper"
    />
    <Plane :args="[10, 10, 10]" :position="[0, -0.02, 0]">
      <TresMeshBasicMaterial :color="'#ffffff'" />
    </Plane>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
