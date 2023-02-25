<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheEnvironment from '/@/components/TheEnvironment.vue'
// import TheEvents from '/@/components/TheEvents.vue'
import VectorSetProps from '/@/components/VectorSetProps.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TheEnvironment />
    <!-- <VectorSetProps /> -->
  </Suspense>
</template>
