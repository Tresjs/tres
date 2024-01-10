<!-- eslint-disable max-len -->
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useDevtoolsHook } from '../composables/useDevtoolsHook'

const { scene, connected, state } = useDevtoolsHook()

watch(scene, () => {
  console.log('scene changed', scene.value)
})

// Scene Graph
</script>

<template>
  <div class="panel-grids-center h-full">
    <!-- <div class="max-w-300 w-full px20 ma">
      <div class="flex flex-wrap gap2">
        <RouterLink
          to="/scene-graph"
          class="p4 replace min-w-40 p4 theme-card-lime flex-col flex-auto"
        >
          <Icon
            class="text-4xl"
            name="i-carbon-web-services-container"
          />
          <code>Scene Graph</code>
        </RouterLink>
        <RouterLink
          to="/scene-graph"
          class="p4 replace min-w-40 p4 theme-card-lime flex-col flex-auto"
        >
          <Icon
            class="text-4xl"
            name="i-iconoir-dashboard-speed"
          />
          <code>Performance</code>
        </RouterLink>
      </div>
    </div> -->
    <!-- <div
      v-if="scene.objects > 0"
      class="flex flex-col gap-2"
    >
      <NSectionBlock
        icon="i-iconoir-movie"
        text="Scene Graph"
        :description="`Total Objects ${scene.objects}`"
      >
        <SceneGraphItem :item="scene.graph" />
      </NSectionBlock>
      <NSectionBlock
        icon="i-iconoir-dashboard-speed"
        text="Performance"
      >
        <template #actions>
          <NBadge n="green">
            FPS: {{ fps.value }}
          </NBadge>
          <NBadge
            n="yellow"
          >
            Memory: {{ Math.round(memory?.currentMem) }}MB
          </NBadge>
        </template>
        <template #default>
          <PerformanceMonitor />
        </template>
      </NSectionBlock>
    </div>
    <div v-else-if="scene.objects === 0">
      <div class="p4 h-full">
        <NLoading />
      </div>
    </div>
    <div v-else>
      <NTip n="yellow">
        Failed to connect to the client. Did you open this page inside Nuxt DevTools?
      </NTip>
    </div> -->
  </div>
</template>
