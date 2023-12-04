<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { computed, reactive, ref, toRefs } from 'vue'
import { usePerfProvider } from '../../composables/usePerf'
import { bytesToKB } from '../../utils'
import Graph from '../Graph.vue'
import Pane from './Pane.vue'
import Tree from './Tree.vue'

const props = defineProps<{
  uuid?: string
}>()

const { uuid } = toRefs(props)

const { gl, fps, memory } = usePerfProvider(uuid?.value)

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
  programs: [],
})

// Memory usage state

useRafFn(() => {
  info.geometries = gl.info.memory.geometries
  info.textures = gl.info.memory.textures
  info.calls = gl.info.render.calls
  info.triangles = gl.info.render.triangles
  info.points = gl.info.render.points
  info.lines = gl.info.render.lines,
  info.programs = gl.info.programs

})

// Folder
const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const programs = computed(() => info.programs.map(program => ({
  ...program,
  name: program.type,
  uniforms: program.getUniforms(),
})))
</script>

<template>
  <div class="tl-mb-4">
    <button
      class="
        tl-flex
        tl-items-center
        tl-justify-between
        tl-w-full
        tl-py-2
        tl-px-4
        tl-bg-gray-100
        tl-border-none
        tl-text-gray-400
        tl-font-bold
        tl-text-xs
        tl-font-sans
        tl-cursor-pointer
      "
      :aria-expanded="isOpen"
      aria-haspopup="true"
      role="button"
      tabindex="0"
      @click="toggle"
    >
      <span><i class="i-iconoir-dashboard-speed " /> Performance </span>
      <i :class="isOpen ? 'i-ic:baseline-keyboard-arrow-up' : 'i-ic:baseline-keyboard-arrow-down'" />
    </button>

    <Transition
      name="slide"
      enter-active-class="tl-animate-fade-in tl-animate-duration-200 tl-animate-ease-in-out"
      leave-active-class="tl-animate-fade-out tl-animate-duration-200 tl-animate-ease-in-out"
    >
      <div
        v-show="isOpen"
        class="tl-bg-white tl-rounded-b tl-pt-4"
        role="menu"
      >
        <div class="tl-p-2">
          <Pane :title="`Memory ${bytesToKB(memory.allocatedMem)}KB`">
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
          </Pane>
          <Graph
            :points="memory.accumulator"
            :value="memory.currentMem"
            unit="MB"
            label="memory"
          />
          <Pane title="Render">
            <template v-for="kpi in renderInfo">
              <div class="tl-flex tl-flex-col tl-items-center tl-mb-2">
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
          </Pane>
          <Pane title="Programs">
            <Tree :items="programs">
              <template #depth-0="{ item }">
                <pre class="tl-w-full tl-overflow tl-text-xxs">{{ item }}</pre>
              </template>
            </Tree>
          </Pane>
        </div>
      </div>
    </Transition>
  </div>
</template>