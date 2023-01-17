<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
  shadows: true,
  alpha: false,
})
</script>

<template>
  <TresCanvas v-bind="state">
    <OrbitControls />
    <TresPerspectiveCamera :position="[8, 8, 8]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <TresScene>
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
