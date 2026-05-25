<script setup lang="ts">
import { Environment, OrbitControls, useTexture } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { BackSide, NoToneMapping, SRGBColorSpace, Vector2 } from 'three'

const uuid = inject<string>('uuid')

const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { distortionX, distortionY, principalPointX, principalPointY, focalLengthX, focalLengthY, skew } = useControls({
  distortionX: { value: 0.5, min: 0, max: 1, step: 0.001 },
  distortionY: { value: 0.5, min: 0, max: 1, step: 0.001 },
  principalPointX: { value: 0.0, min: 0, max: 1, step: 0.001 },
  principalPointY: { value: 0.0, min: 0, max: 1, step: 0.001 },
  focalLengthX: { value: 0.5, min: 0, max: 2, step: 0.001 },
  focalLengthY: { value: 0.5, min: 0, max: 2, step: 0.001 },
  skew: { value: 0, min: -1, max: 1, step: 0.001 },
}, { uuid })

const distortion = computed(() => new Vector2(distortionX?.value ?? 0.5, distortionY?.value ?? 0.5))
const principalPoint = computed(() => new Vector2(principalPointX?.value ?? 0.0, principalPointY?.value ?? 0.0))
const focalLength = computed(() => new Vector2(focalLengthX?.value ?? 0.5, focalLengthY?.value ?? 0.5))

const { state: map } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/lens-distortion/room-map.png')
const { state: normalMap } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/lens-distortion/room-normal.png')

watch(map, (newMap) => {
  if (newMap) { newMap.colorSpace = SRGBColorSpace }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-2, 1, 5]" />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 2, 0]">
      <TresBoxGeometry :args="[8, 8, 8]" />
      <TresMeshStandardMaterial
        :side="BackSide"
        :map="map"
        :normal-map="normalMap"
      />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresAmbientLight :intensity="2" />

    <Suspense>
      <Environment background :blur=".25" preset="snow" />
    </Suspense>

    <EffectComposerPmndrs v-bind="glComposer">
      <LensDistortionPmndrs
        :distortion="distortion"
        :principal-point="principalPoint"
        :focal-length="focalLength"
        :skew="skew"
      />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
