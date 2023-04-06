<script setup lang="ts">
import { TresCanvas } from '/@/'

const context = ref()

watchEffect(() => {
  console.log(context)
})
const toLog = (value:any) => {
  console.log('click', value)
}
</script>

<template>
  <TresCanvas ref="context" clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera />
    <TresMesh 
    @pointer-move="(ev) => toLog(ev)"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
