<script setup lang="ts">
import { vAlwaysLookAt, vLightHelper } from '@tresjs/core'
</script>

<template>
  <TresDirectionalLight v-light-helper v-always-look-at="[0, 0, 0]" :position="[3, 3, 3]" :intensity="1" />
</template>
