<script setup lang="ts">
import { OrbitControls, ScreenSpace } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { top, left, depth } = useControls({
  top: { value: 0.5, min: 0, max: 1, step: 0.05 },
  left: { value: 0.5, min: 0, max: 1, step: 0.05 },
  depth: { value: 5, min: -10, max: 30, step: 0.1 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera />
    <OrbitControls />

    <!-- By default, children are centrered -->
    <ScreenSpace :depth="depth" :top="top" :left="left">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>

    <ScreenSpace :depth="8" :left="0.1" :top="0.2">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>

    <ScreenSpace :depth="10" :right="0" :bottom="0">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>

    <ScreenSpace :depth="25" :left="0.25" :bottom="0.25">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>

    <ScreenSpace :depth="15" :right="0.25">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>

    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
