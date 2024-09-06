<script setup lang="ts">
import { Sparkles, Sphere } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { shallowRef } from 'vue'
import '@tresjs/leches/styles'

const lightRef = shallowRef()
const { value: mix } = useControls({
  mix: { value: 0, min: 0, max: 1, step: 0.01 },
})

useRenderLoop().onLoop(({ elapsed }) => {
  if (lightRef.value) {
    lightRef.value.position.x = Math.cos(elapsed) * 3
    lightRef.value.position.y = Math.sin(elapsed) * 3
  }
})
</script>

<template>
  <TresLeches class="top-0 important-left-4" />
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[-2.5, 0, 8]" />
    <TresDirectionalLight ref="lightRef">
      <Sphere
        color="white"
        :scale="0.1"
      />
    </TresDirectionalLight>
    <Sphere :args="[1, 16, 16]">
      <TresMeshBasicMaterial color="#222" />
      <Sparkles
        :directional-light="lightRef"
        :mix-alpha="mix"
        :mix-color="mix"
        :mix-offset="mix"
        :mix-size="mix"
        :mix-surface-distance="mix"
        :lifetime-sec="2"
        :sequence-alpha="[0.1, 1.0]"
        :sequence-surface-distance="[0.1, 0.5]"
      />
    </Sphere>
  </TresCanvas>
</template>
