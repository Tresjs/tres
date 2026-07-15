<script setup lang="ts">
const route = useRoute()

function getSlugFromPath(path: string) {
  return path.split('/').pop()
}

function getRepoPathFromPath(path: string) {
  return `https://github.com/Tresjs/tres/tree/main/apps/lab/app/components/${getSlugFromPath(path)}`
}

function getRepoTitleFromPath(path: string) {
  return `${getSlugFromPath(path)} – code on Github`
}

const to = getRepoPathFromPath(route.path)
const title = getRepoTitleFromPath(route.path)

</script>

<template>
  <UButton :to="to" :title="title" icon="i-carbon-logo-github" class="rounded-full" color="neutral" variant="subtle" />
</template>
