<script setup lang="ts">
import { ref, watch } from 'vue'
import { Color, sRGBEncoding } from 'three'
import { TresCanvas } from '../components/TresCanvas'
import { OrbitControls, useTweakPane, FBXModel, useFBX } from '@tresjs/cientos/'

const bgColor = new Color('#F78B3D')
useTweakPane()

const jeepRef = ref()

const model = await useFBX('/models/low-poly-truck/Jeep_done.fbx')
model.position.set(0, 4, 0)
model.scale.set(0.01, 0.01, 0.01)
model.updateMatrixWorld()

watch(jeepRef, ({ model }) => {
  model.scale.set(0.01, 0.01, 0.01)
  model.rotation.y = -Math.PI / 2
})
</script>

<template>
  <TresCanvas
    :clear-color="bgColor"
    shadows
    alpha
    window-size
    power-preference="high-performance"
    :output-encoding="sRGBEncoding"
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="8" :fov="45" :near="0.1" :far="10000" />

    <TresAmbientLight :color="0xffffff" :intensity="0.75" />
    <TresMesh v-bind="model" />
    <Suspense>
      <FBXModel ref="jeepRef" path="/models/low-poly-truck/Jeep_done.fbx" />
    </Suspense>
  </TresCanvas>
</template>
