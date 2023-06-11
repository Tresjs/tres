<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { reactive, ref } from 'vue'
import { EffectComposer, Outline, Glitch } from '@tresjs/post-processing'
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

const outlineParameters = reactive({
  pulseSpeed: 0,
  edgeStrength: 2.5,
  visibleEdgeColor: '#ff0000',
})

const { pane } = useTweakPane()

pane.addInput(outlineParameters, 'edgeStrength', { min: 0, max: 10 })
pane.addInput(outlineParameters, 'pulseSpeed', { min: 0, max: 2 })
pane.addInput(outlineParameters, 'visibleEdgeColor')
</script>

<template>
  <TresCanvas v-bind="gl" disable-render>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[2, 2, 2]" />
    <OrbitControls />
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
        <Outline :outlined-objects="outlinedObjects" v-bind="outlineParameters" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
