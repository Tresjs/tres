<script lang="ts" setup>
import { Output, SMAA } from '@tresjs/post-processing'
import BasicScene from '../../../components/BasicScene.vue'
import { useControls, TresLeches } from '@tresjs/leches';

const { enabled } = useControls({
  enabled: true,
}, {
  uuid: 'postprocessing-three-smaa',
})
</script>

<template>
  <TresLeches uuid="postprocessing-three-smaa" />
  <BasicScene wireframe>
    <template #effects>
      <SMAA v-if="enabled" />
      <Output />
    </template>
  </BasicScene>
</template>
