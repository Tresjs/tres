<script setup lang="ts">
import type { ExperimentsCollectionItem } from '@nuxt/content'
import type { ExperimentListItem } from '~/composables/useExperiments'

const props = defineProps<{
  experiment: ExperimentListItem
  page?: ExperimentsCollectionItem | null
}>()

const formattedDate = computed(() =>
  new Date(props.experiment.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
)
</script>

<template>
  <article class="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
    <header class="flex flex-col gap-4 border-b border-default pb-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="min-w-0">
          <h1 class="font-display text-3xl font-bold text-highlighted">
            {{ experiment.title }}
          </h1>
          <p class="mt-2 text-muted">
            {{ experiment.description }}
          </p>
        </div>
        <UButton
          :to="experiment.repoUrl"
          target="_blank"
          icon="i-lucide-code-xml"
          label="Code"
          color="neutral"
          variant="subtle"
        />
      </div>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
        <time :datetime="experiment.lastUpdated" class="font-mono text-xs">{{ formattedDate }}</time>
        <div class="flex items-center gap-2">
          <UAvatarGroup size="2xs">
            <UAvatar v-for="author in experiment.authors" :key="author.slug" :src="author.avatar" :alt="author.name" />
          </UAvatarGroup>
          <span>{{ experiment.authors.map(author => author.name).join(', ') }}</span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <UBadge v-for="tag in experiment.tags" :key="tag" :label="tag" color="primary" variant="soft" size="sm" />
        </div>
      </div>
    </header>

    <ContentRenderer v-if="page" :value="page" class="pt-6" />
  </article>
</template>
