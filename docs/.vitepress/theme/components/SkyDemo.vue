<script setup lang="ts">
import { OrbitControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas :tone-mapping-exposure="0.25">
    <TresPerspectiveCamera :position="[0, 0, 2000]" />
    <Sky />
    <OrbitControls
      :enable-pan="false"
      :enable-zoom="false"
    />
  </TresCanvas>
</template>
