<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import FirstExperience from './Experience.vue'

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
  <SceneWrapper>
    <ClientOnly>
      <TresLeches />
    </ClientOnly>
    <TresCanvas
      render-mode="on-demand"
      clear-color="#82DBC5"
      @render="onRender"
    >
      <FirstExperience />
    </TresCanvas>
  </SceneWrapper>
</template>
