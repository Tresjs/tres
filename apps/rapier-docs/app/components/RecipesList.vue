<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('docs').where('path', 'LIKE', '/cookbook/%').where('extension', '=', 'md').all())

const recipes = computed(() => Array.from(data.value || []))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <UPageCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :title="recipe.title"
      :description="recipe.description"
      :to="recipe.path"
      reverse
      spotlight
    >
      <img
        v-if="recipe.meta"
        :src="recipe.meta.thumbnail as string"
        alt="recipe thumbnail"
        class="w-full h-full object-cover"
      />
    </UPageCard>
  </div>
</template>
