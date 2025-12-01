<script setup lang="ts">
definePageMeta({
  layout: 'experiment',
})
const route = useRoute()
const img = useImage()
const site = useSiteConfig()

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

const ogImageUrl = computed(() => {
  const imagePath = page.value?.thumbnail ?? `/${page.value?.path?.split('/').pop()}.png`
  return img(imagePath, { width: 1200, height: 630, fit: 'cover' })
})

defineOgImage({
  url: ogImageUrl.value,
  alt: page.value?.title,
  extension: 'png',
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  keywords: page.value?.tags?.join(', '),
  ogTitle: `${page.value?.title} made with TresJS by @${page.value?.author}`,
  icon: '/favicon.ico',
  ogDescription: page.value?.description,
  ogImage: ogImageUrl.value,
  ogType: 'website',
  twitterImage: ogImageUrl.value,
  twitterSite: '@tresjs_dev',

  twitterTitle: page.value?.title,
  twitterDescription: page.value?.description,
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
