<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { OrbitControls } from '@tresjs/cientos'

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas clearColor="#82DBC5">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
