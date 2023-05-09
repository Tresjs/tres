<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { TresCanvas } from '/@/'
import TheSphere from './TheSphere.vue'
import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const wireframe = ref(true)

const context = ref()

watchEffect(() => {
  if (context.value) {
    console.log({ context: context.value })
  }
})
</script>

<template>
  <div><button @click="wireframe = !wireframe">Click</button></div>
  <pre>{{ wireframe }}</pre>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[7, 7, 7]" :look-at="[0, 4, 0]" />
    <OrbitControls />
    <TresFog :color="gl.clearColor" :near="5" :far="15" />
    <TresMesh :position="[-2, 6, 0]" :rotation="[0, Math.PI, 0]" cast-shadow>
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[0, 4, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" :wireframe="wireframe" />
    </TresMesh>
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial color="#D3FC8A" />
    </TresMesh>
    <TheSphere />
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
    <TresOrthographicCamera />
  </TresCanvas>
</template>
