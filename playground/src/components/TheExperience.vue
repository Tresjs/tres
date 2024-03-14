<script setup lang="ts">
import {
  TresCanvas,
  pluginCore,
  pluginCannon,
  pluginText,
} from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { MeshNormalMaterial, BoxGeometry } from 'three'

function range(n: number) {
  return Math.random() * 2 * n - n
}

const mat = new MeshNormalMaterial()
const geo = new BoxGeometry(1)
</script>

<template>
  <TresCanvas
    clear-color="#688"
    :plugins="[pluginCore, pluginCannon, pluginText]"
  >
    <TresPerspectiveCamera :position="[25, 25, 25]" />
    <OrbitControls />
    <TresMesh
      :position="[0, 18, 0]"
      :material="mat"
    >
      <Collider
        shape="Box"
        :angular-velocity="[range(10), range(10), range(10)]"
        :args="[0.5, 0.5, 0.5]"
      />
      <TresBoxGeometry :args="[0.5, 0.5, 0.5]" />
      First! 😆
    </TresMesh>
    <TresMesh
      v-for="i of new Array(500).fill(0).map((_, i) => i)"
      :key="i"
      :position="[range(2), i + 22, range(2)]"
      :material="mat"
      :geometry="geo"
    >
      <Collider
        shape="Box"
        :angular-velocity="[range(10), range(10), range(10)]"
      />
    </TresMesh>

    <TresMesh
      :position="[0, 8, 0]"
      :material="mat"
      :rotation="[-Math.PI * 0.25, 0, Math.PI * 0.25]"
    >
      <Collider
        shape="Box"
        :args="[8, 8, 8]"
        :mass="0"
      />
      <TresBoxGeometry :args="[8, 8, 8]" />
    </TresMesh>

    <TresMesh
      :position="[0, 1, 0]"
      :rotation="[0, Math.PI / 2, 0]"
      :material="mat"
    >
      <Collider
        shape="Box"
        :args="[30, 0.1, 30]"
        :mass="0"
      />
      <TresBoxGeometry :args="[30, 0.1, 30]" />
    </TresMesh>
  </TresCanvas>
</template>

<style>
.tres-text {
  background-color: white;
  color: #444;
  font-size: 12px;
  border-radius: 2px;
  padding: 5px;
  font-family: sans-serif;
}
</style>
