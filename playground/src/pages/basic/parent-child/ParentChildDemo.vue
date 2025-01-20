<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches } from '@tresjs/leches'
import TheChild from './TheChild.vue'
</script>

<template>
  <TresLeches />
  <TresCanvas window-size clear-color="#82DBC5">
    <TheChild />
  </TresCanvas>
</template>
