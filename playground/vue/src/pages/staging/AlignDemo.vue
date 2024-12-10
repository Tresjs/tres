<script setup lang="ts">
import { Align, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

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

const ctrl = useControls({
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
})
</script>

<template>
  <TresLeches />
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <OrbitControls />
    <TresAxesHelper :scale="2" :position="[0, 0, 0]" />
    <Align
      v-if="ctrl.vIf.value.value"
      :left="ctrl.left.value.value"
      :right="ctrl.right.value.value"
      :top="ctrl.top.value.value"
      :bottom="ctrl.bottom.value.value"
      :front="ctrl.front.value.value"
      :back="ctrl.back.value.value"
      :disable="ctrl.disable.value.value"
      :disable-x="ctrl.disableX.value.value"
      :disable-y="ctrl.disableY.value.value"
      :disable-z="ctrl.disableZ.value.value"
      :cache-key="ctrl.useCacheKey.value.value ? (() => Math.floor(elapsed * 0.001)) : undefined"
    >
      <TresMesh :position-x="Math.cos(elapsed * 0.001) * 2" :position-y="Math.sin(elapsed * 0.001) * 2" :scale-z="Math.cos(elapsed * 0.001) * 2">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </Align>
  </TresCanvas>
</template>
