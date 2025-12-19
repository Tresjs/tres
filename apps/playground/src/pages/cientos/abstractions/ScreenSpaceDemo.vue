<script setup lang="ts">
import { OrbitControls, ScreenSpace } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <OrbitControls />

    <!-- By default, children are centrered -->
    <ScreenSpace :depth="5">
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
