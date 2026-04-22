<script setup lang="ts">
import { Environment, OrbitControls, Precipitation, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, FishEyePmndrs } from '@tresjs/post-processing'
import { BackSide, NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { enabled, lensSX, lensSY, lensFX, lensFY, scale } = useControls({
  lensSX: { value: 1.0, step: 0.01, min: -2, max: 2 },
  lensSY: { value: 1.0, step: 0.01, min: -2, max: 2 },
  lensFX: { value: 0.0, step: 0.01, min: -2, max: 2 },
  lensFY: { value: 1.0, step: 0.01, min: -2, max: 2 },
  scale: { value: 1.0, step: 0.01, min: 0.1, max: 2 },
  enabled: true,
}, { uuid })

const blendFunction = computed(() =>
  enabled?.value ? BlendFunction.NORMAL : BlendFunction.SKIP,
)

const lensS = computed<[number, number]>(() => [
  lensSX?.value ?? 1.0,
  lensSY?.value ?? 1.0,
])

const lensF = computed<[number, number]>(() => [
  lensFX?.value ?? 0.0,
  lensFY?.value ?? 1.0,
])
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls
      :target="[0, .5, 0]"
      auto-rotate
      :max-polar-angle="Math.PI / 2"
    />

    <Suspense>
      <Environment preset="snow" />
    </Suspense>

    <TresAmbientLight :intensity=".5" />

    <TresMesh :rotation-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[15, 15]" />
      <TresMeshPhysicalMaterial
        :metalness=".5"
        :roughness=".85"
      />
    </TresMesh>

    <TresMesh>
      <TresSphereGeometry :args="[7.5, 32, 32]" />
      <TresMeshPhysicalMaterial
        :metalness=".5"
        :roughness=".25"
        :side="BackSide"
      />
    </TresMesh>

    <RoundedBox
      v-for="(positionX, index) in [-1.75, 1.75]"
      :key="index"
      :position="positionX"
      :position-y="1.05"
      :args="[2, 2, 2, 2, 0.25]"
    >
      <TresMeshPhysicalMaterial
        :metalness="0.5"
        :roughness=".3"
      />
    </RoundedBox>

    <Precipitation
      :randomness="3"
      :speed="1"
      :count="2500"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <FishEyePmndrs
          :blend-function="blendFunction"
          :lens-s="lensS"
          :lens-f="lensF"
          :scale="scale"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
