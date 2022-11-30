<script setup lang="ts">
import sdk, { EmbedOptions, Project } from '@stackblitz/sdk'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    projectId: string
    options: EmbedOptions
  }>(),
  {
    options: {
      openFile: 'src/components/TheExperience.vue',
      view: 'preview',
      forceEmbedLayout: true,
      hideExplorer: true,
      hideNavigation: true,
    },
  },
)

const embed = ref(null)
const isSnippetLoaded = ref(false)

watch(
  () => embed.value,
  value => {
    if (value) {
      sdk.embedProjectId(value, props.projectId, props.options)
    }
  },
)
</script>
<template>
  <div ref="embed" class="stackblitz-embed">
    <div v-if="!isSnippetLoaded" class="text-gray-500 text-2xl">Loading...</div>
  </div>
</template>

<style>
.stackblitz-embed {
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: none;
  min-height: 500px;
}
</style>
