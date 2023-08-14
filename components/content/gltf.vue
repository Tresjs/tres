<script setup lang="ts">
import { TresCanvas as Original } from '@tresjs/core'
import { SRGBColorSpace } from 'three'

const akuAkuRef = shallowRef(null)

watchEffect(() => {
  console.log(akuAkuRef.value)
})
</script>

<template>
  <TresCanvas shadows :alpha="true" window-size :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="75" :near="0.1" :far="1000" />
    <OrbitControls />

    <TresAmbientLight :color="0xffffff" :intensity="0.75" />
    <TresDirectionalLight :position="[0, 8, 4]" :intensity="1" cast-shadow />
    <Suspense>
      <GLTFModel
        ref="akuAkuRef"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf"
        draco
      />
    </Suspense>
  </TresCanvas>
</template>
