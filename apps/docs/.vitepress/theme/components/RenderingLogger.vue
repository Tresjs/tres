<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core'
import { onMounted } from 'vue'

/* const { renderingTimes } = useState() */

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
