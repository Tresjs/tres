<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { OrbitControls, TransformControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = ref()
const sphereRef = ref()

const transformRef = ref()

function changeObject(object: any) {
  transformRef.value = object
}

const context = ref()

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  space: 'world',
  axis: 'XYZ',
  size: 1,
  showX: true,
  showY: true,
  showZ: true,
})

const { mode, enabled, space, axis, size, showX, showY, showZ } = useControls({
  mode: {
    label: 'Mode',
    value: controlsState.mode,
    options: ['translate', 'rotate', 'scale'],
  },
  enabled: controlsState.enabled,
  space: {
    label: 'Space',
    value: controlsState.space,
    options: ['world', 'local'],
  },
  axis: {
    label: 'Axis',
    value: controlsState.axis,
    options: ['X', 'Y', 'Z', 'XY', 'YZ', 'XZ', 'XYZ'],
  },
  size: {
    label: 'Size',
    value: controlsState.size,
    min: 0,
    max: 10,
    step: 0.01,
  },
  showX: true,
  showY: true,
  showZ: true,
})

watch([mode.value, enabled.value, space.value, axis.value, size.value, showX.value, showY.value, showZ.value], () => {
  controlsState.mode = mode.value.value
  controlsState.enabled = enabled.value.value
  controlsState.space = space.value.value
  controlsState.axis = axis.value.value
  controlsState.size = size.value.value
  controlsState.showX = showX.value.value
  controlsState.showY = showY.value.value
  controlsState.showZ = showZ.value.value
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="context"
  >
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />

    <TresMesh
      ref="boxRef"
      :position="[-2, 1, 0]"
      @click="changeObject(boxRef)"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TransformControls
      v-if="transformRef"
      :object="transformRef"
      v-bind="controlsState"
    />
    <TresMesh
      ref="sphereRef"
      :position="[2, 1, 0]"
      @click="changeObject(sphereRef)"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresGridHelper />
  </TresCanvas>
</template>
