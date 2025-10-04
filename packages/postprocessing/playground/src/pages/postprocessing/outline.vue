<script setup lang="ts">
import type { Intersection, Object3D } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, OutlinePmndrs } from '@tresjs/post-processing'
import { BlendFunction, KernelSize } from 'postprocessing'
import { computed, ref, watch, watchEffect } from 'vue'

const glComposer = {
  multisampling: 4,
}

const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid)) { outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid) }
  else { outlinedObjects.value = [...outlinedObjects.value, object] }
}

const { clearColor, edgeStrength, pulseSpeed, visibleEdgeColor, blur, kernelSize, blendMode, resolutionX, resolutionY, resolutionScale } = useControls({
  clearColor: '#4F4F4F',
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
  visibleEdgeColor: '#FFFF00',
  blur: true,
  kernelSize: {
    value: 3,
    min: KernelSize.VERY_SMALL,
    max: KernelSize.VERY_LARGE,
    step: 1,
  },
  blendMode: {
    value: BlendFunction.ADD,
    options: Object.entries(BlendFunction).map(([key, value]) => ({ text: key, value })),
  },
  resolutionX: {
    value: 1080,
    min: 1,
    max: 1080,
    step: 1,
  },
  resolutionY: {
    value: 1920,
    min: 1,
    max: 1920,
    step: 1,
  },
  resolutionScale: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },

})

const numericalBlendFunction = computed(() => {
  return Number(blendMode.value)
})

const sphereRef = ref<Object3D>()
const outlineRef = ref<InstanceType<typeof OutlinePmndrs>>()

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(outlineRef.value)
})

watch(sphereRef, (sphere) => {
  outlinedObjects.value = [sphere]
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    :clear-color="clearColor"
    render-mode="on-demand"
  >
    <TresPerspectiveCamera
      :position="[1, 3, 3]"
      :look-at="[2, 2, 2]"
    />
    <OrbitControls />
    <TresMesh
      ref="sphereRef"
      :position="[0, 0, 2]"
    >
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>
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
      <EffectComposerPmndrs v-bind="glComposer">
        <OutlinePmndrs
          ref="outlineRef"
          :outlined-objects="outlinedObjects"
          :blur="blur"
          :edge-strength="edgeStrength"
          :pulse-speed="pulseSpeed"
          :visible-edge-color="visibleEdgeColor"
          :kernel-size="kernelSize"
          :blend-function="numericalBlendFunction"
          :resolution-x="resolutionX"
          :resolution-y="resolutionY"
          :resolution-scale="resolutionScale"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
