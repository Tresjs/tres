<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { ref, shallowRef } from 'vue'
import Artificer from '@/models/Artificer.gen.vue'

const gl = {
  clearColor: '#1a1a1a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Overrides a single node of the generated tree without editing the generated file.
// Regenerate src/models/CyberSamurai.gen.vue with `tres gltf` and these survive:
//   tres gltf public/models/cyber_samurai/cyber_samurai.glb --slots all --shadows --force
const highlighted = ref(false)
const model = shallowRef()

// The generated component exposes `actions` keyed by clip name, so the union of the
// model's 76 clips reaches the parent: `clip` below only accepts one that exists.
type ArtificerAction = keyof NonNullable<InstanceType<typeof Artificer>['actions']>

const artificerRef = shallowRef<InstanceType<typeof Artificer>>()
const clips = computed(() => Object.keys(artificerRef.value?.actions ?? {}) as ArtificerAction[])
const clip = ref<ArtificerAction>('Idle')

watch([clips, clip], ([, name]) => {
  const actions = artificerRef.value?.actions
  if (!actions?.[name]) { return }
  Object.values(actions).forEach(action => action?.stop())
  actions[name].reset().fadeIn(0.2).play()
})
</script>

<template>
  <div class="overlay">
    <button @click="highlighted = !highlighted">
      toggle slot override: {{ highlighted ? 'on' : 'off' }}
    </button>
    <p>nodes exposed: {{ Object.keys(model?.nodes ?? {}).length }}</p>
    <select v-model="clip">
      <option v-for="name in clips" :key="name">{{ name }}</option>
    </select>
  </div>

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 1.5, 4]" :look-at="[0, 1, 0]" />
    <OrbitControls />

    <!-- <CyberSamurai ref="model">
      <template #Object_2="{ node }">
        <TresMesh :geometry="node.geometry">
          <TresMeshBasicMaterial :color="highlighted ? '#ff0055' : '#22d3ee'" :wireframe="highlighted" />
        </TresMesh>
      </template>
</CyberSamurai> -->

    <Artificer ref="artificerRef" />

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
