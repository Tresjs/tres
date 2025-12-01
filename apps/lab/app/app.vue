<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('experiments'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('experiments'), {
  server: false
})

const site = useSiteConfig()


if (import.meta.server) {
  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
    ],
    htmlAttrs: {
      lang: 'en',
    },
  })

  useSeoMeta({
    ogSiteName: site.name,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: 'tresjs_dev',
    icon: site.icon,
  })
}

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
