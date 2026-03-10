<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description
const siteName = typeof page.value.seo?.siteName === 'string' ? page.value.seo.siteName : 'Rapier docs'

useSeoMeta({
  titleTemplate: title,
  ogTitle: title,
  description,
  ogSiteName: siteName,
  ogDescription: description,
  twitterCard: 'summary_large_image',
  ogImage: '/og-image.png',
  twitterImage: '/og-image.png',
  ogUrl: 'https://tresjs.org',
  twitterTitle: title,
  twitterDescription: description,
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    class="bg-default"
    :value="page"
    :prose="false"
  />
</template>
