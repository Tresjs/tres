<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Superformula, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#777">
    <Superformula
      :num-arms-b="24"
      :exp-b="[40, 30, 20]"
    >
      <TresMeshNormalMaterial />
    </Superformula>
    <OrbitControls />
  </TresCanvas>
</template>
