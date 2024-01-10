<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { useState } from '../composables/state'
import BlenderCube from './BlenderCube.vue'
import GraphPane from './GraphPane.vue'
import RenderingLogger from './RenderingLogger.vue'

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
  </TresCanvas>
</template>