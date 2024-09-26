<script lang="ts" setup>
import type { Intersection, Object3D } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer, Outline } from '@tresjs/post-processing'
import { KernelSize } from 'postprocessing'
import { NoToneMapping } from 'three'

import { ref } from 'vue'
import { useRouteDisposal } from '../composables/useRouteDisposal'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#121212',
  toneMapping: NoToneMapping,
  disableRender: true,
}

const { effectComposer } = useRouteDisposal()

const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid)) { outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid) }
  else { outlinedObjects.value = [...outlinedObjects.value, object] }
}

const { edgeStrength, pulseSpeed, visibleEdgeColor, blur, kernelSize } = useControls({
  edgeStrength: {
    value: 8000,
    min: 0,
    max: 8000,
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
    value: 0,
    min: KernelSize.VERY_SMALL,
    max: KernelSize.VERY_LARGE,
    step: 1,
  },
})

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
useRouteDisposal(effectComposer)
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
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
        <TresMeshStandardMaterial color="hotpink" />
      </TresMesh>
    </template>
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />
    <Suspense>
      <EffectComposer ref="effectComposer">
        <Outline
          :outlined-objects="outlinedObjects"
          :blur="blur.value"
          :edge-strength="edgeStrength.value"
          :pulse-speed="pulseSpeed.value"
          :visible-edge-color="visibleEdgeColor.value"
          :kernel-size="kernelSize.value"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
