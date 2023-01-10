<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheGroups from '/@/components/TheGroups.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TheGroups />
  </Suspense>
</template>
