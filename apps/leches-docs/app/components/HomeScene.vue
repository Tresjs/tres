<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <div class="w-full aspect-video">
    <ClientOnly>
      <TresCanvas alpha>
        <TresPerspectiveCamera
          :position="[5, 5, 5]"
          :look-at="[0, 0, 0]"
        />
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresCanvas>
    </ClientOnly>
  </div>
</template>
