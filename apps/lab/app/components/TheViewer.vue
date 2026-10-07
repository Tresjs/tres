<script setup lang="ts">
import type { ExperimentListItem } from '~/composables/useExperiments'

const props = defineProps<{
  experiment: ExperimentListItem
}>()

const embedPath = computed(() => `/embed/${props.experiment.slug}`)

const iframe = ref<HTMLIFrameElement | null>(null)
const loaded = ref(false)
watch(() => props.experiment.slug, () => { loaded.value = false })

// The SSR'd iframe can finish loading before hydration attaches @load, so check once on mount.
onMounted(() => {
  const doc = iframe.value?.contentDocument
  if (doc?.readyState === 'complete' && doc.location.href !== 'about:blank') { loaded.value = true }
})

async function openFullscreen() {
  try {
    await iframe.value!.requestFullscreen()
  }
  catch {
    // iPhone Safari has no element fullscreen; the embed route is the next best thing.
    window.open(embedPath.value, '_blank')
  }
}
</script>

<template>
  <div class="relative size-full overflow-hidden rounded-xl bg-elevated ring-1 ring-default">
    <!-- The thumbnail sits under the iframe so a switch never flashes an empty card while the embed boots. -->
    <img
      :src="experiment.thumbnail"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 size-full scale-105 object-cover blur-md"
    />
    <!-- dancing-blob listens to the microphone; an iframe gets no permission it is not granted here. -->
    <iframe
      :key="experiment.slug"
      ref="iframe"
      :src="embedPath"
      :title="experiment.title"
      allow="fullscreen; autoplay; microphone; clipboard-write; xr-spatial-tracking; screen-wake-lock"
      class="absolute inset-0 size-full border-0 transition-opacity duration-500"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
      @load="loaded = true"
    ></iframe>

    <UFieldGroup size="sm" class="absolute right-3 bottom-3">
      <UTooltip :text="`${experiment.slug} – code on GitHub`">
        <UButton
          :to="experiment.repoUrl"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="subtle"
          :aria-label="`${experiment.title} code on GitHub`"
        />
      </UTooltip>
      <UTooltip text="Fullscreen">
        <UButton
          icon="i-lucide-maximize"
          color="neutral"
          variant="subtle"
          aria-label="Fullscreen"
          @click="openFullscreen"
        />
      </UTooltip>
    </UFieldGroup>
  </div>
</template>
