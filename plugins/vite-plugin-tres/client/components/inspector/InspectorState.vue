<script setup lang="ts">
import PropertyTree from '../PropertyTree.vue'
import CodeView from '../CodeView.vue'

const tabs = ref([
  {
    slug: 'property-tree',
    name: PropertyTree,
    path: '/property-tree',
    icon: 'i-carbon-tree-view',
  },
  {
    slug: 'code-view',
    name: CodeView,
    path: '/code-view',
    icon: 'i-iconoir-code',
  },
])
const currentTab = ref(0)

const { internal } = useDevtoolsHook()
</script>

<template>
  <header class="border-b border-base p4 text-gray-400 flex justify-between">
    <div>
      {{ internal?.selectedObject.type }} 
      <UBadge
        v-if="internal.selectedObject.name "
        variant="soft"
      >
        {{ internal.selectedObject.name }}
      </UBadge>
    </div>
    <div class="flex gap-4">
      <UButton
        v-for="tab, index in tabs"
        :key="tab.name"
        :variant="tabs[currentTab].name === tab.name ? 'solid' : 'ghost'"
        size="sm"
        :icon="tab.icon"
        @click="currentTab = index"
      />
    </div>
  </header>
  <div class="w-full p4 overflow-y-scroll h-full">
    <component :is="tabs[currentTab].name" />
    <!--  <template v-if="currentTab.slug === 'property-tree'">
      <PropertyTree />
    </template>
    <template v-else-if="currentTab.slug === 'code-view'">
      <CodeView />
    </template> -->
  </div>
</template>