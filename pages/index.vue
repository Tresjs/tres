<script setup>
const { data: experiments } = await useAsyncData('/', () => queryContent('experiments').sort({ date: -1}).find())
const { data: formattedExperiments } = await useAsyncData('/', () =>
  Promise.all(
    experiments.value.map(async experiment => {
      return {
        ...experiment,
        author: await queryContent('authors')
          .where({ slug: experiment.author })
          .only(['name', 'avatar', 'slug'])
          .findOne(),
      }
    }),
  ),
)

</script>
<template>
  <main>
    <div class="w-full container mx-auto px-4 md:px-0 mb-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
      <TheCard
        v-for="experiment in formattedExperiments"
        :title="experiment.title"
        :key="experiment._path"
        :path="experiment._path"
        :media="experiment.thumbnail"
        :description="experiment.description"
        :author="experiment.author"
        :tags="experiment.tags"
      />
    </div>
  </main>
</template>
