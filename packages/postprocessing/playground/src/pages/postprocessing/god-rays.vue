<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction, KernelSize, Resolution } from 'postprocessing'
import { EffectComposerPmndrs, GodRaysPmndrs } from '@tresjs/post-processing'
import { shallowRef } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: 'blue',
  toneMapping: NoToneMapping,
}

const sphereMeshRef = shallowRef(null)

const { blur, kernelSize, resolutionX, resolutionY, resolutionScale, opacity, blendFunction, density, decay, weight, exposure, samples, clampMax } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SCREEN,
  },
  kernelSize: {
    options: Object.keys(KernelSize).map(key => ({
      text: key,
      value: KernelSize[key as keyof typeof KernelSize],
    })),
    value: KernelSize.SMALL,
  },
  resolutionX: {
    options: [Resolution.AUTO_SIZE, 240, 360, 480, 720, 1080],
    value: Resolution.AUTO_SIZE,
  },
  resolutionY: {
    options: [Resolution.AUTO_SIZE, 240, 360, 480, 720, 1080],
    value: Resolution.AUTO_SIZE,
  },
  opacity: { value: 1, step: 0.01, min: 0, max: 1.0 },
  density: { value: 0.96, step: 0.01, min: 0, max: 1.0 },
  decay: { value: 0.93, step: 0.01, min: 0, max: 1.0 },
  weight: { value: 0.4, step: 0.1, min: 0, max: 1.0 },
  exposure: { value: 0.6, step: 0.1, min: 0, max: 1.0 },
  samples: { value: 60, step: 1, min: 15, max: 200 },
  clampMax: { value: 1.0, step: 0.1, max: 1.0 },
  resolutionScale: { value: 0.5, step: 0.1, min: 0.1, max: 1.0 },
  blur: true,
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 5, 20]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh ref="sphereMeshRef" :position="[-10, 8, 0]">
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshBasicMaterial color="#FFDDAA" />
    </TresMesh>

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial color="white" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <GodRaysPmndrs
          :opacity="opacity"
          :lightSource="sphereMeshRef"
          :blendFunction="Number(blendFunction)"
          :density="density"
          :decay="decay"
          :weight="weight"
          :exposure="exposure"
          :samples="samples"
          :clampMax="clampMax"
          :resolutionScale="resolutionScale"
          :resolutionX="Number(resolutionX)"
          :resolutionY="Number(resolutionY)"
          :kernelSize="kernelSize"
          :blur="blur"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
