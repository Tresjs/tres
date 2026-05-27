<script setup lang="ts">
import {
  ContactShadows,
  Decal,
  Environment,
  OrbitControls,
  DecalDebugUI,
  useGLTF,
  useTextures,
} from '@tresjs/cientos'
import type { DecalEditorSession, DecalJsonEntry } from '@tresjs/cientos'
import { TresCanvas, useGraph, useLoader } from '@tresjs/core'
import { computed, reactive, watch } from 'vue'
import { SRGBColorSpace } from 'three'
import type { Mesh, Object3D } from 'three'

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

// `Mug` is a Group (ceramic body + metallic interior). A Decal projects
// onto a single mesh, so target the body — the child mesh with the most
// vertices — and pass it via `:mesh`.
const mugMesh = computed<Mesh | null>(() => {
  const group = mug.value
  if (!group) { return null }
  let best: Mesh | null = null
  let bestCount = -1
  group.traverse((o: Object3D) => {
    const m = o as Mesh
    const count = m.isMesh ? (m.geometry?.attributes.position?.count ?? 0) : -1
    if (count > bestCount) {
      best = m
      bestCount = count
    }
  })
  return best
})

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  "mug": [
    {
      "id": "0db9fb2d-156b-4a09-9bcf-06f5b9be414f",
      "position": [
        -0.8954501666345478,
        2.045293983841609,
        0.42795255054918213
      ],
      "orientation": [
        0,
        -1.1292619472765466,
        0.007132597282973663
      ],
      "size": [
        0.89432140295958,
        0.20421512351045526,
        1
      ],
      "zIndex": 0,
      "map": "tresjs-dark.png"
    },
    {
      "id": "61ce9dd7-e821-4445-9e82-b23a132a5b65",
      "position": [
        0.44907470640757663,
        1.8774883416773522,
        0.8854636656395165
      ],
      "orientation": [
        0,
        0.44153437951835,
        -0.18955754747596165
      ],
      "size": [
        0.6882457276077091,
        0.6882457276077091,
        1
      ],
      "zIndex": 1,
      "map": "vue.png"
    },
    {
      "id": "953475fc-1864-466d-9bc9-2a0371a2903a",
      "position": [
        -0.28197464991032084,
        2.2293687089996417,
        -0.9524137096313172
      ],
      "orientation": [
        -3.141592653589793,
        -0.24455009528111096,
        -2.872728117206046
      ],
      "size": [
        0.6212901676939242,
        0.6212901676939242,
        1
      ],
      "zIndex": 2,
      "map": "threejs.png"
    }
  ]
})

watch(layout, (layout) => {
  console.log('Layout changed:', layout)
}, { deep: true, immediate: true })

const decalRef = shallowRef<{ editor: DecalEditorSession } | null>(null)
const session = computed(() => decalRef.value?.editor ?? null)
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <DecalDebugUI contained :session="session" :textures="textures ?? []" :data="layout" />
    <TresCanvas clear-color="#fbb03b">
      <TresPerspectiveCamera :position="[2, 3, 5]" :look-at="[0, 1, 0]" />
      <OrbitControls auto-rotate :target="[0, 1, 0]" />

      <TresGroup v-if="mug" :position="[0, 1, 0]">
        <primitive :object="mug">
          <Decal ref="decalRef" v-model:data="layout.mug" :map="textures" :mesh="mugMesh" :cull-threshold="0.7"
            editable />
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
