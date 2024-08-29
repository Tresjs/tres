<script lang="ts" setup>
const route = useRoute()

function getSlugFromPath(path: string) {
  return path.split('/').pop()
}

function getRepoPathFromPath(path: string) {
  return `https://github.com/Tresjs/lab/tree/main/components/content/${getSlugFromPath(path)}`
}

function getRepoTitleFromPath(path: string) {
  return `${getSlugFromPath(path)} – code on Github` 
}

const repoPath = getRepoPathFromPath(route.path)
const repoTitle = getRepoTitleFromPath(route.path)
</script>

<template>
  <div>
    <TheCodeButton
      :to="repoPath"
      :title="repoTitle"
      class="fixed z-10 bottom-5 right-5"
    />
    <slot />
  </div>
</template>

<style scoped></style>
