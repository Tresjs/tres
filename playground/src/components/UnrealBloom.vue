<script setup lang="ts">
import { Color, BasicShadowMap, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { BlendFunction } from 'postprocessing'
import { EffectComposer, Bloom } from '@tresjs/post-processing'
import { onMounted, reactive, ref } from 'vue'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  intensity: 4.0,
  blendFunction: BlendFunction.ADD,
})

const { pane } = useTweakPane()

pane.addInput(bloomParams, 'luminanceThreshold', { min: 0, max: 1 })
pane.addInput(bloomParams, 'luminanceSmoothing', { min: 0, max: 1 })
pane.addInput(bloomParams, 'intensity', { min: 0, max: 10 })

const materialRef = ref(null)

onMounted(() => {
  if (materialRef.value) {
    pane.addInput(materialRef.value, 'emissiveIntensity', { min: 0, max: 10, step: 0.1 })
  }
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
    :disable-render="true"
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
      <EffectComposer :depth-buffer="true">
        <Bloom
          v-bind="bloomParams"
          mipmap-blur
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
