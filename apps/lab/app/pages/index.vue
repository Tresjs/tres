<script setup lang="ts">
import type { ExperimentItem } from '~/app/types'

const site = useSiteConfig()

useSeoMeta({
  titleTemplate: title => title ? `${title} · ${site.name}` : site.name,
  title: site.name,
  description: site.description,
  ogTitle: site.name,
  ogDescription: site.description,
  ogImage: site.image,
  twitterTitle: site.name,
  twitterDescription: site.description,
  twitterImage: site.image,
  twitterCreator: '@tresjs_dev',
  twitterSite: '@tresjs_dev',
  icon: '/favicon.ico',
})


// Fetch all experiments ordered by featured first, then by date
const { data: experiments } = await useAsyncData('experiments', () =>
  queryCollection('experiments').all()
)

// Format experiments with additional data using a second useAsyncData to handle the dependencies
const { data: formattedExperiments } = await useAsyncData('formatted-experiments',
  async () => {
    if (!experiments.value) return []

    const formattedList = await Promise.all(
      experiments.value.map(async (experiment) => {
        const slug = getSlugFromExperiment(experiment)

        const authorSlugs = Array.isArray(experiment.author)
          ? experiment.author
          : [experiment.author]

        // Fetch the author using useAsyncData to leverage caching
        const authorPromises = authorSlugs.map(authorSlug =>
          useAsyncData(`author-${authorSlug}`, () =>
            queryCollection('authors')
              .where('slug', '=', authorSlug)
              .first()
          )
        )

        const authorResults = await Promise.all(authorPromises)
        const authors = authorResults.map(result => result.data?.value).filter(Boolean)

        return {
          ...experiment,
          slug,
          title: getTitleFromExperiment(experiment),
          thumbnail: getThumbnailFromExperiment(experiment),
          authors,
          repoPath: getRepoPathFromExperiment(experiment),
          repoTitle: getRepoTitleFromExperiment(experiment),
        }
      })
    )

    // Sort by featured first, then by date (newest first)
    return formattedList.sort((a, b) => {
      // Featured experiments first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then sort by date (newest first)
      const dateA = new Date(a.date || 0)
      const dateB = new Date(b.date || 0)
      return dateB.getTime() - dateA.getTime()
    })
  },
  {
    // Watch the experiments data to re-evaluate when it changes
    watch: [experiments]
  }
)

function getSlugFromExperiment(experiment: ExperimentItem): string {
  return experiment.path?.split('/').pop() ?? ''
}

function getTitleFromExperiment(experiment: ExperimentItem): string {
  return experiment.title
    ?? getSlugFromExperiment(experiment).split('-')
      .map(capitalize)
      .join(' ')
}

function capitalize(word: string): string {
  if (word.length === 0) {
    return word
  }
  else if (word.length === 1) {
    return word.toUpperCase()
  }
  else {
    return word[0].toUpperCase() + word.slice(1)
  }
}

function getThumbnailFromExperiment(experiment: ExperimentItem): string {
  return experiment.thumbnail ?? `/${getSlugFromExperiment(experiment)}.png`
}

function getRepoPathFromExperiment(experiment: ExperimentItem): string {
  return `https://github.com/Tresjs/lab/tree/main/components/content/${getSlugFromExperiment(experiment)}`
}

function getRepoTitleFromExperiment(experiment: ExperimentItem): string {
  return `${getSlugFromExperiment(experiment)} – code on Github`
}
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col items-center mb-12">
      <p class="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
        Explore creative WebGL experiments built with TresJS, the declarative ThreeJS framework for Vue
      </p>
    </div>

    <div v-if="formattedExperiments?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TheCard v-for="experiment in formattedExperiments" :key="experiment.slug" :experiment="experiment" />
    </div>

    <div v-else class="flex flex-col items-center py-16">
      <UIcon name="i-heroicons-beaker" class="text-5xl mb-4 text-gray-400 dark:text-gray-600" />
      <p class="text-lg text-gray-500 dark:text-gray-400">Loading experiments...</p>
    </div>
  </UContainer>
</template>
