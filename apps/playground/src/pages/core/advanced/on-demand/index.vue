<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import OnDemandExperience from './experience.vue'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'core-advanced-on-demand'

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
}, { uuid })

function onRender() {
  renderTimes.value = 1
}
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    render-mode="on-demand"
    clear-color="#82DBC5"
    @render="onRender"
  >
    <OnDemandExperience />
  </TresCanvas>
</template>
