<script setup lang="ts">
defineEmits<{ select: [slug: string] }>()

const experiments = useFilteredExperiments()
const selectedSlug = useSelectedSlug()
</script>

<template>
  <ul class="flex flex-col gap-4 p-4">
    <li v-for="experiment in experiments" :key="experiment.slug">
      <NuxtLink
        :to="`/experiments/${experiment.slug}`"
        :title="experiment.title"
        :aria-current="experiment.slug === selectedSlug ? 'page' : undefined"
        class="group relative block aspect-video overflow-hidden rounded-lg bg-elevated ring-1 ring-default transition hover:ring-2 hover:ring-accented aria-[current=page]:ring-2 aria-[current=page]:ring-primary"
        @click="$emit('select', experiment.slug)"
      >
        <img
          :src="experiment.thumbnail"
          :alt="experiment.title"
          loading="lazy"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-103"
        />

        <span
          v-if="experiment.featured"
          class="absolute top-2 left-2 flex size-6 items-center justify-center rounded-full bg-black/60 text-yellow-300 backdrop-blur-sm"
          aria-label="Featured"
        >
          <UIcon name="i-lucide-star" class="size-3.5" />
        </span>
        <UBadge
          v-if="experiment.isNew"
          label="NEW"
          color="primary"
          variant="solid"
          size="sm"
          class="absolute top-2 right-2 font-mono font-bold"
        />

        <span
          class="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-linear-to-t from-black/80 to-transparent px-3 pt-6 pb-2 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          {{ experiment.title }}
        </span>
      </NuxtLink>
    </li>
    <li v-if="!experiments.length" class="py-8 text-center text-sm text-muted">
      No experiments match.
    </li>
  </ul>
</template>
