<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import TheExperience from './Experience.vue'
</script>

<template>
  <SceneWrapper>
    <TresCanvas
      clear-color="#82DBC5"
    >
      <TheExperience />
    </TresCanvas>
  </SceneWrapper>
</template>