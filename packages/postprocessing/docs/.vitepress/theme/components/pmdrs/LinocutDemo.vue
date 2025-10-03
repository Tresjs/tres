<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, LinocutPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#00ff00',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { blendFunction, scale, noiseScale, centerX, centerY, rotation } = useControls({
  scale: { value: 0.85, step: 0.01, min: 0, max: 2 },
  noiseScale: { value: 0.0, step: 0.01, min: 0, max: 1 },
  centerX: { value: 0.5, step: 0.01, min: 0, max: 1 },
  centerY: { value: 0.5, step: 0.01, min: 0, max: 1 },
  rotation: { value: 0.0, step: 0.01, min: -Math.PI, max: Math.PI },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[0, 6.5, 6.5]"
      />
      <OrbitControls auto-rotate />

      <TresMesh>
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshStandardMaterial color="yellow" />
      </TresMesh>

      <Suspense>
        <Environment :blur=".25" preset="snow" />
      </Suspense>

      <ContactShadows
        :opacity=".65"
        :position-y="-1"
        :scale="35"
        :blur="1"
      />

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <LinocutPmndrs
            :scale="scale"
            :noiseScale="noiseScale"
            :center="[centerX, centerY]"
            :rotation="rotation"
            :blendFunction="Number(blendFunction)"
          />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
