<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Output, SAO } from '@tresjs/post-processing'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const { effectComposer } = useRouteDisposal()

const spheres = Array.from({ length: 40 }, () => ({
  position: [
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
  ] as [number, number, number],
  scale: Math.random() * 0.35 + 0.08,
  color: `hsl(${Math.random() * 360}, 70%, 35%)`,
}))
</script>

<template>
  <TresCanvas
    clear-color="#121212"
    :alpha="false"
    render-mode="always"
  >
    <TresPerspectiveCamera
      :position="[0, 3, 7]"
      :fov="65"
      :near="3"
      :far="10"
    />
    <OrbitControls auto-rotate />

    <TresAmbientLight :intensity="0.2" />
    <TresPointLight color="#efffef" :intensity="500" :position="[-10, -10, 10]" />
    <TresPointLight color="#ffefef" :intensity="500" :position="[-10, 10, 10]" />
    <TresPointLight color="#efefff" :intensity="500" :position="[10, -10, 10]" />

    <TresMesh
      v-for="(s, i) in spheres"
      :key="i"
      :position="s.position"
      :scale="[s.scale, s.scale, s.scale]"
    >
      <TresSphereGeometry :args="[3, 32, 16]" />
      <TresMeshStandardMaterial :color="s.color" :roughness="0.5" :metalness="0" />
    </TresMesh>

    <Suspense>
      <EffectComposer ref="effectComposer">
        <SAO
          :sao-intensity="0.18"
          :sao-scale="1"
          :sao-kernel-radius="100"
          :sao-blur="true"
          :sao-blur-radius="8"
          :sao-blur-std-dev="4"
        />
        <Output />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
