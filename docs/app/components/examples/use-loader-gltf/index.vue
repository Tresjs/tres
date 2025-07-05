<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import FirstExperience from './Experience.vue'
</script>

<template>
  <SceneWrapper>
    <TresCanvas
      clear-color="#82DBC5"
    >
      <FirstExperience />
    </TresCanvas>
  </SceneWrapper>
</template>
