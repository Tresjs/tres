<script setup>
const { data: experiments } = await useAsyncData('/', 
  () => queryContent('experiments')
    .where({ $or: [ 
      { status: { $exists: false } }, 
      { status: 'published' },
    ] })
    .sort({ date: -1 })
    .find(),
)

const { data: formattedExperiments } = await useAsyncData('/', () =>
  Promise.all(
    experiments.value.map(async experiment => ({
      ...experiment,
      slug: getSlugFromExperiment(experiment),
      title: getTitleFromExperiment(experiment),
      thumbnail: getThumbnailFromExperiment(experiment),
      author: await queryContent('authors')
        .where({ slug: experiment.author })
        .only(['name', 'avatar', 'slug'])
        .findOne(),
      repoPath: getRepoPathFromExperiment(experiment),
      repoTitle: getRepoTitleFromExperiment(experiment),
    }))))

function getSlugFromExperiment(experiment) {
  return experiment.slug ?? experiment._path.split('/').pop()
}

function getTitleFromExperiment(experiment) {
  return experiment.title 
    ?? getSlugFromExperiment(experiment).split('-')
      .map(capitalize)
      .join(' ')
}

function capitalize(word) {
  if (word.length === 0) {
    return word
  } 
  else if (word.length === 1) {
    return word.toUpperCase()
  } 
  else {
    return word[0].toUpperCase() + word.slice(1)
  }
}

function getThumbnailFromExperiment(experiment) {
  return experiment.thumbnail ?? `/${getSlugFromExperiment(experiment)}.png`
}

function getRepoPathFromExperiment(experiment) {
  return `https://github.com/Tresjs/lab/tree/main/components/content/${getSlugFromExperiment(experiment)}`
}

function getRepoTitleFromExperiment(experiment) {
  return `${getSlugFromExperiment(experiment)} – code on Github` 
}
</script>

<template>
  <main>
    <div class="w-full container mx-auto px-4 md:px-0 pb-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 pt-8">
      <TheCard
        v-for="experiment in formattedExperiments"
        :key="experiment._path"
        :title="experiment.title"
        :path="experiment._path"
        :repo-title="experiment.repoTitle"
        :repo-path="experiment.repoPath"
        :media="experiment.thumbnail"
        :description="experiment.description"
        :author="experiment.author"
        :tags="experiment.tags"
      />
    </div>
  </main>
</template>
