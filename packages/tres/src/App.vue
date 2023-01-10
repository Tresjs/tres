<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import FBXModels from '/@/components/FBXModels.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <FBXModels />
  </Suspense>
</template>
