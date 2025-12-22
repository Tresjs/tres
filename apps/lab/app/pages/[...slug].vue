<script setup lang="ts">
definePageMeta({
  layout: 'experiment',
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('experiments').path(route.path).first()
})

const { data: authors } = await useAsyncData('authors', () =>
  queryCollection('authors').all()
)

const formattedPage = computed(() => {
  return {
    ...page.value,
    authors: authors.value?.filter(author => page.value?.author.includes(author.slug)),
  }
})

useHead({
  title: `${page?.value?.title}`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: page?.value?.description,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      keywords: page?.value?.tags?.join(', '),
    },
    // og
    {
      hid: 'og:description',
      property: 'og:description',
      content: page?.value?.description,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `${page?.value?.title} made with TresJS by @${page?.value?.author}`,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'project',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: page?.value?.thumbnail ?? `/${page?.value?._path?.split('/').pop()}.png`,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: page?.value?.title,
    },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@alvarosabu' },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: `${page?.value?.title} - Tres`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: page?.value?.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: page?.value?.thumbnail ?? `/${page?.value?._path?.split('/').pop()}.png`,
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: page?.value?.title,
    },
  ],
})

function toPascalCase(str: string) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()).replace(/^[a-z]/, (letter) => letter.toUpperCase())
}

const component = computed(() => toPascalCase(page.value?.stem.split('/').pop() ?? ''))
</script>

<template>
  <main>
    <ClientOnly>
      <div class="w-full h-[100vh]">
        <component :is="component" v-if="page" />
      </div>
    </ClientOnly>
    <TheActions :page="formattedPage" class="fixed z-10 bottom-5 right-5" />
  </main>
</template>
