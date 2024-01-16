<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { useDevtoolsHook } from '../composables/useDevtoolsHook'

const { selectedObject, graph } = useDevtoolsHook()
</script>

<template>
  <Splitpanes
    class="h-full"
  >
    <Pane
      class="h-full p4 overflow-y-scroll"
      min-size="20"
    >
      <div v-if="graph">
        <SceneGraphItem :item="graph" />
      </div>
    </Pane>
    <Pane
      class="h-full"
    >
      <InspectorState v-if="selectedObject" />
    </Pane>
  </Splitpanes>
</template>

<style>
.splitpanes--vertical>.splitpanes__splitter {
  @apply bg-gray-200 dark:bg-gray-700;
  position: relative; 
}
</style>