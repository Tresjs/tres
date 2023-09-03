<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,

  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

/* const akuAkuRef = ref(null) */

const context = ref()
watchEffect(() => {
  if (context.value) {
    console.log({ context: context.value.state.scene })
  }
})
</script>

<template>
  <TresCanvas
    v-bind="state"
    ref="context"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />

    <Suspense>
      <!--  <GLTFModel
        ref="akuAkuRef"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf"
        draco
      /> -->
      <TresGroup :scale="[1, 2, 1]">
        <TheModel />
      </TresGroup>
    </Suspense>
    <TresAxesHelper />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
0.5
