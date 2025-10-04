<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#3386E0',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { radius, blendFunction, sectorCount } = useControls({
  radius: { value: 10, min: 1, max: 40, step: 1 },
  sectorCount: { value: 4, min: 1, max: 8, step: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map((key: string) => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 5, 12.5]"
    />
    <OrbitControls auto-rotate />

    <TresAmbientLight :intensity="1.25" />

    <TresMesh :position-y="0">
      <TresBoxGeometry :args="[4, 4, 4]" />
      <TresMeshPhysicalMaterial color="white" :reflectivity="1" :roughness="0" :metalness="1.0" :clearcoat="1.0" />
    </TresMesh>

    <Suspense>
      <Environment background :blur="0" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <KuwaharaPmndrs :blendFunction="Number(blendFunction)" :radius="radius" :sectorCount="sectorCount" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
