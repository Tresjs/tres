<script setup lang="ts">
import { watch } from 'vue'
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useTexture } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { BackSide, NoToneMapping, SRGBColorSpace, Vector2 } from 'three'


const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { distortion, principalPoint, focalLength, skew } = useControls({
  distortion: { value: new Vector2(0.5, 0.5), min: 0, max: 1, step: 0.001 },
  principalPoint: { value: new Vector2(0.0, 0.0), min: 0, max: 1, step: 0.001 },
  focalLength: { value: new Vector2(0.5, 0.5), min: 0, max: 2, step: 0.001 },
  skew: { value: 0, min: -1, max: 1, step: 0.001 },
})

const { state: map } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/lens-distortion/room-map.png')
const { state: normalMap } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/lens-distortion/room-normal.png')

watch(map, (newMap) => {
  newMap.colorSpace = SRGBColorSpace
})

</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[-2, 1, 5]"
      />
      <OrbitControls auto-rotate />

      <TresMesh :position="[0, 2, 0]">
        <TresBoxGeometry :args="[8, 8, 8]" />
        <TresMeshStandardMaterial :side="BackSide" :map="map" :normal-map="normalMap" />
      </TresMesh>

      <TresMesh :position="[0, 0, 0]">
        <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
        <TresMeshNormalMaterial />
      </TresMesh>

      <TresAmbientLight :intensity="2" />

      <Suspense>
        <Environment background :blur=".25" preset="snow" />
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
  </div>

  <TresLeches :float="false" />
</template>
