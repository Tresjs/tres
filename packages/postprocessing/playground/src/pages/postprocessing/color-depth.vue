<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ColorDepthPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { blendFunction, bits, opacity } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  bits: { value: 8, step: 1, min: 1, max: 32 },
  opacity: { value: 1, step: 0.1, min: 0, max: 1 },
})

const meshes: { position: [number, number, number], color: string }[] = [
  { position: [0, 0.5, 0], color: 'white' },
  { position: [0, 0.5, -10], color: 'red' },
  { position: [0, 0.5, 10], color: 'yellow' },
  { position: [-10, 0.5, 0], color: 'blue' },
  { position: [10, 0.5, 0], color: 'purple' },
]
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[17.5, 7.5, 5]" />
    <OrbitControls auto-rotate />

    <TresMesh
      v-for="(mesh, index) in meshes"
      :key="index"
      :position="mesh.position"
    >
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial :color="mesh.color" :roughness="0.25" />
    </TresMesh>

    <Suspense>
      <Environment background preset="umbrellas" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <ColorDepthPmndrs :blendFunction="Number(blendFunction)" :bits="bits" :opacity="opacity" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
