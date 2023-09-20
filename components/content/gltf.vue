<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const akuAkuRef = shallowRef(null)

watchEffect(() => {
  console.log(akuAkuRef.value)
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :fov="75"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />

    <TresAmbientLight
      :color="0xffffff"
      :intensity="0.75"
    />
    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="1"
      cast-shadow
    />
    <Suspense>
      <GLTFModel
        ref="akuAkuRef"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf"
        draco
      />
    </Suspense>
  </TresCanvas>
</template>
