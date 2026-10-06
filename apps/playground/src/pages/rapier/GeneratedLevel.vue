<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Physics } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import Level from '@/models/Level.gen.vue'

// Generated with: tres gltf public/models/level.glb -o src/models/Level.gen.vue --physics rapier
// Every body in the level comes from a Godot-style suffix on the node name:
// `-convcol` on the geometry, `-convcolonly` on the stair proxies, `-rigid` on the cans.
const gl = {
  clearColor: '#1a1a1a',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const { debug } = useControls({ debug: true })
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[8, 6, 12]" :look-at="[0, 1, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <Level />
        <CapsulePlayer :position="[0, 3, 0]" />
      </Physics>
    </Suspense>

    <TresDirectionalLight :position="[5, 10, 5]" :intensity="2" cast-shadow />
    <TresAmbientLight :intensity="0.6" />
  </TresCanvas>
</template>
