<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches } from '@tresjs/leches'
import TheChild from './TheChild.vue'

const uuid = 'leches-basic-parent-child'
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas window-size clear-color="#82DBC5">
    <TheChild />
  </TresCanvas>
</template>
