<script setup lang="ts">
definePageMeta({
  layout: 'experiment',
})
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent().where({ _path: path }).findOne())

useHead({
  title: `${data?.value?.title} - Tres`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: data?.value?.description,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      keywords: data?.value?.tags?.join(', '),
    },
    // og
    {
      hid: 'og:description',
      property: 'og:description',
      content: data?.value?.description,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `${data?.value?.title} TresJS by @${data?.value?.author}`,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'project',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: data?.value?.thumbnail,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: data?.value?.title,
    },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@alvarosabu' },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: `${data?.value?.title} - Tres`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: data?.value?.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: data?.value?.thumbnail,
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: data?.value?.title,
    },
  ],
})
</script>

<template>
  <main>
    <ClientOnly>
      <ContentRenderer
        v-if="data"
        :value="data"
        class="w-full h-100vh relative"
      />
    </ClientOnly>
  </main>
</template>
