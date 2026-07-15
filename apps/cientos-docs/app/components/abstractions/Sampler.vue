<script setup lang="ts">
import { OrbitControls, Sampler } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { count } = useControls({
  count: { value: 50, min: 1, max: 500, step: 10 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Sampler :count="count">
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
