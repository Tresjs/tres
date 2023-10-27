<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sparkles, OrbitControls, Sphere } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 0, 8]" />
    <Sphere>
      <TresMeshBasicMaterial color="#222" />
      <Sparkles 
        :sequence-alpha="[[0., 0.], [0.6, 1.0], [0.7, 0.0], [1.0, 1.0]]"
        :sequence-color="['yellow', 'white', 'orange', 'red', 'black']" 
        :sequence-offset="[[0.7, [0, 0, 0]], [0.75, [0, 0.1, 0]], [1.0, [0, 0.5, 0]]]" 
        :sequence-size="[[0.0, 0.0], [0.7, 1.0]]" 
        :sequence-surface-distance="[[0.0, 0.0], [0.7, 1.0]]" 
        :lifetime-sec="2.0"
        :size="2"
        :surface-distance="0.8"
        :mix-color="1.0"
      />
    </Sphere>
    <OrbitControls />
  </TresCanvas>
</template>
