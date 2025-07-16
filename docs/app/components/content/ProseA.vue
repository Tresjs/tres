<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false
  }
})

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
    class="text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary"
    :href="href"
    :target="target"
  >
    <slot />
  </NuxtLink>
</template>
