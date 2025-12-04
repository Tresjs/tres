<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import type { TresObject3D } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { computed, ref, toRaw, useTemplateRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
}

const htmlProps = {
  center: true,
  transform: true,
  sprite: true,
}

const count = 4
const radius = 4

const isOccluded = ref(false)

const spheresParams = computed(() =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i * 2 * Math.PI) / count
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    return { position: [x, 1, z] as [number, number, number] }
  }),
)

const spheresOccludeRef = useTemplateRef<TresObject3D[]>('spheresOcclude')

const occluderRefs = computed<TresObject3D[]>(() => {
  const arr = spheresOccludeRef.value ?? []
  return arr.map((occluder: TresObject3D) => toRaw(occluder))
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3.5, 2.5, 9.5]" />
    <OrbitControls />

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-bind="htmlProps"
        :occlude="occluderRefs"
        :distance-factor="4"
        @on-occlude="(event: boolean) => isOccluded = event"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          Move camera
        </h1>
      </Html>
    </TresMesh>

    <TresMesh
      v-for="(sphere, index) in spheresParams"
      :key="`html-demo-occlude-complex-${index}`"
      ref="spheresOcclude"
      :position="sphere.position"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-bind="htmlProps"
        :distance-factor="4"
      >
        <h1 class="text-xs p-1 rounded" :class="[isOccluded ? 'bg-white text-dark' : 'bg-dark text-white']">
          Occlude {{ index + 1 }}
        </h1>
      </Html>
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
