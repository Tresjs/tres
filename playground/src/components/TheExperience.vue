<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import TheSphere from './TheSphere.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const wireframe = ref(true)

const canvas = ref()
const meshRef = ref()

const { isVisible } = useControls({
  isVisible: true,
})

watchEffect(() => {
  if (meshRef.value) {
    // eslint-disable-next-line no-console
    console.log(meshRef.value)
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="canvas"
    class="awiwi"
    :style="{ background: '#008080' }"
  >
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
      :look-at="[0, 4, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[-2, 6, 0]"
      :rotation="[0, Math.PI, 0]"
      name="cone"
      cast-shadow
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 4, 0]"
      cast-shadow
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial
        color="#4F4F4F"
        :wireframe="wireframe"
      />
    </TresMesh>
    <TresMesh
      ref="meshRef"
      :rotation="[-Math.PI / 2, 0, Math.PI / 2]"
      name="floor"
      receive-shadow
    >
      <TresPlaneGeometry :args="[20, 20, 20]" />
      <TresMeshToonMaterial
        color="#D3FC8A"
      />
    </TresMesh>
    <TheSphere v-if="isVisible" />
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>
