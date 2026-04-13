<script lang="ts" setup>
import { Halftone } from '@tresjs/post-processing'
import BasicScene from '@/components/BasicScene.vue'
import { TresLeches, useControls } from '@tresjs/leches'

const { radius, enabled, shape } = useControls({
  radius: 13,
  enabled: true,
  shape: 1,
}, {
  uuid: 'postprocessing-three-halftone',
})
</script>

<template>
  <TresLeches uuid="postprocessing-three-halftone" />
  <BasicScene>
    <template #effects>
      <Halftone :radius="enabled ? radius : undefined" :shape="shape" />
    </template>
  </BasicScene>
</template>
