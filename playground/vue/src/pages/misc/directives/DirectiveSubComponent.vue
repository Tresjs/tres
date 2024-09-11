<script setup lang="ts">
import { vLightHelper } from '@tresjs/core'
</script>

<template>
  <TresDirectionalLight v-light-helper :position="[-1, 1, 0]" :intensity="1" />
</template>
