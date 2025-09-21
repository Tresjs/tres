<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, Text3D, Torus } from '@tresjs/cientos'
import type { TresCamera } from '@tresjs/core'

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

const donuts = Array.from({ length: 200 }, () => ({
  position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30],
  rotation: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
  scale: [0.4, 0.4, 0.4],
}))

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
    (camera.value as TresCamera).lookAt(0, 0, 0)
  }
})

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      ref="camera"
      :position="[6, 5, 5]"
      :focus="100"
    />
    <OrbitControls make-default />
    <Suspense>
      <Text3D
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        center
        text="TresJS"
        :size="1"
        :height="0.2"
        :curve-segments="12"
        :bevel-enabled="true"
        :bevel-thickness="0.05"
        :bevel-size="0.03"
        :bevel-offset="0"
        :bevel-segments="4"
      >
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </Text3D>
    </Suspense>
    <TresGroup ref="donutsRef">
      <Torus
        v-for="(donut, $index) in donuts"
        :key="$index"
        :args="[1, 0.6, 16, 32]"
        v-bind="donut"
      >
        <TresMeshMatcapMaterial :matcap="donutTexture" />
      </Torus>
    </TresGroup>
  </TresCanvas>
</template>
