<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useState } from '../../composables/state'
import BlenderCube from '../../components/BlenderCube.vue'
import GraphPane from '../../components/GraphPane.vue'
import RenderingLogger from '../../components/RenderingLogger.vue'

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}
</script>

<template>
  <GraphPane />
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
    <TheSphere />
  </TresCanvas>
</template>
