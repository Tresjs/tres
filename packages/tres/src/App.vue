<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheEvents from '/@/components/TheEvents.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TheEvents />
  </Suspense>
</template>
