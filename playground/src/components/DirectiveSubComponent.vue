<script setup lang="ts">
import { vLightHelper } from '@tresjs/core'
</script>

<template>
  <TresDirectionalLight v-light-helper :position="[3, 3, 3]" :intensity="1" />
</template>
