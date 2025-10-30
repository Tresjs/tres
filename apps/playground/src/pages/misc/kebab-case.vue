<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  <tres-canvas>
    <tres-perspective-camera
      :position="[9, 9, 9]"
    />
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
    <orbit-controls />

    <tres-mesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <tres-cone-geometry :args="[1, 1.5, 3]" />
      <tres-mesh-toon-material color="#82DBC5" />
    </tres-mesh>
    <tres-mesh :position="[0, 0, 0]" cast-shadow>
      <tres-box-geometry :args="[1.5, 1.5, 1.5]" />
      <tres-mesh-toon-material color="#4F4F4F" />
    </tres-mesh>
    <tres-mesh :position="[2, -2, 0]">
      <tres-sphere-geometry />
      <tres-mesh-toon-material color="#FBB03B" />
    </tres-mesh>
    <tres-directional-light :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  </tres-canvas>
</template>
