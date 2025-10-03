<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { NoToneMapping, Vector2 } from 'three'


const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { distortion, principalPoint, focalLength, skew } = useControls({
  distortion: { value: new Vector2(0.5, 0.5), min: -1, max: 1, step: 0.001 },
  principalPoint: { value: new Vector2(0.0, 0.0), min: -0.5, max: 0.5, step: 0.001 },
  focalLength: { value: new Vector2(0.5, 0.5), min: -1, max: 1, step: 0.001 },
  skew: { value: 0, min: -1, max: 1, step: 0.001 },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 2]"
    />
    <OrbitControls auto-rotate :target="[0, 1, 0]" />

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#0f0f0f" :roughness=".5" />
    </TresMesh>

    <Suspense>
      <Environment background :blur=".25" preset="modern" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <LensDistortionPmndrs
          :distortion="distortion"
          :principalPoint="principalPoint"
          :focalLength="focalLength"
          :skew="skew"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
