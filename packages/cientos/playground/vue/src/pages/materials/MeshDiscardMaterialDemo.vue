<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshDiscardMaterial } from '@tresjs/cientos'

const i = shallowRef(0)

let intervalId: string | number | NodeJS.Timeout | undefined
onMounted(() => {
  intervalId = setInterval(() => {
    i.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <TresMesh>
      <TresBoxGeometry />
      <MeshDiscardMaterial v-if="i % 2" />
      <TresMeshNormalMaterial v-else />
      <TresMesh :position-y="1" :scale="0.33">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresMesh>
  </TresCanvas>
</template>
