<script setup lang="ts">
import { Backdrop, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { Mesh } from 'three'
import { watch } from 'vue'
import { DepthOfFieldPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#ff9cce',
  shadows: true,
}

const { state: duckyState } = useGLTF(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf',
  { draco: true },
)

watch(duckyState, (model) => {
  if (!model) { return }
  model.scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
    }
  })
})

const { focusDistance, bokehScale, focusRange } = useControls({
  focusDistance: { value: 0.001, min: 0, max: 1, step: 0.001 },
  bokehScale: { value: 5.9, min: 0, max: 20, step: 0.1 },
  focusRange: { value: 0.011, min: 0, max: 0.5, step: 0.001 },
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 1, 3]"
      :look-at="[0, 0.75, 2]"
    />

    <Backdrop
      :floor="1.5"
      :scale="[100, 30, 30]"
      :position="[0, 0, -50]"
      receive-shadow
    >
      <TresMeshPhysicalMaterial
        :roughness="1"
        color="#ff9cce"
        :side="2"
      />
    </Backdrop>

    <TresGroup
      :position="[-5, 0.5, -10]"
      :scale="0.5"
    >
      <primitive
        v-if="duckyState"
        :object="duckyState.scene"
      />
    </TresGroup>

    <TresGroup
      :position="[0, 0.5, 0]"
      :scale="0.5"
    >
      <TresMesh cast-shadow>
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshPhysicalMaterial color="#ff9cce" :roughness="1" />
      </TresMesh>
    </TresGroup>

    <TresAmbientLight />
    <TresDirectionalLight
      :position="[5, 5, 5]"
      cast-shadow
    />

    <Suspense>
      <EffectComposerPmndrs>
        <DepthOfFieldPmndrs
          :bokeh-scale="bokehScale"
          :focus-distance="focusDistance"
          :focus-range="focusRange"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
