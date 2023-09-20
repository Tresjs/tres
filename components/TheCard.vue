<script setup lang="ts">
defineProps<{
  title: string
  path: string
  media: string
  description: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
}>()
</script>

<template>
  <NuxtLink :to="path">
    <div class="shadow-lg rounded-lg overflow-hidden">
      <img
        class="aspect-video object-cover"
        :src="media"
      >
      <div class="p-4">
        <h2 class="font-bold text-lg mb-2">
          {{ title }}
        </h2>
        <p class="text-sm text-gray-400 mb-2 min-h-75px">
          {{ description }}
        </p>
        <div class="flex gap-4">
          <TheTag
            v-for="tag in tags"
            :key="tag"
            :tag="tag"
          >
            {{ tag }}
          </TheTag>
        </div>
      </div>
      <footer class="flex px-4 pb-4 gap-4">
        <div class="flex items-center">
          <NuxtImg
            :src="author.avatar"
            class="border-2 border-gray-200 w-8 h-8 mr-4 rounded-full"
          />
          <span class="font-bold text-sm">{{ author.name }}</span>
        </div>
      </footer>
    </div>
  </NuxtLink>
</template>
