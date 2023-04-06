<script setup lang="ts">
import { TresCanvas } from '/@/'

const context = ref()

watchEffect(() => {
  console.log(context)
})
</script>

<template>
  <TresCanvas ref="context" clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
