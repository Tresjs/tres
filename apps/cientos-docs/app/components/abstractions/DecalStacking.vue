<script setup lang="ts">
import { Decal, DecalDebugUI, OrbitControls, useTextures } from '@tresjs/cientos'
import type { DecalEditorSession, DecalJsonEntry } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { computed, reactive, shallowRef, watch } from 'vue'
import { SRGBColorSpace } from 'three'

const { textures } = useTextures([
  '/cientos/decal/tresjs-dark.png',
  '/cientos/decal/vue.png',
])

watch(textures, (list) => {
  if (Array.isArray(list)) {
    list.forEach((t) => { if (t) { t.colorSpace = SRGBColorSpace } })
  }
}, { immediate: true })

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  cube: [
    {
      id: 'back',
      position: [0, 0, 0.5],
      orientation: [0, 0, 0],
      size: [0.95, 0.22, 1],
      zIndex: 0,
      map: 'tresjs-dark.png',
    },
    {
      id: 'front',
      position: [0.15, -0.15, 0.5],
      orientation: [0, 0, 0.4],
      size: [0.5, 0.5, 1],
      zIndex: 1,
      map: 'vue.png',
    },
  ],
})

const decalRef = shallowRef<{ editor: DecalEditorSession } | null>(null)
const session = computed(() => decalRef.value?.editor ?? null)
</script>

<template>
  <div class="decal-stage">
    <DecalDebugUI
      contained
      :session="session"
      :textures="textures ?? []"
      :data="layout"
    />

    <TresCanvas clear-color="#fbb03b">
      <TresPerspectiveCamera :position="[1.5, 1.5, 3]" />
      <OrbitControls />
      <TresMesh name="cube">
        <TresBoxGeometry />
        <TresMeshStandardMaterial color="#888888" />
        <Decal
          ref="decalRef"
          v-model:data="layout.cube"
          :map="textures ?? []"
          :layer-gap="0.002"
          editable
        />
      </TresMesh>
      <TresAmbientLight :intensity="1.2" />
      <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.decal-stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
