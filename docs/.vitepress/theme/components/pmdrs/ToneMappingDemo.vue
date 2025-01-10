<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { dispose, TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'
import { ToneMappingMode } from 'postprocessing'
import { NoToneMapping } from 'three'
import { onUnmounted, shallowRef } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  toneMappingExposure: 1,
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const modelRef = shallowRef(null)

const { scene: model } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf', { draco: true })

const { toneMappingExposure, mode } = useControls({
  toneMappingExposure: {
    value: 1,
    min: 0,
    max: 10,
    step: 1,
  },
  mode: {
    options: Object.keys(ToneMappingMode).map(key => ({
      text: key,
      value: ToneMappingMode[key],
    })),
    value: ToneMappingMode.AGX,
  },
})

onUnmounted(() => {
  dispose(model)
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
    :toneMappingExposure="toneMappingExposure.value"
  >
    <TresPerspectiveCamera
      :position="[6.5, 6.5, 6.5]"
      :look-at="[0, 1, 0]"
    />
    <OrbitControls />

    <primitive ref="modelRef" :object="model" :position-y="-.5" :scale=".25" />

    <Suspense>
      <Environment background :blur=".35" preset="dawn" />
    </Suspense>

    <ContactShadows
      :opacity=".5"
      :position-y="-3.25"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <ToneMappingPmndrs :mode="Number(mode.value)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
