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
}

const glComposer = {
  multisampling: 4,
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
      value: ToneMappingMode[key as keyof typeof ToneMappingMode],
    })),
    value: ToneMappingMode.AGX,
  },
})

onUnmounted(() => {
  dispose(model)
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
      :toneMappingExposure="toneMappingExposure"
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
        <EffectComposerPmndrs v-bind="glComposer">
          <ToneMappingPmndrs :mode="Number(mode)" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
