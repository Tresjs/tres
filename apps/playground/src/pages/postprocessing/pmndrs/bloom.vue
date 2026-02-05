<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction, KernelSize } from 'postprocessing'
import { BasicShadowMap, Color, NoToneMapping } from 'three'
import { onMounted, ref, watch } from 'vue'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const uuid = 'bloom-pmndrs'

useControls('fpsgraph', { uuid })

const materialRef = ref()
const {
  intensity,
  blendFunction,
  resolution,
  kernelSize,
  mipmapBlur,
  threshold,
  smoothing,
} = useControls({
  intensity: {
    value: 4.0,
    min: 0,
    max: 10,
    step: 0.1,
  },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.ADD,
  },
  resolution: {
    value: 256,
    min: 64,
    max: 512,
    step: 64,
  },
  kernelSize: {
    options: Object.keys(KernelSize).map(key => ({
      text: key,
      value: KernelSize[key],
    })),
    value: KernelSize.VERY_SMALL,
  },
  mipmapBlur: true,
  threshold: {
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.01,
  },
  smoothing: {
    value: 0.3,
    min: 0,
    max: 1,
    step: 0.01,
  },
}, { uuid })

onMounted(() => {
  if (materialRef.value) {
    const { value: emissiveIntensity } = useControls({
      emissiveIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
      },
    }, { uuid })

    watch(emissiveIntensity, (newValue) => {
      materialRef.value.emissiveIntensity = newValue
    })
  }
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="9"
      />
    </TresMesh>
    <TresMesh :position="[2, 2, -2]">
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        ref="materialRef"
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="1"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="2"
    />
    <Suspense>
      <EffectComposerPmndrs :depth-buffer="true">
        <BloomPmndrs
          :luminance-threshold="threshold"
          :luminance-smoothing="smoothing"
          :intensity="intensity"
          :blend-function="blendFunction"
          :kernel-size="kernelSize"
          :resolution="resolution"
          :mipmap-blur="mipmapBlur"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
