<script setup lang="ts">
import {
  ContactShadows,
  Decal,
  Environment,
  OrbitControls,
  useGLTF,
  useTextures,
} from '@tresjs/cientos'
import type { DecalEditorSession, DecalJsonEntry } from '@tresjs/cientos'
import { TresCanvas, useGraph, useLoader } from '@tresjs/core'
import { computed, reactive, watch } from 'vue'
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

const { state: model, nodes } = useGLTF(
  '/models/Mug.glb',
  {
    draco: true,
  },
)

const mug = computed(() => nodes.value?.Mug)

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  mug: [

  ],
})

watch(layout, (layout) => {
  console.log('Layout changed:', layout)
}, { deep: true, immediate: true })

const decalRef = shallowRef<{ editor: DecalEditorSession } | null>(null)
const session = computed(() => decalRef.value?.editor ?? null)
</script>

<template>
  <div class="decal-stage">
    <DecalDebugUI :session="session" :textures="textures ?? []" :data="layout" />
    <TresCanvas clear-color="#fbb03b">
      <TresPerspectiveCamera :position="[2, 3, 3]" />
      <OrbitControls auto-rotate :target="[0, 0.5, 0]" />

      <TresGroup v-if="mug" :position="[0, 1, 0]">
        <primitive v-if="mug?.children[1]" :object="mug?.children[1]">
          <primitive v-if="mug.children[1].material" :object="mug.children[1].material" attach="material" />
          <Decal ref="decalRef" v-model:data="layout.mug" :map="textures" :cull-threshold="0.7" editable />
        </primitive>
        <primitive v-if="mug?.children[0]" :object="mug?.children[0]">
          <primitive v-if="mug.children[0].material" :object="mug.children[0].material" attach="material" />
        </primitive>
      </TresGroup>

      <TresAmbientLight :intensity="0.6" />

      <Suspense>
        <Environment :blur="0.2" preset="studio" />
      </Suspense>

      <ContactShadows :position-y="-0.01" :opacity="0.6" :blur="2.5" :scale="6" />
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
