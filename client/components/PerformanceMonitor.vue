<script setup lang="ts">
import { useDevtoolsHook } from '../composables/useDevtoolsHook'
import { bytesToKB } from '../utils'

const { fps, memory, renderer } = useDevtoolsHook()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <NCard
      class="col-span-1"
      n="green"
    >
      <DevtoolsGraph
        :points="fps.accumulator"
        :value="fps.value"
        color="green"
        n="green"
        unit="FPS"
        label="FPS"
      />
    </NCard>
    <NCard
      class="col-span-1"
      n="green"
    >
      <DevtoolsGraph
        :points="memory.accumulator"
        :value="memory.currentMem"
        color="yellow"
        n="yellow"
        unit="MB"
        label="memory"
      />
    </NCard>
    <DevtoolsPane title="Memory ">
      <div class="flex p4 justify-around w-full">
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center font-mono gap-2">
            {{ renderer.info?.memory?.geometries || 0 }}
            <i class="i-iconoir-box-3d-three-points" />
          </div>
          <span class="text-xs dark:text-gray-400 text-gray-500">Geometries</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center font-mono gap-2 ">
            {{ renderer.info?.memory?.textures || 0 }}
            <i class="i-iconoir-select-face-3d" />
          </div>
          <span class="text-xs dark:text-gray-400 text-gray-500">Textures</span>
        </div>
      </div>
      <div class="p4">
        <NTip class="text-sm">
          <div class="flex items-center gap-2 dark:text-gray-400 text-gray-500">
            <Icon
              class="flex-shrink-0"
              name="carbon:information"
            />
            <span class="flex items-center">
              Memory allocated by objects is approx <strong class="ml-1">{{ bytesToKB(memory.allocatedMem) }} KB</strong>
            </span>
          </div>
        </NTip>
      </div>
    </DevtoolsPane>
    <DevtoolsPane title="Render">
      <div class="grid grid-cols-2 p4 justify-around w-full">
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.calls || 0 }}
            <i class="i-iconoir-comp-align-left" />
          </div>
          <span class="text-xs dark:text-gray-400 text-gray-500">Calls</span>
        </div>
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.triangles || 0 }}
            <i class="i-iconoir-triangle" />
          </div>
          <span class="text-xs dark:text-gray-400 text-gray-500">Triangles</span>
        </div>
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.points || 0 }}
            <i class="i-iconoir-one-point-circle" />
          </div>
          <span class="text-xs dark:text-gray-400 text-gray-500">Points</span>
        </div>
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.lines || 0 }}
            <i class="i-iconoir-linear" />
          </div>
          <span class="text-xs dark:text-gray-400 text-gray-500">Lines</span>
        </div>
      </div>
    </DevtoolsPane>
  </div>
  <div class="">
    <DevtoolsPane title="Programs">
      <ProgramsModule />
    </DevtoolsPane>
  </div>
</template>
