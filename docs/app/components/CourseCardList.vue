<script setup lang="ts">
const courses = computed(() => Array.from([
  {
    title: 'Create Interactive 3D Experiences with TresJS',
    description: 'Learn how to create interactive 3D experiences using TresJS, a powerful framework for building 3D applications.',
    thumbnail: '/recipes/model-n-animations/model-n-animations.png',
    link: 'https://egghead.io/courses/create-interactive-3d-experiences-with-tresjs-004057c2',
  },
  {
    title: 'Become a Three.js developer - by Bruno Simon',
    description: 'Master Three.js with this comprehensive course by Bruno Simon, covering everything from the basics to advanced techniques.',
    thumbnail: '/recipes/model-n-animations/model-n-animations.png',
    link: 'https://threejs-journey.com/?c=p3',
  },
]))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <UPageCard
      v-for="course in courses"
      :key="course.title"
      :title="course.title"
      :description="course.description"
      :to="course.link"
      reverse
      spotlight
    >
      <img
        v-if="course.thumbnail"
        :src="course.thumbnail as string"
        alt="course thumbnail"
        class="w-full h-full object-cover"
      />
    </UPageCard>
  </div>
</template>

<style scoped>

</style>
