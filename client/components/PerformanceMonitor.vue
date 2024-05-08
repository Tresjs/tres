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
      <Graph
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
      <Graph
        :points="memory.accumulator"
        :value="memory.currentMem"
        color="yellow"
        n="yellow"
        unit="MB"
        label="memory"
      />
    </NCard>
    <Pane title="Memory ">
      <div class="flex p4 justify-around w-full">
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center font-mono gap-2">
            {{ renderer.info?.memory?.geometries || 0 }}
            <i class="i-iconoir-box-3d-three-points"></i>
          </div>
          <span class="text-xs text-gray-500">Geometries</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center font-mono gap-2">
            {{ renderer.info?.memory?.textures || 0 }}
            <i class="i-iconoir-select-face-3d"></i>
          </div>
          <span class="text-xs text-gray-500">Textures</span>
        </div>
      </div>
      <div class="p4">
        <NTip class="text-sm">
          <Icon
            class="mr2"
            name="carbon:information"
          />Memory allocated by objects is aprox <strong>{{ bytesToKB(memory.allocatedMem) }} KB </strong>
        </NTip>
      </div>
    </Pane>
    <Pane title="Render">
      <div class="grid grid-cols-2 p4 justify-around w-full">
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.calls || 0 }}
            <i class="i-iconoir-comp-align-left"></i>
          </div>
          <span class="text-xs text-gray-500">Calls</span>
        </div>
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.triangles || 0 }}
            <i class="i-iconoir-triangle"></i>
          </div>
          <span class="text-xs text-gray-500">Triangles</span>
        </div>
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.points || 0 }}
            <i class="i-iconoir-one-point-circle"></i>
          </div>
          <span class="text-xs text-gray-500">Points</span>
        </div>
        <div class="flex flex-col items-center gap-2 mb4">
          <div class="flex items-center font-mono gap-2">
            {{ renderer?.info?.render?.lines || 0 }}
            <i class="i-iconoir-linear"></i>
          </div>
          <span class="text-xs text-gray-500">Lines</span>
        </div>
      </div>
    </Pane>
  </div>
  <div class="">
    <Pane title="Programs">
      <ProgramsModule />
    </Pane>
  </div>
</template>
