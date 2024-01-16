<script setup lang="ts">
import { toRaw } from 'vue'

const props = defineProps<{
  entry: any
  depth?: number
}>()

const isObject = value => value && typeof value === 'object' && !Array.isArray(value)
const isString = value => typeof value === 'string'

const isArray = value => Array.isArray(value)

const data = computed(() => {
  // Handle both objects and arrays
  const entries = isObject(props.entry) ? Object.entries(props.entry) : props.entry
  return entries.map((entry, index) => {
    const [key, value] = isObject(props.entry) ? entry : [index, entry]
    return {
      key,
      value,
      expandable: isObject(value) || isArray(value),
    }
  })
})

// Reactive state to track collapsed/expanded states
const collapsedKeys = reactive({})

// Toggle the collapsed state
const toggleCollapse = (key) => {
  collapsedKeys[key] = !collapsedKeys[key]
}

const isExpanded = key => collapsedKeys[key]

function changeValue(key, value) {
  console.log('changeValue', key, value)
}
</script>

<template>
  <div
    v-for="(item, index) in data"
    :key="item.key + index"
    class="pb1 text-sm"
  >
    <!-- Check if the item is expandable (either an object or an array) -->
    <template v-if="item.expandable && depth < 2">
      <div
        class="flex items-center"
        @click="toggleCollapse(item.key)"
      >
        <Icon
          class="mr-2"
          :name="isExpanded(item.key) ? 'i-carbon-caret-down' : 'i-carbon-caret-right'"
        />
        <span class="text-gray-400"> {{ item.key }}</span>  : {{ isArray(item.value) ? `Array(${item.value.length})` : 'Object' }}
      </div>
      <div
        v-show="isExpanded(item.key)"
        class="pl-8 py2"
      >
        <!-- Handle Objects -->
        <template v-if="isObject(item.value)">
          <InspectorBranch
            :key="item.key"
            :entry="{ ...item.value }"
            :depth="depth + 1"
          />
        </template>
        <!-- Handle Arrays -->
        <template v-if="isArray(item.value)">
          <span class="text-gray-500 -ml-4">[<span class="text-gray-400">{{ item.value.length > 0 ? '{' : '' }}</span></span>
          <div
            v-for="(elem, index) in item.value"
            :key="index"
            class="pl-4"
          >
            <span
              v-if="index > 0"
              class="text-gray-400  -ml-4"
            >{</span>
            <InspectorBranch
              :key="index"
              :entry="{ ...elem }"
              :depth="depth + 1"
            />   
            <!-- This assumes you want to show each array element. Adjust as needed. -->
            <!--  <InspectorBranch :entry="elem" /> -->
            <span
              v-if="index < item.value.length - 1"
              class="text-gray-400 -ml-4"
            >},</span>
          </div>
          <span class="text-gray-500"><span class="text-gray-400">{{ item.value.length > 0 ? '}' : '' }}</span>]</span>
        </template>
      </div>
    </template>
    <!-- Non-expandable items (primitive types) -->
    <template v-else>
      <div class="flex gap-1">
        <label
          for=""
          class="text-gray-400"
        >{{ item.key }}</label> :
        <UBadge
          color="gray"
          variant="soft"
        > 
          {{ isString(item.value) ? '"' : '' }}  {{ item.value }}   {{ isString(item.value) ? '"' : '' }}
        </UBadge>
        <!-- <input
          :value="toRaw(item.value)"
          type="text"
          @input="changeValue(item.key, $event.target.value)"
        > -->
      </div>
    </template>
  </div>
</template>