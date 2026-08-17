<script setup lang="ts">
import { Instance } from '@tresjs/cientos'
</script>

<template>
  <TresGroup>
    <Instance batch="Body" :position="[0, 0.6, 0]" />
    <Instance batch="Body" :position="[0, 1.6, 0]" :scale="[0.6, 0.6, 0.6]" />
    <Instance batch="Eye" :position="[-0.18, 1.7, 0.32]" />
    <Instance batch="Eye" :position="[0.18, 1.7, 0.32]" />
  </TresGroup>
</template>
