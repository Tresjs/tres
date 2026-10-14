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
      <div class="relative lg:border lg:border-dashed lg:border-default lg:p-4">
        <UIcon
          v-for="corner in corners"
          :key="corner"
          name="i-lucide-plus"
          class="absolute hidden size-4 text-dimmed lg:block"
          :class="corner"
        />

        <!-- Desktop height: the viewport minus the header, the section's py-8, the frame's p-4 and its 1px borders. -->
        <div class="h-dvh lg:h-[calc(100dvh-var(--ui-header-height)-4rem-2rem-2px)]">
          <TheViewer :experiment="experiment" class="max-lg:rounded-none max-lg:ring-0" />
        </div>

        <!-- Also on phones: the full-screen canvas swallows touch, so a swipe cannot reach the article. -->
        <UButton
          icon="i-lucide-arrow-down"
          color="neutral"
          variant="outline"
          size="sm"
          aria-label="Read about this experiment"
          class="absolute bottom-3 left-3 rounded-full bg-default lg:-bottom-4 lg:left-1/2 lg:-translate-x-1/2"
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
