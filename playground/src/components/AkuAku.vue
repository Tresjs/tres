<script setup lang="ts">
import { ref, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { useTweakPane, useGLTF, OrbitControls, GLTFModel } from '@cientos'
import { sRGBEncoding, NoToneMapping } from 'three'

useTweakPane()

const modelPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'

const { scene: model } = await useGLTF(
  modelPath,
  {
    draco: true,
  },
)

const akuAkuRef = ref(null)

const gl = {
  clearColor: '#333',
  alpha: true,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}


watch(akuAkuRef, value => {
  console.log('akuAkuRef', value)
})
</script>

<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
    <primitive :object="model" :position="[-3, -2, 0]"> </primitive>
    <Suspense>
        <GLTFModel ref="akuAkuRef" :path=modelPath draco :position="[0, -2, 0]" name="Aku_aku" />
    </Suspense>
    <TresAmbientLight />
    <TresDirectionalLight />
  </TresCanvas>
</template>
