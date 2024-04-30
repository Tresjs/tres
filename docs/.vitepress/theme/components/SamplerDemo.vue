<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Sampler } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Sampler :count="50">
      <TresMesh>
        <TresTorusGeometry />
      </TresMesh>

      <TresInstancedMesh :args="[null!, null!, 1000]">
        <TresBoxGeometry :args="[0.1, 0.1, 0.1]" />
        <TresMeshNormalMaterial />
      </TresInstancedMesh>
    </Sampler>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
