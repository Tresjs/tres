<script setup lang="ts">
import CodeView from '../CodeView.vue'
import InspectorTree from './InspectorTree.vue'

const tabs = [
  {
    slug: 'inspector-tree',
    name: 'Inspector Tree',
    component: InspectorTree,
    path: '/inspector-tree',
    icon: 'i-carbon-tree-view',
  },
  {
    slug: 'code-view',
    name: 'Code View',
    component: CodeView,
    path: '/code-view',
    icon: 'i-iconoir-code',
  },
]
const currentTab = ref(0)

const { selectedObject } = useDevtoolsHook()
</script>

<template>
  <header class="border-b border-base p4 text-gray-400 flex justify-between">
    <div>
      {{ selectedObject.type }} 
      <UBadge
        v-if="selectedObject.name "
        variant="soft"
      >
        {{ selectedObject.name }}
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
    <component :is="tabs[currentTab].component" />
    <!--  <template v-if="currentTab.slug === 'property-tree'">
      <PropertyTree />
    </template>
    <template v-else-if="currentTab.slug === 'code-view'">
      <CodeView />
    </template> -->
  </div>
</template>