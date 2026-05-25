<script setup lang="ts">
import {
  Decal,
  DecalDebugUI,
  OrbitControls,
  useTextures,
} from '@tresjs/cientos'
import type { DecalEditorSession, DecalJsonEntry } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { computed, reactive, shallowRef, watch } from 'vue'
import { SRGBColorSpace } from 'three'

const { textures } = useTextures([
  '/cientos/decal/tresjs-dark.png',
  '/cientos/decal/vue.png',
  '/cientos/decal/threejs.png',
  '/cientos/decal/nuxt-icon-logo-green.png',
])

watch(textures, (list) => {
  if (Array.isArray(list)) {
    list.forEach((t) => { if (t) { t.colorSpace = SRGBColorSpace } })
  }
}, { immediate: true })

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  cube: [
    {
      id: 'f2bca136-1a23-448f-9d4b-19e42e8a35fb',
      position: [-0.7000000000000004, -0.02851572822119386, 0.018801236772429952],
      orientation: [0, 1.5707963267948966, 0],
      size: [0.7071067811865475, 0.7071067811865475, 1],
      zIndex: 0,
      map: 'vue.png',
    },
  ],
  sphere: [
    {
      id: 'b1d87413-0b9d-433b-b004-3b21ca06dacb',
      position: [1.3655923530818699, 0.2012682361182101, 0.643343465037014],
      orientation: [-0.30558846465382106, 0.2816049414861999, 0.08744486530800645],
      size: [0.9749061269648661, 0.22261635970063873, 1],
      zIndex: 0,
      map: 'tresjs-dark.png',
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
      <TresPerspectiveCamera :position="[2.5, 1.5, 4]" />
      <OrbitControls />

      <TresMesh name="cube" :position="[-1.2, 0, 0]">
        <TresBoxGeometry />
        <TresMeshStandardMaterial color="#888888" />
        <Decal
          ref="decalRef"
          v-model:data="layout.cube"
          :map="textures"
          editable
        />
      </TresMesh>

      <TresMesh name="sphere" :position="[1.2, 0, 0]">
        <TresSphereGeometry :args="[0.7]" />
        <TresMeshStandardMaterial color="#888888" />
        <Decal v-model:data="layout.sphere" :map="textures" editable />
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
