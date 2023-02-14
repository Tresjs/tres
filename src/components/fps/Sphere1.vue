<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { TresInstance } from '@tresjs/core/dist/types'
import { shallowRef, ShallowRef } from 'vue'

const sphere1: ShallowRef<TresInstance | null> = shallowRef(null)

const { onLoop } = useRenderLoop()

let interval = 1000 / 30

onLoop(({ delta, elapsed }) => {
  if (sphere1.value && delta > interval) {
    sphere1.value.position.y = Math.sin(elapsed)
  }
})
</script>
<template>
  <TresMesh ref="sphere1" :scale="1" cast-shadow :position="[-4, 2, 0]">
    <TresSphereGeometry :args="[1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
