<script setup lang="ts">
import { useTres } from '@tresjs/core'

definePageMeta({
  layout: 'experiment',
})
const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>
<template>
  <main>
    <ClientOnly>
      <ContentRenderer v-if="data" :value="data" class="w-full h-100vh relative" />
    </ClientOnly>
  </main>
</template>
