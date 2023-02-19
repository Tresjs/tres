<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheEnvironment from '/@/components/TheEnvironment.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TheEnvironment />
  </Suspense>
</template>
