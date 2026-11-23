<script setup lang="ts">
const route = useRoute()
const { data: experiments } = await useExperiments()
const experiment = computed(() => experiments.value.find(item => item.slug === route.params.slug))

if (!experiment.value) {
  throw createError({ statusCode: 404, statusMessage: 'Experiment not found', fatal: true })
}

// Social crawlers require an absolute og:image URL, so resolve the thumbnail against the canonical origin.
const { siteUrl } = useRuntimeConfig().public
const ogImage = computed(() => new URL(experiment.value?.thumbnail ?? '/og-home.webp', siteUrl).href)
const authorHandles = computed(() => experiment.value?.authors.map(author => `@${author.slug}`).join(', '))

useHead({ title: () => experiment.value?.title })

useSeoMeta({
  description: () => experiment.value?.description,
  keywords: () => experiment.value?.tags.join(', '),
  ogTitle: () => experiment.value ? `${experiment.value.title} made with TresJS by ${authorHandles.value}` : 'TresJS Lab',
  ogDescription: () => experiment.value?.description,
  ogType: 'article',
  ogImage: () => ogImage.value,
  ogImageAlt: () => experiment.value?.title,
  twitterCard: 'summary_large_image',
  twitterSite: '@alvarosabu',
  twitterTitle: () => experiment.value ? `${experiment.value.title} - Tres` : 'TresJS Lab',
  twitterDescription: () => experiment.value?.description,
  twitterImage: () => ogImage.value,
  twitterImageAlt: () => experiment.value?.title,
})
</script>

<template>
  <TheExperiment v-if="experiment" :experiment="experiment" />
</template>
