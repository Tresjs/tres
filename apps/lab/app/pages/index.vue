<script setup lang="ts">
const description = 'Explore creative experiments built with TresJS, the declarative 3D framework for Vue'
// Social crawlers require an absolute og:image URL.
const { siteUrl } = useRuntimeConfig().public
const ogImage = new URL('/og-home.webp', siteUrl).href

useHead({
  meta: [
    { name: 'description', content: description },
    // og
    { hid: 'og:title', property: 'og:title', content: 'TresJS Lab' },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:image', property: 'og:image', content: ogImage },
    { hid: 'og:image:alt', property: 'og:image:alt', content: 'TresJS Lab' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@alvarosabu' },
    { hid: 'twitter:title', property: 'twitter:title', content: 'TresJS Lab' },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    { hid: 'twitter:image', name: 'twitter:image', content: ogImage },
    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'TresJS Lab' },
  ],
})

// `/` shows the top of the list (featured first, then newest) without changing the URL.
const { data: experiments } = await useExperiments()
const top = computed(() => experiments.value[0])
</script>

<template>
  <TheExperiment v-if="top" :experiment="top" />
</template>
