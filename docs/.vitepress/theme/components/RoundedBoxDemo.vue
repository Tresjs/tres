<script setup lang="ts">
import { Html, OrbitControls, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#111"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 7]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <RoundedBox
      :position-x="3"
      :args="[1, 1, 1, 2, 1]"
    >
      <TresMeshBasicMaterial
        :color="0x00FF00"
        wireframe
      />
      <Html
        center
        transform
        :distance-factor="4"
        :position="[0, 1, 0.65]"
        :scale="[0.75, 0.75, 0.75]"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          I can be a quadsphere too
        </h1>
      </Html>
    </RoundedBox>
    <RoundedBox
      :position-x="-3"
    >
      <TresMeshBasicMaterial
        :color="0x00FF00"
        wireframe
      />
      <Html
        center
        transform
        :distance-factor="4"
        :position="[0, 1, 0.65]"
        :scale="[0.75, 0.75, 0.75]"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          I have wireframe active
        </h1>
      </Html>
    </RoundedBox>
    <RoundedBox />
  </TresCanvas>
</template>
