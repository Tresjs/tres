<script setup lang="ts">
import { TresCanvas, useRenderLoop, useTexture, useTres } from '@tresjs/core'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'

import { /* OrbitControls, */ Text3D, Torus, useTweakPane } from '@tresjs/cientos'
import { TransformControls } from 'three-stdlib'

const pane = useTweakPane()

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

const donuts = Array.from({ length: 100 }, () => {
  return {
    position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
    rotation: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
    scale: [Math.random() * 0.2 + 0.2, Math.random() * 0.2 + 0.2, Math.random() * 0.2 + 0.2],
  }
})

const donutsRef = ref(null)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (donutsRef.value) {
    for (const donut of donutsRef.value.children) {
      donut.rotation.x += delta * 0.2
      donut.rotation.y += delta * 0.2
      donut.rotation.z += delta * 0.2
    }
  }
})

const camera = ref(null)

watchEffect(() => {
  if (camera.value) {
    camera.value.lookAt(0, 0, 0)
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TestOrbitControls make-default />

    <!-- <OrbitControls /> -->
    <TresPerspectiveCamera ref="camera" :position="[10, 5, 5]" />
    <Suspense>
      <Text3D
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        center
        :text="'TresJS'"
        :size="1"
        :height="0.2"
        :curveSegments="12"
        :bevelEnabled="true"
        :bevelThickness="0.05"
        :bevelSize="0.03"
        :bevelOffset="0"
        :bevelSegments="4"
      >
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </Text3D>
    </Suspense>
    <TresGroup ref="donutsRef">
      <Torus :args="[1, 0.6, 16, 32]" v-for="donut in donuts" v-bind="donut">
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </Torus>
    </TresGroup>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
