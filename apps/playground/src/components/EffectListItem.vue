<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

defineProps<{
  route: RouteRecordRaw
}>()
</script>

<template>
  <router-link
    :key="route.name"
    :to="route.path"
    class="p-4 leading-normal no-underline size-m weight-600 bg-zinc-50 rounded"
  >
    <div v-if="route.meta?.icon" class="inline-block p-2 p-x-3 m-b-3 text-2xl bg-zinc-200 rounded">
      {{ route.meta.icon }}
    </div>
    <h3 class="text-sm p-0 m-0 mb-1.5 font-semibold text-zinc-600">
      {{ route.meta?.name }}
    </h3>
  </router-link>
</template>
