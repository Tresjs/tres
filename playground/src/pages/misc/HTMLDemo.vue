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

const isActive = ref(false)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 0, 8]" />
    <OrbitControls />
    <TresMesh
      :position="[1, 1, 1]"
      @click="isActive = true"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-bind="state"
        transform
        :occlude="[sphereRef]"
      >
        <h1
          class="text-xs p-0.5 rounded"
          :class="isActive ? 'bg-dark' : 'bg-white'"
        >
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
        :position="[0.5, 1, 0]"
      >
        <h1 class="bg-dark text-white text-xs p-0.5 rounded">
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
