<script setup lang="ts">
import type { SceneGraphObject } from '~/client/types'

interface Props {
  item: SceneGraphObject
  level?: number
}

interface Emits {
  (e: 'select-object', object: unknown): void
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
})

const emit = defineEmits<Emits>()

// Local state
const isExpanded = ref(props.item.defaultExpanded ?? false)

// Toggle expansion
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// Handle object selection
const handleSelect = () => {
  emit('select-object', props.item.value)
}

// Computed properties
const hasChildren = computed(() => props.item.children && props.item.children.length > 0)
const indentStyle = computed(() => ({ paddingLeft: `${props.level * 16}px` }))
</script>

<template>
  <div class="font-mono text-xs">
    <!-- Current node -->
    <div
      :style="indentStyle"
      class="flex items-center py-1 hover:bg-gray-50 group cursor-pointer"
      @click="handleSelect"
    >
      <!-- Expand/collapse icon -->
      <div
        v-if="hasChildren"
        class="mr-1 w-4 h-4 flex items-center justify-center"
        @click.stop="toggleExpanded"
      >
        <UIcon
          :name="isExpanded ? 'i-tabler:caret-down-filled' : 'i-tabler:caret-right-filled'"
          class="w-3 h-3 text-gray-400"
        />
      </div>
      <div
        v-else
        class="mr-1 w-4 h-4"
      />

      <!-- Node content -->
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <!-- Icon -->
        <UIcon
          :name="item.icon"
          class="w-4 h-4 text-gray-600 flex-shrink-0"
        />

        <!-- Label -->
        <span class="text-gray-700 font-medium">
          {{ item.label }}
        </span>

        <!-- Name badge -->
        <UBadge
          v-if="item.name"
          color="primary"
          size="sm"
          variant="soft"
        >
          {{ item.name }}
        </UBadge>

        <!-- Memory size badge -->
        <UBadge
          v-if="item.memorySize > 0"
          color="warning"
          size="sm"
          variant="soft"
        >
          {{ item.memorySize }} KB
        </UBadge>
      </div>
    </div>

    <!-- Children nodes -->
    <template v-if="hasChildren && isExpanded">
      <TreeGraph
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :level="level + 1"
        @select-object="(object: unknown) => emit('select-object', object)"
      />
    </template>
  </div>
</template>
