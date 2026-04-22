<script setup lang="ts">
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, VignettePmndrs } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { computed, shallowRef } from 'vue'

const gl = {
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  { draco: true },
)

const modelRef = shallowRef(null)
const model = computed(() => nodes.value?.BlenderCube)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />

    <primitive v-if="model" ref="modelRef" :object="model" />

    <TresAmbientLight :intensity="1" />

    <Suspense>
      <EffectComposerPmndrs>
        <VignettePmndrs :darkness="0.9" :offset="0.3" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
