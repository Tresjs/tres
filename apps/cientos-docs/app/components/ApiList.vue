<script setup lang="ts">
const props = defineProps<{
  listName: string;
  path?: string;
}>();
const route = useRoute();
const base = props.path || (route.path || "/").replace(/\/$/, "");

const { data } = await useAsyncData(props.listName, () =>
  queryCollection("docs").where("path", "LIKE", `${base}/%`).all()
);
</script>

<template>
  <UPageGrid class="grid-cols-1 lg:grid-cols-2">
    <UPageCard
      v-for="doc in data"
      :key="doc.path"
      :title="doc.title || doc.path.split('/').pop()"
      :description="doc.description"
      :to="doc.path"
    >
    </UPageCard>
  </UPageGrid>
</template>
