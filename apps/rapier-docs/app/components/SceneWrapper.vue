<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'

const route = useRoute()

const uuid = `leches-${route.path.split('/').pop()}`

provide(`uuid`, uuid)

const slots = useSlots()
const demoVNode = computed(() => slots.default?.()[0])

const demoName = computed(() => {
  const type = demoVNode.value?.type as Record<string, unknown> | undefined
  // not in .name because they're async
  const tag = type?.tag as string | undefined
  if (!tag) return undefined
  // meta is keyed by PascalCase, the tag is kebab-case (demos-usage -> DemosUsage)
  return tag.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
})

const demoSources = import.meta.glob('../../app/components/demos/*.vue', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const { data: demoData } = useAsyncData(
  `demo-source-${route.path}`,
  async () => {
    const name = demoName.value
    if (!name) {
      console.warn('[SceneWrapper] could not resolve demo component name from slot')
      return { filePath: undefined, raw: undefined }
    }
    const meta = await $fetch<{ filePath?: string }>(`/api/component-meta/${name}`).catch(() => undefined)
    const filePath = meta?.filePath
    if (!filePath) {
      console.warn(`[SceneWrapper] no meta found for demo "${name}"`)
      return { filePath: undefined, raw: undefined }
    }
    const key = `./${filePath.slice(filePath.indexOf('demos/'))}`
    const loader = demoSources[key]
    if (!loader) {
      console.warn(`[SceneWrapper] no source found for demo "${name}" (key "${key}")`)
      return { filePath, raw: undefined }
    }
    const raw = await loader()
    return { filePath, raw }
  },
)

const sourceUrl = computed(() => {
  const filePath = demoData.value?.filePath
  if (!filePath) { return undefined }
  return `https://github.com/Tresjs/tres/blob/main/apps/rapier-docs/${filePath}`
})

// starts true for SSR / static generation for search indexing purposes, hidden for users after hydration
const showSource = ref(true)

onMounted(() => {
  showSource.value = false
})

const sourceMarkdown = computed(() => {
  const code = demoData.value?.raw
  if (!code) { return undefined }
  return "```vue\n" + code + "\n```"
})
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <div class="aspect-video overflow-hidden rounded-lg border-1 border-muted dark:border-transparent">
        <slot></slot>
      </div>
      <TresLeches :uuid="uuid" :float="false" class="!rounded-none" />
    </ClientOnly>

    <div class="flex items-center justify-between px-2 py-1.5">
      <USwitch
        v-model="showSource"
        label="View source"
        size="sm"
      />

      <a
        v-if="sourceUrl"
        :href="sourceUrl"
        target="_blank"
        rel="noopener"
        aria-label="View source on GitHub"
        class="flex items-center justify-center w-7 h-7 rounded-full bg-white/50 dark:bg-black/50 text-black dark:text-white hover:bg-white/80 dark:hover:bg-black/80 transition-colors"
      >
        <Icon name="i-lucide-external-link" class="w-4 h-4" />
      </a>
    </div>

    <div v-show="showSource" class="source-view aspect-video">
      <MDC
        v-if="sourceMarkdown"
        :value="sourceMarkdown"
        class="h-full [&_.group]:h-full [&_.group]:!my-0 [&_pre]:h-full [&_pre]:!my-0 [&_pre]:pr-12 [&_pre]:overflow-hidden [&_pre]:overflow-y-auto"
      />
      <pre v-else class="text-sm p-4 text-white/80">{{ demoData?.raw || '…' }}</pre>
    </div>
  </div>
</template>
