<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InspectorNode } from '~/client/types'
import { copyPath, copyProp, copyPropAsArray, copyValue, copyValueAsArray, copyValueAsJSON, copyValueAsVector3, copyValueAsEuler, copyValueAsQuaternion } from '~/utils/clipboard'

interface Props {
  node: InspectorNode
  level?: number
  selectedObject?: unknown
}

interface Emits {
  (e: 'update-value', path: string, value: unknown): void
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
})

const emit = defineEmits<Emits>()

// Local state
const isExpanded = ref(props.node.defaultExpanded ?? false)
const editingItem = ref<{ path: string, value: string } | null>(null)

// Toggle expansion
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// Value utilities
const getValueClass = (value: unknown): string => {
  if (typeof value === 'boolean') return 'text-blue-500'
  if (typeof value === 'number') return 'text-green-500'
  if (typeof value === 'string') return 'text-red-500'
  if (typeof value === 'undefined') return 'text-gray-400'
  return 'text-gray-600'
}

const getLabel = (value: unknown): string => {
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'string') return `"${value}"`
  if (value === null) return 'null'
  if (typeof value === 'undefined') return 'undefined'
  return 'object'
}

// Value modification
const incrementValue = (): void => {
  if (typeof props.node.value === 'number') {
    const newValue = props.node.value + 1
    emit('update-value', props.node.path, newValue)
  }
}

const decrementValue = (): void => {
  if (typeof props.node.value === 'number') {
    const newValue = props.node.value - 1
    emit('update-value', props.node.path, newValue)
  }
}

const updateBooleanValue = (value: boolean): void => {
  emit('update-value', props.node.path, value)
}

// Inline editing
const startEditing = (): void => {
  const displayValue = typeof props.node.value === 'string'
    ? props.node.value
    : JSON.stringify(props.node.value)
  editingItem.value = { path: props.node.path, value: displayValue }
}

const applyEdit = (): void => {
  if (!editingItem.value) return

  try {
    const { value } = editingItem.value
    let parsedValue: unknown = value

    // Try to parse as number if it looks like a number
    if (!Number.isNaN(Number(value))) {
      parsedValue = Number(value)
    }
    // Try to parse as boolean
    else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      parsedValue = value.toLowerCase() === 'true'
    }

    emit('update-value', props.node.path, parsedValue)
  }
  catch (error) {
    console.error('Failed to apply edit:', error)
  }
  finally {
    editingItem.value = null
  }
}

const cancelEdit = (): void => {
  editingItem.value = null
}

const handleInputKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    applyEdit()
  }
  else if (event.key === 'Escape') {
    cancelEdit()
  }
}

// Computed properties
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)
const isLeaf = computed(() => !hasChildren.value)
const indentStyle = computed(() => ({ paddingLeft: `${props.level * 16}px` }))
</script>

<template>
  <div class="font-mono text-xs text-gray-500">
    <!-- Current node -->
    <div
      :style="indentStyle"
      class="flex items-center py-0.5 hover:bg-gray-50 group"
      :class="{ 'cursor-pointer': hasChildren }"
    >
      <!-- Expand/collapse icon -->
      <div
        v-if="hasChildren"
        class="mr-1 w-4 h-4 flex items-center justify-center"
        @click="toggleExpanded"
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
      <div class="flex items-center gap-1 flex-1 min-w-0">
        <!-- Object/Array display -->
        <template v-if="node.type === 'object' || node.type === 'array'">
          <span
            class="cursor-pointer select-none"
            @click="hasChildren ? toggleExpanded() : undefined"
          >
            {{ node.label }} : <span class="text-gray-600 font-semibold">{{ node.value }}</span>
          </span>

          <UDropdownMenu
            v-if="node.type !== 'array'"
            size="xs"
            :items="[
              { label: 'Copy Path', icon: 'i-lucide:link', onSelect: () => copyPath(node.path) },
              { label: 'Copy value as Array', icon: 'i-material-symbols:data-array', onSelect: () => copyValueAsArray(node) },
              node.value === '_Vector3' ? { label: 'Copy value as Vector3', icon: 'i-lucide:pen-line', onSelect: () => copyValueAsVector3(node) } : null,
              node.value === '_Euler' ? { label: 'Copy as Euler', icon: 'i-lucide:rotate-3d', onSelect: () => copyValueAsEuler(node) } : null,
              node.value === '_Quaternion' ? { label: 'Copy as Quaternion', icon: 'i-lucide:rotate-3d', onSelect: () => copyValueAsQuaternion(node) } : null,
              { label: 'Copy value as JSON', icon: 'i-material-symbols:data-object', onSelect: () => copyValueAsJSON(node) },
              node.value === '_Vector3' || node.value === '_Euler' || node.value === '_Quaternion' ? { label: 'Copy as Prop', icon: 'i-lucide:code', onSelect: () => copyPropAsArray(node) } : null,
            ].filter(Boolean)"
            :ui="{
              content: 'w-48',
            }"
          >
            <UButton
              size="xs"
              variant="ghost"
              color="gray"
              icon="i-lucide-ellipsis-vertical"
              title="Copy value"
            />
          </UDropdownMenu>
        </template>

        <!-- Primitive value display -->
        <template v-else>
          <span>{{ node.label }} :</span>

          <!-- Checkbox for boolean values -->
          <UCheckbox
            v-if="typeof node.value === 'boolean'"
            :model-value="node.value"
            size="xs"
            @update:model-value="updateBooleanValue"
            @click.stop
          />

          <!-- Inline editing input for strings and other types -->
          <UInput
            v-else-if="editingItem?.path === node.path && typeof node.value !== 'number' && typeof node.value !== 'boolean'"
            v-model="editingItem!.value"
            size="xs"
            class="w-20"
            variant="soft"
            @keydown.stop="handleInputKeydown"
            @blur="applyEdit"
            @focus="(event: FocusEvent) => (event.target as HTMLInputElement)?.select()"
            @click.stop
          />

          <!-- Number input for numeric values -->
          <UInputNumber
            v-else-if="editingItem?.path === node.path && typeof node.value === 'number'"
            v-model="editingItem!.value"
            size="xs"
            variant="subtle"
            orientation="vertical"
            :format-options="{
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }"
            class="w-20"
            @keydown.stop="handleInputKeydown"
            @blur="applyEdit"
            @focus="(event: FocusEvent) => (event.target as HTMLInputElement)?.select()"
            @click.stop
          />

          <!-- Display value (clickable for editing) -->
          <span
            v-else-if="typeof node.value !== 'boolean'"
            :class="[getValueClass(node.value), 'cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded']"
            @click.stop="startEditing"
          >
            {{ getLabel(node.value) }}
          </span>
        </template>

        <!-- Control buttons -->
        <div
          v-if="isLeaf"
          class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
          @click.stop
        >
          <!-- Number controls -->
          <template v-if="typeof node.value === 'number'">
            <UButton
              size="xs"
              variant="ghost"
              color="gray"
              icon="i-tabler:minus"
              title="Decrease value"
              @click.stop="decrementValue"
            />
            <UButton
              size="xs"
              variant="ghost"
              color="gray"
              icon="i-tabler:plus"
              title="Increase value"
              @click.stop="incrementValue"
            />
          </template>
          <UDropdownMenu
            size="xs"
            :items="[
              { label: 'Copy Value', icon: 'i-lucide:copy', onSelect: () => copyValue(node.value) },
              { label: 'Copy Path', icon: 'i-lucide:link', onSelect: () => copyPath(node.path) },
              { label: 'Copy as prop', icon: 'i-lucide:pen-line', onSelect: () => copyProp(node) },
            ]"
            :ui="{
              content: 'w-48',
            }"
          >
            <UButton
              size="xs"
              variant="ghost"
              color="gray"
              icon="i-lucide-ellipsis-vertical"
              title="Copy value"
            />
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <!-- Children nodes -->
    <template v-if="hasChildren && isExpanded">
      <InspectorTree
        v-for="child in node.children"
        :key="`${child.path}-${child.label}`"
        :node="child"
        :level="level + 1"
        :selected-object="selectedObject"
        @update-value="(path: string, value: unknown) => emit('update-value', path, value)"
      />
    </template>
  </div>
</template>
