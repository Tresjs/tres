<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>(navigationInjectionKey)

const route = useRoute()

/* const path = computed(() => route.path.replace(/\/$/, ''))
 */
const { headerLinks } = useHeaderLinks()
const links = computed(() => headerLinks.value ?? [])

const asideNavigation = computed(() => {
  const localPath = [route.params.slug?.[0]].filter(Boolean).join('/')

  const result = navPageFromPath(`/${localPath}`, navigation?.value || [])?.children || []

  return result
})
</script>

<template>
  <UPageAside>
    <UPageAnchors :links="links" />
    <USeparator
      type="dashed"
      class="my-6"
    />
    <UContentNavigation
      class="pr-4"
      highlight
      :navigation="asideNavigation"
    />
  </UPageAside>
</template>
