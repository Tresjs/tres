<script setup lang="ts">
import { Align, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'
import { TresCanvas } from '@tresjs/core'

const uuid = inject(`uuid`)

const { top, bottom, left, right, front, back } = useControls({
  top: false,
  bottom: false,
  left: false,
  right: false,
  front: false,
  back: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera />
    <OrbitControls />

    <TresAxesHelper :scale="2" />

    <Align :top="top" :right="right" :back="back" :left="left" :bottom="bottom" :front="front">
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </Align>
  </TresCanvas>
</template>
