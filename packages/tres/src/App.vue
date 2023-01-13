<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import Shapes from '/@/components/Shapes.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <Shapes />
  </Suspense>
</template>
