<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { useWindowSize } from '@vueuse/core'
import { EffectComposer, RenderPass } from 'postprocessing'

import { OrbitControls, Text3D, Torus } from '@tresjs/cientos'

/* const pane = useTweakPane() */

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
const donutTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/8.png'])

const donuts = Array.from({ length: 200 }, () => {
  return {
    position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30],
    rotation: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
    scale: [0.4, 0.4, 0.4],
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
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera ref="camera" :position="[6, 5, 5]" :focus="100" />
    <OrbitControls make-default />
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
        <TresMeshMatcapMaterial :matcap="donutTexture" />
      </Torus>
    </TresGroup>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
