<script setup lang="ts">
import { Align, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const elapsed = shallowRef(0)
let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed.value += 1000 / 30
  }, 1000 / 30)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const {
  top, 
  left, 
  front, 
  bottom, 
  right, 
  back, 
  disable, 
  disableX, 
  disableY, 
  disableZ, 
  useCacheKey, 
  vIf,
} = useControls({
  top: false,
  left: false,
  front: false,
  bottom: false,
  right: false,
  back: false,
  disable: false,
  disableX: false,
  disableY: false,
  disableZ: false,
  useCacheKey: false,
  vIf: true,
  enabled: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <OrbitControls />
    <TresAxesHelper :scale="2" :position="[0, 0, 0]" />
    <Align
      v-if="vIf"
      :left="left"
      :right="right"
      :top="top"
      :bottom="bottom"
      :front="front"
      :back="back"
      :disable="disable"
      :disable-x="disableX"
      :disable-y="disableY"
      :disable-z="disableZ"
      :cache-key="useCacheKey ? (() => Math.floor(elapsed * 0.001)) : undefined"
    >
      <TresMesh :position-x="Math.cos(elapsed * 0.001) * 2" :position-y="Math.sin(elapsed * 0.001) * 2" :scale-z="Math.cos(elapsed * 0.001) * 2">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </Align>
  </TresCanvas>
</template>
