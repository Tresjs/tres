<script setup lang="ts">
import { Box, ContactShadows, Icosahedron, OrbitControls, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { reactive, shallowRef } from 'vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#CCC',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const state = reactive({
  width: 1,
  height: 1,
  opacity: 1,
  blur: 3.5,
  near: 0,
  far: 10,
  smooth: true,
  resolution: 512,
  scale: 10,
  tint: '#000000',
  color: '#0000ff',
  depthWrite: false,
  rotationX: 0,
})

const { width, height, blur, far, smooth, opacity, resolution, scale, tint, color, depthWrite, rotationX } = useControls({
  width: {
    value: state.width,
    step: 0.1,
    min: 0.1,
    max: 10,
  },
  height: {
    value: state.height,
    step: 0.1,
    min: 0.1,
    max: 10,
  },
  near: {
    value: state.near,
    step: 0.1,
    min: 0,
    max: 30,
  },
  far: {
    value: state.far,
    step: 0.1,
    min: 0,
    max: 30,
  },
  scale: {
    value: state.scale,
    step: 0.1,
    min: 0.1,
    max: 30,
  },
  blur: {
    value: state.blur,
    step: 0.1,
    min: 0,
    max: 10,
  },
  smooth: state.smooth,
  opacity: {
    value: state.opacity,
    step: 0.1,
    min: 0,
    max: 1,
  },
  resolution: {
    value: state.resolution,
    step: 1,
    min: 0,
    max: 1024,
  },
  tint: {
    type: 'color',
    value: state.tint,
  },
  color: {
    type: 'color',
    value: state.color,
  },
  depthWrite: state.depthWrite,
  rotationX: {
    value: state.rotationX,
    step: 0.1,
    max: 9,
  },
})

watch(() => [
  width.value.value,
  height.value.value,
  blur.value.value,
  far.value.value,
  smooth.value.value,
  opacity.value.value,
  resolution.value.value,
  scale.value.value,
  color.value.value,
  tint.value.value,
  depthWrite.value.value,
  rotationX.value.value,
], () => {
  state.width = width.value.value
  state.height = height.value.value
  state.blur = blur.value.value
  state.far = far.value.value
  state.smooth = smooth.value.value
  state.opacity = opacity.value.value
  state.resolution = resolution.value.value
  state.tint = tint.value.value
  state.color = color.value.value
  state.scale = scale.value.value
  state.depthWrite = depthWrite.value.value
  state.rotationX = rotationX.value.value
})

const boxRef = shallowRef({ instance: { rotation: { x: 0, y: 0, z: 0 } } })
const icoRef = shallowRef({ instance: { rotation: { x: 0, y: 0, z: 0 } } })
const torusRef = shallowRef({ instance: { rotation: { x: 0, y: 0, z: 0 } } })

const intervalId = setInterval(() => {
  boxRef.value.instance.rotation.x += 0.01
  boxRef.value.instance.rotation.z += 0.01
  icoRef.value.instance.rotation.x += 0.01
  icoRef.value.instance.rotation.z += 0.01
  torusRef.value.instance.rotation.x += 0.01
  torusRef.value.instance.rotation.z += 0.01
}, 20)

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :args="[50]" :position="[0.5, 1, 2]" />

    <OrbitControls />
    <Box
      ref="boxRef"
      :args="[0.4, 0.4, 0.4]"
      :position="[
        Math.cos((0 / 3) * 2 * Math.PI) * 0.5,
        0.5,
        Math.sin((0 / 3) * 2 * Math.PI) * 0.5,
      ]"
    >
      <TresMeshNormalMaterial />
    </Box>
    <Icosahedron
      ref="icoRef"
      :args="[0.3]"
      :position="[
        Math.cos((1 / 3) * 2 * Math.PI) * 0.5,
        0.5,
        Math.sin((1 / 3) * 2 * Math.PI) * 0.5,
      ]"
    >
      <TresMeshNormalMaterial />
    </Icosahedron>

    <TorusKnot
      ref="torusRef"
      :args="[0.4, 0.05, 256, 24, 1, 3]"
      :position="[
        Math.cos((2 / 3) * 2 * Math.PI) * 0.5,
        0.5,
        Math.sin((2 / 3) * 2 * Math.PI) * 0.5,
      ]"
    >
      <TresMeshNormalMaterial />
    </TorusKnot>
    <TresGroup>
      <ContactShadows v-bind="state" :position-y="0.0001" />
      <!-- <TresMesh :rotation-x="-Math.PI / 2" :scale="10">
        <TresPlaneGeometry />
        <TresMeshBasicMaterial color="gray" />
      </TresMesh> -->
    </TresGroup>
  </TresCanvas>
</template>
