<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { shallowRef } from 'vue'

const tOrF = shallowRef(false)
const tOrFSlow = shallowRef(false)

useLoop().onBeforeRender(({ elapsed: _elapsed }) => {
  tOrF.value = !!(Math.floor(_elapsed) % 2)
  tOrFSlow.value = !!(Math.floor(_elapsed * 0.25) % 2)
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry v-if="tOrFSlow" />
    <TresSphereGeometry v-else />
    <TresMeshNormalMaterial v-if="tOrF" />
    <TresMeshBasicMaterial v-else color="red" />
  </TresMesh>
</template>
