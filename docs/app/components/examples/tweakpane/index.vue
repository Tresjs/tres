<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import TweakpaneDemo from './TweakpaneDemo.vue'

const paneContainer = ref<HTMLElement>()
</script>

<template>
  <SceneWrapper>
    <div ref="paneContainer" class="absolute top-4 right-4 z-10"></div>
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <TweakpaneDemo :pane-container="paneContainer" />
    </TresCanvas>
  </SceneWrapper>
</template>
