<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheEvents from '/@/components/TheEvents.vue'
import { CameraType, useCamera } from '.'

useTweakPane()
const { createCamera, activeCamera } = useCamera()
createCamera(CameraType.Orthographic)
console.log('activeCamera', activeCamera)
</script>

<template>
  <Suspense>
    <TheEvents />
  </Suspense>
</template>
