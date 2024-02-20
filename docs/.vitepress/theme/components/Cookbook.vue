<script setup>
import { data as recipes } from '../recipes.data.ts'

console.log(recipes)
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-8 -mx-4 pt-8">
    <li
      v-for="recipe of recipes"
      :key="recipe.title"
      class="list-none important-m-0"
    >
      <img
        :src="recipe.thumbnail"
        :alt="recipe.title"
        class="aspect-video object-cover rounded-lg"
      >
      <a
        :href="recipe.url"
      >
        <h2>
          {{ recipe.title }}
          <span
            v-for="n in recipe.difficulty"
            :key="n"
            aria-label="chili"
            role="img"
            class="text-sm"
          >🌶️</span></h2>
        
      </a>
      <p>{{ recipe.excerpt }}</p>
    </li>
  </ul>
</template>