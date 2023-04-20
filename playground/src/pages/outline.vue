<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Outline, Glitch } from '@post'
import { BasicShadowMap, NoToneMapping, Object3D, Intersection } from 'three'

const gl = {
  clearColor: '#4ADE80',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid))
    outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid)
  else outlinedObjects.value = [...outlinedObjects.value, object]
}
</script>

<template>
  <TresCanvas v-bind="gl" disable-render>
    <TresPerspectiveCamera :position="[4, 4, 4]" :look-at="[2, 2, 2]" />

    <template v-for="i in 5" :key="i">
      <TresMesh @click="toggleMeshSelectionState" :position="[i * 1.1 - 2.8, 1, 0]">
        <TresBoxGeometry :width="4" :height="4" :depth="4" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>

    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer>
        <Glitch />
        <Outline :outlined-objects="outlinedObjects" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
