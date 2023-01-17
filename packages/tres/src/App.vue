<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import AnimatedModel from '/@/components/AnimatedModel.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <AnimatedModel />
  </Suspense>
</template>
