<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { computed, ref, shallowRef, watch } from 'vue'
import Engineer from '@/models/Engineer.gen.vue'

// Engineer.glb carries the rig and zero clips; the 39 clips live in three KayKit libraries
// beside it. The generated component loads all four and merges them, so `actions` is typed
// with the union across every file — 37 entries, T-Pose being in all three:
//   tres gltf public/models/Engineer.glb -o src/models \
//     -a public/models/animations/Rig_Medium/Rig_Medium_General.glb \
//     -a public/models/animations/Rig_Medium/Rig_Medium_MovementBasic.glb \
//     -a public/models/animations/Rig_Medium/Rig_Medium_MovementAdvanced.glb
const gl = {
  clearColor: '#1a1a1a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

type EngineerAction = keyof NonNullable<InstanceType<typeof Engineer>['actions']>

const engineerRef = shallowRef<InstanceType<typeof Engineer>>()
const clips = computed(() => Object.keys(engineerRef.value?.actions ?? {}) as EngineerAction[])
const clip = ref<EngineerAction>('Idle_A')

watch([clips, clip], ([, name]) => {
  const actions = engineerRef.value?.actions
  if (!actions?.[name]) { return }
  Object.values(actions).forEach(action => action?.stop())
  actions[name].reset().fadeIn(0.2).play()
})
</script>

<template>
  <div class="overlay">
    <p>clips merged from separate files: {{ clips.length }}</p>
    <select v-model="clip">
      <option v-for="name in clips" :key="name">{{ name }}</option>
    </select>
  </div>

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 1.5, 4]" :look-at="[0, 1, 0]" />
    <OrbitControls />

    <Engineer ref="engineerRef" />

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
