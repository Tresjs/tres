<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface RouteItem {
  label: string
  to: string
}

interface GroupedRoutes {
  group: string
  routes: RouteItem[]
}

const router = useRouter()

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Groups routes by the first segment of their path.
 */
const groupedRoutes = computed<GroupedRoutes[]>(() => {
  // Filter out the root route and map to label/to
  const routes: RouteItem[] = router.options.routes
    .filter(route => route.path !== '/')
    .map(route => ({
      label: route.path.split('/').pop()?.replace(/-/g, ' ') || 'root',
      to: route.path,
    }))

  // Group by first path segment
  const groups: Record<string, RouteItem[]> = {}
  for (const route of routes) {
    const first = route.to.replace(/^\//, '').split('/')[0] || 'root'
    if (!groups[first]) groups[first] = []
    groups[first].push(route)
  }

  // Convert to array for easy v-for
  return Object.entries(groups).map(([group, routes]) => ({ group, routes }))
})

const iconMap = {
  basic: 'i-lucide-shapes',
  advanced: 'i-lucide-rocket',
  loaders: 'i-lucide-cat',
}
</script>

<template>
  <UContainer class="grid mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <UPageCard
      v-for="group in groupedRoutes"
      :key="group.group"
      variant="subtle"
      class="mb-6"
      :title="capitalize(group.group)"
      :icon="iconMap[group.group]"
    >
      <ul>
        <li
          v-for="route in group.routes"
          :key="route.label"
          class="text-sm font-mono"
        >
          <NuxtLink :to="route.to">
            {{ route.label }}
          </NuxtLink>
        </li>
      </ul>
    </UPageCard>
  </UContainer>
</template>
