<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

import ManualExperience from './experience.vue'

const renderTimes = ref(0)

useControls({
  renderTimes: {
    value: renderTimes,
    type: 'graph',
    label: 'Render Times (ms)',
    onUpdate: () => {
      renderTimes.value = 0
    },
  },
})

function onRender() {
  renderTimes.value = 1
}
</script>

<template>
  <TresLeches />
  <TresCanvas
    render-mode="manual"
    clear-color="#82DBC5"
    @render="onRender"
  >
    <ManualExperience />
  </TresCanvas>
</template>
