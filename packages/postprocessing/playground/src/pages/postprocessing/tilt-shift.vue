<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, TiltShiftPmndrs } from '@tresjs/post-processing'
import { BlendFunction, KernelSize, Resolution } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { blendFunction, offset, rotation, focusArea, feather, kernelSize, resolutionScale, resolutionX, resolutionY } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.NORMAL,
  },
  offset: { value: 0.0, min: -0.5, max: 0.5, step: 0.01 },
  rotation: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
  focusArea: { value: 0.4, min: 0, max: 1, step: 0.01 },
  feather: { value: 0.3, min: 0, max: 1, step: 0.01 },
  kernelSize: {
    options: Object.keys(KernelSize).map(key => ({
      text: key,
      value: KernelSize[key],
    })),
    value: KernelSize.MEDIUM,
  },
  resolutionScale: { value: 0.5, min: 0.1, max: 1, step: 0.1 },
  resolutionX: { value: Resolution.AUTO_SIZE, min: 0, max: 2048, step: 1 },
  resolutionY: { value: Resolution.AUTO_SIZE, min: 0, max: 2048, step: 1 },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 6]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresGridHelper :position="[0, -3, 0]" />

    <TresMesh :position="[0, 2, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#FF5733" :roughness="1" :transmission="0" />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#33FF57" :roughness="1" :transmission="0" />
    </TresMesh>

    <TresMesh :position="[0, -2, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#3357FF" :roughness="1" :transmission="0" />
    </TresMesh>

    <Suspense>
      <Environment background :blur=".25" preset="city" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <TiltShiftPmndrs
          :blendFunction="Number(blendFunction)"
          :offset="offset"
          :rotation="rotation"
          :focusArea="focusArea"
          :feather="feather"
          :kernelSize="Number(kernelSize)"
          :resolutionScale="resolutionScale"
          :resolutionX="resolutionX"
          :resolutionY="resolutionY"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
