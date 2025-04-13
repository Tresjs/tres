<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import type { Mesh } from 'three'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ColorAveragePmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { gsap } from 'gsap'
import { onUnmounted, ref, watch } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const ctx = gsap.context(() => {})

const meshRef = ref<Mesh | null>(null)

const { blendFunction, opacity } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  opacity: {
    value: 1,
    min: 0,
    max: 1,
  },
})

function onUpdateTimeline(e) {
  const progress = 1 - e.progress()
  opacity.value = progress
}

watch(meshRef, () => {
  if (!meshRef.value) { return }

  ctx.add(() => {
    gsap.timeline({
      repeat: -1,
      yoyo: true,
      onUpdate() {
        onUpdateTimeline(this)
      },
    })
      .to(meshRef.value.position, { y: -3.5, duration: 2 })
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
      <TresPerspectiveCamera
        :position="[5, 2, 15]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls auto-rotate />

      <TresMesh ref="meshRef" :position="[0, 3.5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshPhysicalMaterial color="#8B0000" :roughness=".25" />
      </TresMesh>

      <Suspense>
        <Environment background preset="shangai" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <ColorAveragePmndrs :blendFunction="Number(blendFunction)" :opacity="opacity" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
