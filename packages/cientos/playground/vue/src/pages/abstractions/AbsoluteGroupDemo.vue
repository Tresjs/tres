<script setup lang="ts">
import { AbsoluteGroup, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <OrbitControls />

    <AbsoluteGroup :distance="10" :left="0" :top="0">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </AbsoluteGroup>

    <!-- By default, children are centrered -->
    <AbsoluteGroup :distance="10">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </AbsoluteGroup>

    <AbsoluteGroup :distance="10" :right="0" :bottom="0">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </AbsoluteGroup>

    <AbsoluteGroup :distance="10" :left="0.25" :bottom="0.25">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </AbsoluteGroup>

    <AbsoluteGroup :distance="10" :right="0.25">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </AbsoluteGroup>

    <TresGridHelper :args="[10, 10]" :rotation="[Math.PI * 0.5, 0, 0]" />
  </TresCanvas>
</template>
