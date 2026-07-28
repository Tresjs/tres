<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { ref, shallowRef } from 'vue'
import SamuraiGen from './Samurai.gen.vue'

const gl = {
  clearColor: '#1a1a1a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// SPIKE: proves a consumer can override a single node of the generated tree
// without editing the generated file. Regenerating Samurai.gen.vue keeps these.
const highlighted = ref(false)
const model = shallowRef()
</script>

<template>
  <div class="overlay">
    <button @click="highlighted = !highlighted">
      toggle slot override: {{ highlighted ? 'on' : 'off' }}
    </button>
    <p>nodes exposed: {{ Object.keys(model?.nodes ?? {}).length }}</p>
  </div>

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 1.5, 4]" :look-at="[0, 1, 0]" />
    <OrbitControls />

    <SamuraiGen ref="model">
      <!-- Override exactly one node. Everything else keeps its generated default. -->
      <template #Object_2="{ node }">
        <TresMesh :geometry="node.geometry">
          <TresMeshBasicMaterial :color="highlighted ? '#ff0055' : '#22d3ee'" :wireframe="highlighted" />
        </TresMesh>
      </template>
    </SamuraiGen>

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :intensity="2" :position="[5, 10, 5]" />
  </TresCanvas>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 1;
  top: 1rem;
  left: 1rem;
  color: white;
  font-family: monospace;
}
</style>
