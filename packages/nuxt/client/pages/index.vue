<!-- eslint-disable max-len -->
<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

// import { useDevtoolsHook } from '../composables/useDevtoolsHook'

// const client = useDevtoolsClient()

// Scene Graph
/* const { scene, memory, fps } = useDevtoolsHook() */

const tabs = [
  {
    label: 'Scene Graph',
    description: 'Explore and inspect the 3D scene hierarchy and object properties.',
    icon: 'i-lucide-film',
    slot: 'scene-graph' as const,
  },
  {
    label: 'Performance',
    description: 'Monitor frame rate, memory usage, and rendering statistics.',
    icon: 'i-lucide-chart-line',
    slot: 'performance' as const,
  },
  /*  {
    label: 'Assets',
    description: 'View all loaded textures, geometries, and materials in the scene.',
    icon: 'i-lucide-package',
    slot: 'assets' as const,
  }, */
] satisfies TabsItem[]
</script>

<template>
  <div
    class="pattern-bg "
  >
    <TheHeader />

    <main class="bg-(--ui-bg) p-8 min-h-[calc(100vh-var(--ui-header-height))] max-w-screen-xl mx-auto pt-2 bg-default">
      <UTabs
        :items="tabs"
        color="primary"
        size="lg"
        variant="link"
        :ui="{ trigger: 'grow' }"
        class="gap-4 w-full"
      >
        <template #scene-graph>
          <SceneGraph />
        </template>
        <template #performance>
          <PerformanceMonitor />
        </template>
        <!-- <template #assets>
          <AssetsMonitor />
        </template> -->
      </UTabs>
    </main>
  </div>
</template>
