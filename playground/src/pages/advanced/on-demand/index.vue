<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useState } from '../../../composables/state'
import GraphPane from '../../../components/GraphPane.vue'
import OnDemandExperience from './experience.vue'

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
    <OnDemandExperience />
  </TresCanvas>
</template>
