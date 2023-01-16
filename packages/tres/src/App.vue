<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheBasic from '/@/components/TheBasic.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TheBasic />
  </Suspense>
</template>
