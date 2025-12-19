<script setup lang="ts">
import { Sparkles, Sphere } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Color } from 'three'
import { shallowRef } from 'vue'

const uuid = 'staging-sparkles'

const lightRef = shallowRef()
const { value: mix } = useControls({ mix: { value: 0, min: 0, max: 1 } }, { uuid })
const { value: threshold } = useControls({ threshold: { value: 0.5, min: 0, max: 1 } }, { uuid })

const onLoop = ({ elapsed }: { elapsed: number }) => {
  if (lightRef.value) {
    lightRef.value.position.x = Math.cos(elapsed) * 2.5
    lightRef.value.position.y = Math.sin(elapsed) * 2.5
    lightRef.value.position.z = Math.sin(lightRef.value.position.y * Math.PI * 0.25) * 2
  }
}
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#333" @loop="onLoop">
    <TresPerspectiveCamera />
    <TresDirectionalLight ref="lightRef">
      <Sphere
        color="white"
        :scale="0.1"
      />
    </TresDirectionalLight>
    <Sphere :args="[0.5, 64, 64]">
      <TresMeshStandardMaterial :color="new Color('#222')" />
      <Sparkles
        :directional-light="lightRef"
        :mix-alpha="mix"
        :mix-color="mix"
        :mix-offset="mix"
        :mix-size="mix"
        :mix-surface-distance="mix"
        :normal-threshold="threshold"
        :noise-scale="100"
        :sequence-surface-distance="[0.1, 1.0]"
        :sequence-alpha="[[0.0, 0.1], [0.2, 1.0], [0.9, 1.0]]"
        :sequence-offset="[[0.5, [0, 0, 0]], [0.6, [0, -1, 0]]]"
        :alpha="1.0"
      />
    </Sphere>
  </TresCanvas>
</template>
