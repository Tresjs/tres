<script setup lang="ts">
import type { ExperimentListItem } from '~/composables/useExperiments'

const props = defineProps<{
  experiment: ExperimentListItem
}>()

const { data: page } = await useAsyncData(() => `page-${props.experiment.slug}`, () =>
  queryCollection('experiments').path(props.experiment.path).first())

const article = ref<HTMLElement | null>(null)
function scrollToArticle() {
  article.value?.scrollIntoView({ behavior: 'smooth' })
}

// Only two opposite corners: the top-left one would sit next to the sidebar/header cross.
const corners = ['-top-2 -right-2', '-bottom-2 -left-2']
</script>

<template>
  <div>
    <section class="relative lg:px-10 lg:py-8">
      <!-- Dashed frame with corner crosses around the viewer, desktop only. On phones the viewer goes full-bleed. -->
      <div class="relative lg:border lg:border-dashed lg:border-default lg:p-4">
        <UIcon
          v-for="corner in corners"
          :key="corner"
          name="i-lucide-plus"
          class="absolute hidden size-4 text-dimmed lg:block"
          :class="corner"
        />

        <div class="h-dvh lg:h-[calc(100dvh-3rem-4rem-2rem-2px)]">
          <TheViewer :experiment="experiment" class="max-lg:rounded-none max-lg:ring-0" />
        </div>

        <UButton
          icon="i-lucide-arrow-down"
          color="neutral"
          variant="outline"
          size="sm"
          aria-label="Read about this experiment"
          class="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full bg-default lg:inline-flex"
          @click="scrollToArticle"
        />
      </div>

      <span
        class="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 font-mono text-xs text-dimmed [writing-mode:vertical-rl] lg:block"
      >/embed/{{ experiment.slug }}</span>
    </section>

    <div ref="article" class="scroll-mt-4">
      <TheArticle :experiment="experiment" :page="page" />
    </div>
  </div>
</template>
