<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import type { Vector3 } from 'three'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ColorDepthPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { onUnmounted, toRaw, useTemplateRef, watch } from 'vue'
import { gsap } from 'gsap'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const ctx = gsap.context(() => {})

const meshsArray = useTemplateRef('meshRefs')

const { blendFunction, bits, opacity } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  bits: { value: 8, step: 1, min: 1, max: 16 },
  opacity: { value: 1, step: 0.1, min: 0, max: 1 },
})

const meshes: { position: [number, number, number], color: string }[] = [
  { position: [0, 0.5, 0], color: 'white' },
  { position: [0, 0.5, -2], color: 'red' },
  { position: [0, 0.5, 2], color: 'yellow' },
  { position: [-2, 0.5, 0], color: 'blue' },
  { position: [2, 0.5, 0], color: 'purple' },
]

watch(meshsArray, () => {
  ctx.add(() => {
    meshsArray.value?.forEach((el) => {
      const position = toRaw(el.position) as Vector3

      if (position) {
        gsap.to(position as Vector3, {
          x: position.x === 0 ? '+=0' : position.x < 0 ? '-=3' : '+=3',
          z: position.z === 0 ? '+=0' : position.z < 0 ? '-=3' : '+=3',
          repeat: -1,
          yoyo: true,
        })
      }
    })
  })
})

onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera :position="[8, 5, 5]" />
      <OrbitControls auto-rotate />

      <TresMesh
        v-for="(mesh, index) in meshes"
        :key="`color-depth-demo-box-${index}`"
        ref="meshRefs"
        :position="mesh.position"
      >
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshPhysicalMaterial :color="mesh.color" :roughness="0.25" />
      </TresMesh>

      <Suspense>
        <Environment background preset="umbrellas" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs>
          <ColorDepthPmndrs :blendFunction="Number(blendFunction)" :bits="bits" :opacity="opacity" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
