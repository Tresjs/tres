<!-- eslint-disable ts/no-use-before-define -->

<script setup lang="ts">
import { gsap } from 'gsap'
import { Environment, OrbitControls, Precipitation, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, FishEyePmndrs } from '@tresjs/post-processing'
import { BackSide, NoToneMapping } from 'three'
import { ref, watch } from 'vue'
import { BlendFunction } from 'postprocessing'


const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const lensParams = [
  { lensSX: 1.0, lensSY: 1.0, lensFX: 0.0, lensFY: 1.0 },
  { lensSX: 0.5, lensSY: 1.0, lensFX: -0.25, lensFY: 0.75 },
  { lensSX: 1.0, lensSY: 1.0, lensFX: -1.0, lensFY: 1.0 },
  { lensSX: 0.8, lensSY: 0.8, lensFX: -0.5, lensFY: 0.5 },
  { lensSX: 1, lensSY: 1, lensFX: 0, lensFY: 2 },
  { lensSX: -0.7, lensSY: 0.7, lensFX: 0.5, lensFY: -0.5 },
  { lensSX: -1.2, lensSY: 1.2, lensFX: 1.0, lensFY: -1.0 },
  { lensSX: 1, lensSY: 1, lensFX: 0, lensFY: 0 },
  { lensSX: 0.9, lensSY: 0.9, lensFX: 1.5, lensFY: -1.5 },
  { lensSX: 1.3, lensSY: 1.3, lensFX: 1.5, lensFY: -1.0 },
]

const tweenParams = {
  duration: 2,
  ease: 'elastic.out(0.85,0.3)',
}

const localBlendFunction = ref(BlendFunction.NORMAL)

const currentIndex = ref(0)

const onSwitch = () => {
  currentIndex.value = (currentIndex.value + 1) % lensParams.length

  gsap.to(lensSX, { value: lensParams[currentIndex.value].lensSX, ...tweenParams })
  gsap.to(lensSY, { value: lensParams[currentIndex.value].lensSY, ...tweenParams })
  gsap.to(lensFX, { value: lensParams[currentIndex.value].lensFX, ...tweenParams })
  gsap.to(lensFY, { value: lensParams[currentIndex.value].lensFY, ...tweenParams })
}

const { enabled, lensSX, lensSY, lensFX, lensFY, scale } = useControls({
  acceptBtn: {
    label: 'Switch Lens',
    type: 'button',
    onClick: onSwitch,
    size: 'md',
  },
  lensSX: { value: lensParams[0].lensSX, step: 0.01, min: -2, max: 2 },
  lensSY: { value: lensParams[0].lensFY, step: 0.01, min: -2, max: 2 },
  lensFX: { value: lensParams[0].lensFX, step: 0.01, min: -2, max: 2 },
  lensFY: { value: lensParams[0].lensFY, step: 0.01, min: -2, max: 2 },
  scale: { value: 1.0, step: 0.01, min: 0.1, max: 2 },
  enabled: true,
})

watch(enabled, () => {
  localBlendFunction.value = enabled.value ? BlendFunction.NORMAL : BlendFunction.SKIP
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
      />
      <OrbitControls :target="[0, .5, 0]" auto-rotate :maxPolarAngle="Math.PI / 2" />

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
            :blendFunction="localBlendFunction"
            :lensS="[lensSX, lensSY]"
            :lensF="[lensFX, lensFY]"
            :scale="scale"
          />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
