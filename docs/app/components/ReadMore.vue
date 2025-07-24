<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'

const props = defineProps<{
  to: string
  title: string
}>()

const createBreadcrumb = (link: string = 'Missing link') => {
  if (link.startsWith('http')) {
    return link
  }
  return link
    .split('/')
    .filter(Boolean)
    .map(part =>
      splitByCase(part)
        .map(p => upperFirst(p))
        .join(' '),
    )
    .join(' > ')
    .replace('Api', 'API')
}

const computedTitle = computed<string>(() => props.title || createBreadcrumb(props.to))
</script>

<template>
  <ProseCallout
    icon="i-lucide-bookmark"
    :to="to"
    :aria-label="computedTitle"
  >
    <slot mdc-unwrap="p">
      Read more in <span
        class="font-bold"
        v-text="computedTitle"
      />.
    </slot>
  </ProseCallout>
</template>
