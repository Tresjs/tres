<script setup lang="ts">
import { useControls } from '@tresjs/leches'
</script>

<template>
  <TresCanvas>
    <TresGroup>
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>
