<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheExperience from '/@/components/TheExperience.vue'

useTweakPane()
</script>
<template>
  <Suspense>
    <TheExperience />
  </Suspense>
</template>
