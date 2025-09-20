<script setup lang="ts">
import { BoxHelper, DirectionalLightHelper } from 'three'
import { VertexNormalsHelper } from 'three-stdlib'
import { Helper, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const hasHelpers = ref(true)
const click = () => {
  hasHelpers.value = !hasHelpers.value
}

const px = shallowRef(0)
const py = shallowRef(0)
let elapsed = 0
setInterval(() => {
  elapsed += 1000 / 30
  px.value = Math.cos(elapsed * 0.001) * 10
  py.value = Math.sin(elapsed * 0.001) * 10
}, 1000 / 30)
</script>

<template>
  <TresCanvas @pointerdown="click">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />

    <TresMesh :position="[px, 2, 0]">
      <TresSphereGeometry />
      <TresMeshBasicMaterial />
      <Helper v-if="hasHelpers" :type="BoxHelper" :args="['royalblue']" />
      <Helper v-if="hasHelpers" :type="VertexNormalsHelper" :args="[1, 0xFF0000]" />
    </TresMesh>

    <TresDirectionalLight :position="[0, py, 2]">
      <Helper v-if="hasHelpers" :type="DirectionalLightHelper" />
    </TresDirectionalLight>
  </TresCanvas>
</template>
