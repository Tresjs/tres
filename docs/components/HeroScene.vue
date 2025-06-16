<script setup lang="ts">
import {
  TresCanvas,
} from '@tresjs/core'
</script>

<template>
  <ClientOnly>
    <div class="w-full aspect-video">
      <TresCanvas>
        <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresCanvas>
    </div>
  </ClientOnly>
</template>
