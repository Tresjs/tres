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
  <UContainer>
    <UPageList>
      <ul v-if="data && data.length">
        <li v-for="doc in data" :key="doc.path">
          <ULink :to="doc.path">{{ doc.title || doc.path.split("/").pop() }}</ULink>
        </li>
      </ul>
    </UPageList>
  </UContainer>
</template>
