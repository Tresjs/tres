<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Outline, Glitch } from '/@post'
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Object3D } from 'three'
import { computed, ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const outlinedObject = ref<Object3D | null>(null)
const outlinedObjects = computed<Object3D[]>(() => (outlinedObject.value ? [outlinedObject.value] : []))
</script>

<template>
  <TresCanvas v-bind="gl" :disable-render="true">
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />

    <TresMesh ref="outlinedObject">
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper />
    <!-- <TresAmbientLight :intensity="1" /> -->
    <Suspense>
      <EffectComposer>
        <!-- <Glitch /> -->
        <Outline :outlined-objects="outlinedObjects" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
