<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { reactive, ref, toRefs, watch } from 'vue'
import { usePerfProvider } from '../composables/usePerf'

const props = defineProps<{
  uuid?: string
}>()

const { uuid } = toRefs(props)

const perf = usePerfProvider(uuid?.value)

const memoryInfo = [{
  label: 'geometries',
  icon: 'i-iconoir-box-3d-three-points',
}, {
  label: 'textures',
  icon: 'i-iconoir-select-face-3d',
}]

const renderInfo = [{
  label: 'calls',
  icon: 'i-iconoir-comp-align-left',
}, {
  label: 'triangles',
  icon: 'i-iconoir-triangle',
}, {
  label: 'points',
  icon: 'i-iconoir-one-point-circle',
}, {
  label: 'lines',
  icon: 'i-iconoir-linear',
}]

const info = reactive({
  geometries: 0,
  textures: 0,
  calls: 0,
  triangles: 0,
  points: 0,
  lines: 0,
})

useRafFn(() => {
  info.geometries = perf.gl.info.memory.geometries
  info.textures = perf.gl.info.memory.textures
  info.calls = perf.gl.info.render.calls
  info.triangles = perf.gl.info.render.triangles
  info.points = perf.gl.info.render.points
  info.lines = perf.gl.info.render.lines  
})
</script>

<template>
  <div class="tl-p-4">
    <div class="tl-relative tl-px-4 tl-py-6 tl-grid tl-grid-cols-2 tl-border tl-border-solid tl-border-gray-300 tl-rounded tl-mb-8">
      <span class="tl-absolute tl-bg-white tl-text-gray-400 tl-px-2 tl-rounded -tl-top-2 tl-left-2">Memory</span>
      <template v-for="kpi in memoryInfo">
        <div class="tl-flex tl-flex-col tl-items-center">
          <div class="tl-flex tl-items-center tl-mb-2">
            <span class="tl-bg-gray-200 tl-text-gray-600 tl-rounded tl-p-1 tl-flex tl-w-4 tl-mr-1">
              <i
                class="tl-pl tl-text-sm"
                :class="kpi.icon"
              />
           
            </span>
          
            <span class="tl-ml-2 tl-font-bold tl-text">{{ info[kpi.label] }}</span>
          </div>
          <span class="tl-text-xs tl-text-gray-500">{{ kpi.label }}</span>
        </div>
      </template>
    </div>
    <div class="tl-relative tl-px-4 tl-py-6 tl-grid tl-grid-cols-2 tl-gap-4 tl-border tl-border-solid tl-border-gray-300 tl-rounded ">
      <span class="tl-absolute tl-bg-white tl-text-gray-400 tl-px-2 tl-rounded -tl-top-2 tl-left-2">Render</span>
      <template v-for="kpi in renderInfo">
        <div class="tl-flex tl-flex-col tl-items-center">
          <div class="tl-flex tl-items-center tl-mb-2">
            <span class="tl-bg-gray-200 tl-text-gray-600 tl-rounded tl-p-1 tl-flex tl-w-4 tl-mr-1">
              <i
                class="tl-pl tl-text-sm"
                :class="kpi.icon"
              />
           
            </span>
          
            <span class="tl-ml-2 tl-font-bold tl-text">{{ info[kpi.label] }}</span>
          </div>
          <span class="tl-text-xs tl-text-gray-500">{{ kpi.label }}</span>
        </div>
      </template>
    </div>
  </div>
</template>