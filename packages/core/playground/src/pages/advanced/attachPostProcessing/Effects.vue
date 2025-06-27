<script lang="ts" setup>
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { UnrealBloomPass } from 'three-stdlib'
import { extend, useTres, useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'

extend({ EffectComposer, OutputPass, UnrealBloomPass, RenderPass })
const { renderer, scene, camera, sizes } = useTres()
const composer = shallowRef<EffectComposer>()

useTresContext().renderer.replaceRenderFunction(() => {
  if (composer.value) {
    composer.value!.render()
  }
})
</script>

<template>
  <TresEffectComposer
    ref="composer"
    :args="[renderer]"
    :set-size="[sizes.width.value, sizes.height.value]"
  >
    <TresRenderPass
      :args="[scene, camera]"
      attach="passes-0"
    />
    <TresUnrealBloomPass
      :args="[undefined, 0.5, 0.1, 0]"
      attach="passes-1"
    />
    <TresOutputPass
      attach="passes-2"
      :set-size="[sizes.width.value, sizes.height.value]"
    />
  </TresEffectComposer>
</template>
