<script setup lang="ts">
import { CameraControls, Stats } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { shallowRef, watch } from 'vue'
import TestStars from '../../components/StarsForTest.vue'

const gl = {
  clearColor: '#000',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const statsGLRef = shallowRef()

watch(statsGLRef, (value) => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ watch ~ value:', value.instance)
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stats ref="statsGLRef" />
    <TestStars />
    <CameraControls :distance="500" />
  </TresCanvas>
</template>
