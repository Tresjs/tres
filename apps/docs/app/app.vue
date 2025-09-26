<script setup lang="ts">
const { seo } = useAppConfig()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: isDark.value ? '/favicon-dark.svg' : '/favicon.svg' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  titleTemplate: title => title ? `${title} · TresJS` : 'TresJS: Building 3D scenes with Vue',
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image',
  ogImage: '/og-image.png',
  twitterImage: '/og-image.png',
  ogUrl: 'https://tresjs.org',
  twitterTitle: 'TresJS: Building 3D scenes with Vue',
  twitterDescription: 'TresJS is a library for building 3D scenes with Vue. It provides a set of components and utilities for creating and managing 3D scenes.',
})

provide(navigationInjectionKey, navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain class="pattern-bg">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
