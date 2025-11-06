<script setup lang="ts">
const props = defineProps<{
  listName: string;
}>();
const route = useRoute();
const base = (route.path || "/").replace(/\/$/, "");

const { data } = await useAsyncData(props.listName, () =>
  queryCollection("docs").where("path", "LIKE", `${base}/%`).all()
);
</script>

<template>
  <UPageGrid>
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
