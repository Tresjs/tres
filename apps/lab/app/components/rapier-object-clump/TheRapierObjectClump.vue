<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { EffectComposerPmndrs, N8AOPmndrs, SMAAPmndrs } from '@tresjs/post-processing'
import { Color } from 'three'
import TheClump from './TheClump.vue'
import ThePointer from './ThePointer.vue'

const { scene } = useTres()
watchEffect(() => {
  if (scene.value) { scene.value.background = new Color(0xDFDFDF) }
})
</script>

<template>
  <TresAmbientLight :intensity="0.5" />
  <TresSpotLight :position="[30, 30, 30]"
                 :intensity="1"
                 :angle="0.2"
                 :penumbra="1"
                 cast-shadow
                 :shadow-mapSize="[512, 512]"
  />
  <Environment files="/hdr/adamsbridge.hdr" />

  <Suspense>
    <Physics :gravity="[0, 2, 0]">
      <TheClump />
      <ThePointer />
    </Physics>
  </Suspense>

  <EffectComposerPmndrs :multisampling="0" disable-normal-pass>
    <N8AOPmndrs :ao-radius="2" :intensity="1.15" :distance-falloff="1" />
    <SMAAPmndrs />
  </EffectComposerPmndrs>
</template>
