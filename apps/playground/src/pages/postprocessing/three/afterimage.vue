<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useLoop } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Afterimage, EffectComposer } from '@tresjs/post-processing'
import { shallowRef } from 'vue'

const { damp, enabled } = useControls({
  damp: { value: 0.96, min: 0, max: 1, step: 0.01 },
  enabled: true,
}, {
  uuid: 'postprocessing-three-afterimage',
})

const torusRef = shallowRef()

const RotateKnot = () => {
  const { onBeforeRender } = useLoop()
  onBeforeRender(({ elapsed }) => {
    if (torusRef.value) {
      torusRef.value.rotation.x = elapsed * 0.4
      torusRef.value.rotation.y = elapsed * 0.6
    }
  })
}
</script>

<template>
  <TresLeches uuid="postprocessing-three-afterimage" />
  <TresCanvas render-mode="always">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <TresMesh ref="torusRef">
      <TresTorusKnotGeometry :args="[1.5, 0.5, 128, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresGridHelper />

    <RotateKnot />

    <EffectComposer>
      <Afterimage v-if="enabled" :damp="damp" />
    </EffectComposer>
  </TresCanvas>
</template>
