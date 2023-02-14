<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  shadows: true,
  alpha: false,
  clearColor: '#4f4f4f',
})
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="75" :aspect="1" :near="0.1" :far="1000" />
    <TresScene>
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
