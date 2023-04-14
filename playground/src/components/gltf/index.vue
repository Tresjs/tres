<script setup lang="ts">
import { sRGBEncoding, BasicShadowMap, NoToneMapping } from 'three'
import { TresCanvas } from '/@/'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,

  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const akuAkuRef = ref(null)

watchEffect(() => {
  if (akuAkuRef.value) {
    const model = akuAkuRef.value.getModel().children[0]
    console.log('akuAkuRef', model)
  }
})
</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />

    <Suspense>
      <!--  <GLTFModel
        ref="akuAkuRef"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf"
        draco
      /> -->
      <TresGroup :position="[0, 4, 0]">
        <TheModel />
      </TresGroup>
    </Suspense>
    <TresAxesHelper />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
  </TresCanvas>
</template>
