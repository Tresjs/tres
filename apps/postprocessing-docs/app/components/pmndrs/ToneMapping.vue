<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { dispose, TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'
import { ToneMappingMode } from 'postprocessing'
import { NoToneMapping } from 'three'
import { onUnmounted, shallowRef } from 'vue'

const uuid = inject<string>('uuid')

const gl = {
  toneMappingExposure: 1,
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const modelRef = shallowRef(null)

const { state: pokeballState } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf', { draco: true })

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
}, { uuid })

onUnmounted(() => {
  if (pokeballState.value?.scene) { dispose(pokeballState.value.scene) }
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
    :tone-mapping-exposure="toneMappingExposure"
  >
    <TresPerspectiveCamera
      :position="[6.5, 6.5, 6.5]"
      :look-at="[0, 1, 0]"
    />
    <OrbitControls />

    <primitive v-if="pokeballState" ref="modelRef" :object="pokeballState.scene" :position-y="-.5" :scale=".25" />

    <Suspense>
      <Environment background :blur=".35" preset="dawn" />
    </Suspense>

    <ContactShadows
      :opacity=".5"
      :position-y="-3.25"
    />

    <EffectComposerPmndrs v-bind="glComposer">
      <ToneMappingPmndrs :mode="Number(mode)" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
