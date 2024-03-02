<script setup>
import { data as recipes } from '../recipes.data.ts'
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-8 -mx-4 pt-8">
    <li
      v-for="recipe of recipes"
      :key="recipe.title"
      class="list-none important-m-0"
    >
      <a
        :href="recipe.url"
      >
        <img
          :src="recipe.thumbnail"
          :alt="recipe.title"
          class="aspect-video object-cover rounded-lg"
        >
    
        <h3>
          {{ recipe.title }}
          <span
            v-for="n in recipe.difficulty"
            :key="n"
            aria-label="chili"
            role="img"
            class="text-sm"
          >🌶️</span>
        
        </h3></a>
      <p>{{ recipe.excerpt }}</p>
    </li>
  </ul>
</template>