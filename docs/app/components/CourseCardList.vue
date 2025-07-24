<script setup lang="ts">
const courses = computed(() => Array.from([
  {
    title: 'Create Interactive 3D Experiences with TresJS',
    description: 'Learn how to create interactive 3D experiences using TresJS, a powerful framework for building 3D applications.',
    link: 'https://egghead.io/courses/create-interactive-3d-experiences-with-tresjs-004057c2',
  },
  {
    title: 'Become a Three.js developer - by Bruno Simon',
    description: 'Master Three.js with this comprehensive course by Bruno Simon, covering everything from the basics to advanced techniques.',
    link: 'https://threejs-journey.com/?c=p3',
  }
]))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <UPageCard
      v-for="recipe in courses"
      :key="recipe.title"
      :title="recipe.title"
      :description="recipe.description"
      :to="recipe.link"
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

<style scoped>

</style>
