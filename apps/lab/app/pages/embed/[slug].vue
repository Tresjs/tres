<script setup lang="ts">
// The full-bleed experiment, loaded by the shell's viewer iframe. An iframe keeps experiments that
// assume they own the window (window-size canvases, fixed HUDs, native page scroll) working unchanged.
definePageMeta({
  layout: 'experiment',
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: page } = await useAsyncData(() => `embed-${slug.value}`, () =>
  queryCollection('experiments').path(`/experiments/${slug.value}`).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Experiment not found', fatal: true })
}

// Experiments render TheLoadingScreen themselves and have no access to the
// content record, so expose it down the tree for flags like `responsive`.
provide(EXPERIMENT_KEY, page)

useHead({
  title: () => page.value?.title,
  meta: [{ name: 'robots', content: 'noindex' }],
})

// Some experiments link back to `/`. Inside the iframe that would nest the shell in itself,
// so leave the embed routes by navigating the top window instead.
const router = useRouter()
let removeGuard: (() => void) | undefined
onMounted(() => {
  removeGuard = router.beforeEach((to) => {
    if (to.path.startsWith('/embed/') || window.top === window) { return }
    window.top!.location.href = to.fullPath
    return false
  })
})
onBeforeUnmount(() => removeGuard?.())

function toPascalCase(str: string) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()).replace(/^[a-z]/, letter => letter.toUpperCase())
}

const component = computed(() => toPascalCase(slugFromPath(page.value?.stem ?? '')))
</script>

<template>
  <main>
    <ClientOnly>
      <div class="w-full h-[100vh]">
        <component :is="component" v-if="page" />
      </div>
    </ClientOnly>
  </main>
</template>
