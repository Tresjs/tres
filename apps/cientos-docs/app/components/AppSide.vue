<script setup lang="ts">
const navigation = inject(navigationInjectionKey)

const route = useRoute()

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
      :default-open="false"
    />
  </UPageAside>
</template>
