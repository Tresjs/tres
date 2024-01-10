<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'

const { scene, internal } = useDevtoolsHook()
</script>

<template>
  <Splitpanes
    class="h-full"
  >
    <Pane
      class="h-full p4 overflow-y-scroll"
      min-size="20"
    >
      <div v-if="scene.objects > 0">
        <SceneGraphItem :item="scene.graph" />
      </div>
    </Pane>
    <Pane
      class="h-full"
    >
      <!-- <InspectorState v-if="internal?.selectedObject" /> -->
    </Pane>
  </Splitpanes>
</template>

<style>
.splitpanes--vertical>.splitpanes__splitter {
  @apply bg-gray-200 dark:bg-gray-700;
  position: relative; 
}
</style>