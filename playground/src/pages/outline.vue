<script setup lang="ts">
import { TresCanvas, TresCanvasProps } from '@tresjs/core'
import { useTweakPane } from '@tresjs/cientos'
import { reactive, ref } from 'vue'
import { EffectComposer, Outline, Glitch } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, Object3D, Intersection } from 'three'
import { BlendFunction, KernelSize } from 'postprocessing'

const gl: TresCanvasProps = {
  clearColor: '#4ADE80',
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
  edgeStrength: 40,
  visibleEdgeColor: '#ffffff',
  multisampling: 4,
  kernelSize: 3,
  blur: true,
})

const { pane } = useTweakPane()

pane.addInput(outlineParameters, 'edgeStrength', { min: 0, max: 100 })
pane.addInput(outlineParameters, 'pulseSpeed', { min: 0, max: 2 })
pane.addInput(outlineParameters, 'visibleEdgeColor')
pane.addInput(outlineParameters, 'blur')
pane.addInput(outlineParameters, 'kernelSize', { min: KernelSize.VERY_SMALL, max: KernelSize.VERY_LARGE, step: 1 })
</script>

<template>
  <TresCanvas v-bind="gl" disable-render>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[2, 2, 2]" />

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
        <!-- <Glitch /> -->
        <Outline :outlined-objects="outlinedObjects" v-bind="outlineParameters" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
