<script setup lang="ts">
const props = defineProps<
  {
    href: string
    target: '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
  }
>()

const type = computed(() => {
  if (props.href.startsWith('https://github.com/')) {
    return 'github-at'
  }
  return 'link'
})
</script>

<template>
  <GithubMagicLink
    v-if="type === 'github-at'"
    :href="href"
    target="_blank"
  />
  <NuxtLink
    v-else
    class="text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary"
    :href="href"
    :target="target"
  >
    <slot></slot>
  </NuxtLink>
</template>
