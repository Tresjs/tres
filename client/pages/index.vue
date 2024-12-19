<!-- eslint-disable max-len -->
<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools-kit/iframe-client'

const client = useDevtoolsClient()

// Scene Graph
const { scene, memory, fps } = useDevtoolsHook()
</script>

<template>
  <div class="relative n-bg-base flex flex-col h-screen">
    <header
      class="p4 flex items-center justify-between hover:bg-active"
      border="b base"
    >
      <div class="flex items-center gap-4">
        <img

          src="/logo.svg"
          alt="tres logo"
        >
        <h2 class="opacity-60 font-bold">
          TresJS DevTools
        </h2>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          variant="ghost"
          color="white"
          size="sm"
          icon="i-carbon-document"
          target="_blank"
          to="https://docs.tresjs.org/"
        />
        <UButton
          variant="ghost"
          color="white"
          size="sm"
          icon="i-iconoir-github"
          target="_blank"
          to="https://github.com/Tresjs/nuxt"
        />
      </div>
    </header>

    <div
      v-if="client && scene.objects > 0"
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
    </div>
  </div>
</template>
