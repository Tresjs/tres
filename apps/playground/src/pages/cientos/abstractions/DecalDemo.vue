<script setup lang="ts">
import { TresCanvas, useGraph, useLoader } from '@tresjs/core'
import { Decal, DecalDebugUI, Environment, Levioso, OrbitControls, useTextures } from '@tresjs/cientos'
import type { DecalEditorSession, DecalJsonEntry } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { computed, reactive, shallowRef, watch } from 'vue'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const gl = { clearColor: '#F6B03B' }

const texturePaths = [
  '/decal/tresjs-dark.png',
  '/decal/vue.png',
  '/decal/threejs.png',
  '/decal/nuxt-icon-logo-green.png',
]

const { state: model } = useLoader(
  GLTFLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb',
  {
    extensions: (loader) => {
      if (loader instanceof GLTFLoader) { loader.setDRACOLoader(dracoLoader) }
    },
  },
)

const { textures } = useTextures(texturePaths)
const torusRef = shallowRef(null)

const scene = computed(() => model.value?.scene)
const graph = useGraph(scene)
const nodes = computed(() => graph.value?.nodes)

watch(textures, (val) => {
  if (Array.isArray(val)) {
    val.forEach((t) => { if (t) { t.colorSpace = SRGBColorSpace } })
  }
}, { immediate: true })

// Each key matches a mesh `name` below — v-model:data per <Decal> binds
// the matching slice. Round-trippable with DebugUI's Export/Import.
const layout = reactive<Record<string, DecalJsonEntry[]>>({
  sphere: [
    {
      id: 'e3afd976-dca7-497d-bcf6-68e6625be297',
      position: [-3.4922265729954427, 0.26725331634333394, 0.8106333695592625],
      orientation: [-0.3298032548505921, 0.4682006978024072, 0.12425180421956333],
      size: [1.106908401855486, 1.106908401855486, 1],
      zIndex: 0,
      map: 'threejs.png',
    },
  ],
  suzanne: [
    {
      id: '9ad6e32f-ef49-40c8-8567-53f52dc0624c',
      position: [3.0111985053019534, 0.829035974585427, -0.38492587784785925],
      orientation: [-0.840745123705727, 0.08346375229752682, 0.09287834699476438],
      size: [0.7071067811865475, 0.7071067811865475, 1],
      zIndex: 0,
      map: 'nuxt-icon-logo-green.png',
    },
  ],
  torus: [
    {
      id: '5fea975e-101d-444e-9da6-4e5ab0371257',
      position: [-1.9469826982736629, 0.9532231673319003, -2.1089730737492562],
      orientation: [0.19634964609804326, -0.006130809064538619, 0.0012194861717797015],
      size: [0.7071067811865475, 0.7071067811865475, 1],
      zIndex: 0,
      map: 'vue.png',
    },
  ],
  box: [
    {
      id: '30c70d8b-0b71-4804-bfb7-d37f1bd5b7cd',
      position: [0.05546218208796081, 0.05092198802941783, 1],
      orientation: [0, 0, 0.0032511508830421754],
      size: [1.5422767631013186, 0.35217343409400187, 1],
      zIndex: 2,
      map: 'tresjs-dark.png',
    },
  ],
})

const decalRef = shallowRef<{ editor: DecalEditorSession } | null>(null)
const session = computed(() => decalRef.value?.editor ?? null)
</script>

<template>
  <DecalDebugUI
    :session="session"
    :textures="textures ?? []"
    :data="layout"
  />

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 8]" />

    <Suspense>
      <Environment preset="hangar" />
    </Suspense>

    <OrbitControls make-default />

    <TresGridHelper :args="[10, 10]" :position-y="-1" />

    <TresMesh name="sphere" :position="[-4, 0, 0]">
      <TresSphereGeometry />
      <TresMeshStandardMaterial color="#f6f6f6" />
      <Decal
        ref="decalRef"
        v-model:data="layout.sphere"
        :map="textures"
        editable
      />
    </TresMesh>

    <Levioso :speed="1.5" :float-factor="2" :range="[-0.3, 0.3]">
      <TresMesh
        v-if="nodes?.Suzanne.geometry"
        name="suzanne"
        :geometry="nodes?.Suzanne.geometry"
        :position="[3, 0, 0]"
        :rotation="[0, Math.PI, 0]"
      >
        <primitive :object="nodes?.Suzanne.material" attach="material" />
        <Decal v-model:data="layout.suzanne" :map="textures" editable />
      </TresMesh>
    </Levioso>

    <TresMesh ref="torusRef" name="torus" :position="[-2, 0, -2.5]">
      <TresTorusGeometry :args="[1, 0.4, 16, 100]" />
      <TresMeshStandardMaterial color="#f6f6f6" />
    </TresMesh>

    <Decal
      v-model:data="layout.torus"
      :map="textures"
      :mesh="torusRef"
      editable
    />

    <TresMesh name="box" :scale="2">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#f6f6f6" />
      <Decal v-model:data="layout.box" :map="textures" editable />
    </TresMesh>
  </TresCanvas>
</template>
