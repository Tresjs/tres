<script setup lang="ts">
import {
  ContactShadows,
  Decal,
  Environment,
  OrbitControls,
  useTextures,
} from '@tresjs/cientos'
import type { DecalJsonEntry } from '@tresjs/cientos'
import { TresCanvas, useGraph, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { computed, reactive, watch } from 'vue'
import { SRGBColorSpace } from 'three'
import type { Mesh } from 'three'

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

const { state: model } = useLoader(
  GLTFLoader,
  'https://cdn.jsdelivr.net/gh/Tresjs/assets@main/models/gltf/kuwahara-effect/plant-jar/plant-jar.glb',
)

const scene = computed(() => model.value?.scene)
const graph = useGraph(scene)
const nodes = computed(() => graph.value?.nodes)
const monstera = computed(() => nodes.value?.Circle005_MI_MZRa_Monstera_B03b_0 as Mesh | undefined)
const geometry = computed(() => monstera.value?.geometry ?? null)
const material = computed(() => monstera.value?.material ?? null)

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  monstera: [
    {
      id: '6afae594-df34-46bf-8325-46b3312f72d0',
      position: [0.3626286601101145, 0.4021399238560346, 0.24357676687283533],
      orientation: [2.62508205197366e-16, 0.8835728782404995, 0.020101617188606168],
      size: [0.5841731107699301, 0.13339385993959033, 1],
      zIndex: 0,
      map: 'tresjs-dark.png',
    },
    {
      id: 'e4a8b539-3da4-4f76-89a1-b95e85f20232',
      position: [-0.3029176984861308, 0.29592902317932507, -0.31392881058737493],
      orientation: [-3.141592653589793, -0.6872234485543977, -3.489940159858185],
      size: [0.3719579506024123, 0.3719579506024123, 1],
      zIndex: 1,
      map: 'vue.png',
    },
    {
      id: '3569b566-ad3d-49b0-94cb-58a1c4b4e74f',
      position: [-0.22496705677159, 0.5191790484971976, 0.3728115891129261],
      orientation: [2.5177369077176557e-16, -0.4908735721396683, 0.44645832021369497],
      size: [0.35573673342638823, 0.35573673342638823, 1],
      zIndex: 2,
      map: 'threejs.png',
    },
    {
      id: 'cdbdf9fa-7638-4704-b90e-45ee6de1d996',
      position: [0.25841402795432433, 0.5552780418170254, -0.35045203324643615],
      orientation: [-3.141592653589793, 0.6872234485543974, 2.9004920202248496],
      size: [0.32246107633759585, 0.32246107633759585, 1],
      zIndex: 4,
      map: 'nuxt-icon-logo-green.png',
    },
  ],
})
</script>

<template>
  <div class="decal-stage">
    <TresCanvas clear-color="#fbb03b">
      <TresPerspectiveCamera :position="[2, 1.5, 1.5]" />
      <OrbitControls auto-rotate :target="[0, 0.5, 0]" />

      <TresMesh
        v-if="geometry"
        name="monstera"
        :geometry="geometry"
        :rotation="[Math.PI / -2, 0, 0]"
      >
        <primitive v-if="material" :object="material" attach="material" />
        <Decal
          v-model:data="layout.monstera"
          :map="textures"
          :cull-threshold="0.7"
        />
      </TresMesh>

      <TresAmbientLight :intensity="0.6" />

      <Suspense>
        <Environment :blur="0.2" preset="snow" />
      </Suspense>

      <ContactShadows
        :position-y="-0.01"
        :opacity="0.6"
        :blur="2.5"
        :scale="6"
      />
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
