const DEMO_SOURCES = import.meta.glob('../components/staging/*.vue', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

export function useDemoSource() {
  const route = useRoute()
  const slots = useSlots()

  const demoVNode = computed(() => slots.default?.()[0])

  const demoName = computed(() => {
    const type = demoVNode.value?.type as Record<string, unknown> | undefined
    // not in .name because they're async
    const tag = type?.tag as string | undefined
    if (!tag) return undefined
    // meta is keyed by PascalCase, the tag is kebab-case (staging-ocean -> StagingOcean)
    return tag.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
  })

  const { data: demoData } = useAsyncData(
    `demo-source-${route.path}`,
    async () => {
      const name = demoName.value
      if (!name) {
        console.warn('[useDemoSource] could not resolve demo component name from slot')
        return { filePath: undefined, raw: undefined }
      }
      const meta = await $fetch<{ filePath?: string }>(`/api/component-meta/${name}`).catch(() => undefined)
      const filePath = meta?.filePath
      if (!filePath) {
        console.warn(`[useDemoSource] no meta found for demo "${name}"`)
        return { filePath: undefined, raw: undefined }
      }
      const key = `./${filePath.slice(filePath.indexOf('staging/'))}`
      const loader = DEMO_SOURCES[key]
      if (!loader) {
        console.warn(`[useDemoSource] no source found for demo "${name}" (key "${key}")`)
        return { filePath, raw: undefined }
      }
      const raw = await loader()
      return { filePath, raw }
    },
  )

  const sourceUrl = computed(() => {
    const filePath = demoData.value?.filePath
    if (!filePath) return undefined
    return `https://github.com/Tresjs/tres/blob/main/apps/cientos-docs/${filePath}`
  })

  // starts true for SSR / static generation for search indexing purposes, hidden for users after hydration
  const showSource = ref(true)

  onMounted(() => {
    showSource.value = false
  })

  const sourceMarkdown = computed(() => {
    const code = demoData.value?.raw
    if (!code) return undefined
    return "```vue\n" + code + "\n```"
  })

  return { demoData, sourceUrl, showSource, sourceMarkdown }
}
