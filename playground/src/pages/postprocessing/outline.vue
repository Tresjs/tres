<script setup lang="ts">
import type { Intersection, Object3D } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, OutlinePmndrs } from '@tresjs/post-processing'
import { KernelSize } from 'postprocessing'
import { NoToneMapping } from 'three'

import { ref } from 'vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#4ADE80',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid)) { outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid) }
  else { outlinedObjects.value = [...outlinedObjects.value, object] }
}

const { edgeStrength, pulseSpeed, visibleEdgeColor, blur, kernelSize } = useControls({
  edgeStrength: {
    value: 2000,
    min: 0,
    max: 5000,
    step: 10,
  },
  pulseSpeed: {
    value: 0,
    min: 0,
    max: 2,
    step: 0.01,
  },
  visibleEdgeColor: '#ffffff',
  blur: false,
  kernelSize: {
    value: 3,
    min: KernelSize.VERY_SMALL,
    max: KernelSize.VERY_LARGE,
    step: 1,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    render-mode="on-demand"
  >
    <TresPerspectiveCamera
      :position="[1, 3, 3]"
      :look-at="[2, 2, 2]"
    />
    <OrbitControls />
    <template
      v-for="i in 5"
      :key="i"
    >
      <TresMesh
        :position="[i * 1.1 - 2.8, 1, 0]"
        @click="toggleMeshSelectionState"
      >
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposerPmndrs>
        <OutlinePmndrs
          :outlined-objects="outlinedObjects"
          :blur="blur"
          :edge-strength="edgeStrength"
          :pulse-speed="pulseSpeed"
          :visible-edge-color="visibleEdgeColor"
          :kernel-size="kernelSize"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
