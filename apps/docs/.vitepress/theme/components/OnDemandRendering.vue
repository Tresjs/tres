<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import BlenderCube from './BlenderCube.vue'
import { TresLeches, useControls } from '@tresjs/leches'
import RenderingLogger from './RenderingLogger.vue'

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
    render-mode="on-demand"
    clear-color="#82DBC5"
    @render="onRender"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <Suspense>
      <BlenderCube />
    </Suspense>
    <TresGridHelper />
    <RenderingLogger />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="0.7"
    />
  </TresCanvas>
</template>
