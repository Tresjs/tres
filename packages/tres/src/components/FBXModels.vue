<script setup lang="ts">
import { ref, watch } from 'vue'
import { Color, sRGBEncoding } from 'three'

import { OrbitControls, useTweakPane, FBXModel, useFBX } from '../../../cientos/src/'

const bgColor = new Color('#F78B3D')
useTweakPane()

const jeepRef = ref()

watch(jeepRef, ({ getModel }) => {
  const model = getModel()
  model.scale.set(0.01, 0.01, 0.01)
  model.rotation.y = -Math.PI / 2
})
</script>

<template>
  <Suspense>
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
      <TresScene :fog="bgColor">
        <TresAmbientLight :color="0xffffff" :intensity="0.75" />
        <FBXModel ref="jeepRef" path="/models/low-poly-truck/Jeep_done.fbx" />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
