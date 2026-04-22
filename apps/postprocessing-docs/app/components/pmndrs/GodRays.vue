<script setup lang="ts">
import { Environment, OrbitControls, useTexture } from '@tresjs/cientos'
import { TresCanvas, useLoop } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import type { Mesh } from 'three'
import { BackSide, NoToneMapping } from 'three'
import { BlendFunction, KernelSize } from 'postprocessing'
import { EffectComposerPmndrs, GodRaysPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const gl = {
  toneMapping: NoToneMapping,
}

const sphereMeshRef = ref<Mesh | null>(null)

const { state: pbrTexture } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/lens-distortion/room-map.png')

const { blur, kernelSize, resolutionScale, opacity, blendFunction, density, decay, weight, exposure, samples, clampMax } = useControls({
  kernelSize: {
    options: Object.keys(KernelSize).map(key => ({
      text: key,
      value: KernelSize[key as keyof typeof KernelSize],
    })),
    value: KernelSize.SMALL,
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
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SCREEN,
  },
}, { uuid })

const torusMeshes: Array<{ rotationY: number, position: [number, number, number], roughness: number, color: string }> = [
  { rotationY: Math.PI / 2, position: [-10, 2, 0], roughness: 0.1, color: '#82DBC5' },
  { rotationY: Math.PI / 2, position: [0, 2, 0], roughness: 0.3, color: '#505050' },
  { rotationY: Math.PI / 2, position: [10, 2, 0], roughness: 0.65, color: '#FC7BAC' },
]

// Animate light source position using useLoop instead of gsap
let time = 0
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (!sphereMeshRef.value) { return }
  time += delta
  sphereMeshRef.value.position.x = Math.sin(time * 0.5) * 20
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 5, 35]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh
      ref="sphereMeshRef"
      :position="[-20, 2, 0]"
    >
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshBasicMaterial
        color="#FFDDAA"
        :transparent="true"
      />
    </TresMesh>

    <template
      v-for="(mesh) in torusMeshes"
      :key="`demo-god-rays-${mesh.color}`"
    >
      <TresMesh
        :rotation-y="mesh.rotationY"
        :position="mesh.position"
      >
        <TresTorusGeometry :args="[5, 2, 16, 100]" />
        <TresMeshPhysicalMaterial
          :roughness="mesh.roughness"
          :color="`${mesh.color}`"
        />
      </TresMesh>
    </template>

    <TresMesh :position="[0, 2, 0]">
      <TresBoxGeometry :args="[50, 50, 50]" />
      <TresMeshStandardMaterial
        v-if="pbrTexture"
        :side="BackSide"
        :map="pbrTexture"
      />
    </TresMesh>

    <Suspense>
      <Environment preset="shangai" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <GodRaysPmndrs
          :opacity="opacity"
          :light-source="sphereMeshRef"
          :blend-function="Number(blendFunction)"
          :density="density"
          :decay="decay"
          :weight="weight"
          :exposure="exposure"
          :samples="samples"
          :clamp-max="clampMax"
          :resolution-scale="resolutionScale"
          :kernel-size="kernelSize"
          :blur="blur"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
