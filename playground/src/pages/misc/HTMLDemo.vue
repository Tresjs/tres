<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import '@tresjs/leches/styles'
import { OrbitControls, Html } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const sphereRef = ref(null)
const torusRef = ref(null)

const state = reactive({
  wrapperClass: 'wrapper',
  as: 'div',
  center: true,
})

function onOcclude(ev) {
  console.log('occluded', ev)
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 0, 8]" />
    <OrbitControls />
    <!-- <Html v-bind="state" transform>
      <iframe src="https://tresjs.org" frameborder="0" class="web"></iframe>
    </Html> -->
    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-bind="state"
        transform
        :occlude="[sphereRef]"
      >
        <h1 class="bg-white text-xs p-0.5 rounded">
          Box
        </h1>
      </Html>
    </TresMesh>
    <TresMesh
      ref="sphereRef"
      :position="[4, 1, 1]"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-bind="state"
        transform
      >
        <h1 class="bg-white text-xs p-0.5 rounded">
          Sphere
        </h1>
      </Html>
    </TresMesh>
    <TresMesh
      ref="torusRef"
      :position="[7, 1, 1]"
    >
      <TresTorusGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style scoped>
.web {
  width: 600px;
  height: 400px;
  border-radius: 10px;
}
</style>
