<script setup lang="ts">
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { onMounted } from 'vue'
import { useState } from '../composables/state'

const { renderingTimes } = useState()

const state = useTresContext()

function manualInvalidate() {
  state.invalidate()
}

onMounted(() => {
  manualInvalidate()
})
</script>

<template>
  <OrbitControls
    @change="manualInvalidate"
  />
</template>