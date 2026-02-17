<script lang="ts" setup>
import { Film } from '@tresjs/post-processing'
import BasicScene from '@/components/BasicScene.vue'
import { TresLeches, useControls } from '@tresjs/leches'

const { intensity, grayscale, enabled } = useControls({
  intensity: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
  grayscale: true,
  enabled: true,
}, {
  uuid: 'postprocessing-three-film',
})
</script>

<template>
  <TresLeches uuid="postprocessing-three-film" />
  <BasicScene>
    <template #effects>
      <Film
        :intensity
        :grayscale
        :enabled
      />
    </template>
  </BasicScene>
</template>
