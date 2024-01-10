<script setup lang="ts">
const props = defineProps<{
  entry: any
  depth?: number
}>()

const isObject = value => value && typeof value === 'object' && !Array.isArray(value)

const isArray = value => Array.isArray(value)

const data = computed(() => {
  // Handle both objects and arrays
  const entries = isObject(props.entry) ? Object.entries(props.entry) : props.entry
  return entries.map((entry, index) => {
    const [key, value] = isObject(props.entry) ? entry : [index, entry]
    return {
      key,
      value,
      uuid: Math.random().toString(36).substring(7),
      expandable: isObject(value) || isArray(value),
    }
  })
})

// Reactive state to track collapsed/expanded states
const collapsedKeys = reactive({})

// Toggle the collapsed state
const toggleCollapse = (uuid) => {
  collapsedKeys[uuid] = !collapsedKeys[uuid]
}

const isExpanded = uuid => collapsedKeys[uuid]

const editableKeys = reactive({})
</script>

<template>
  <div
    v-for="item in data"
    :key="item.key"
    class="pb1 text-sm"
  >
    <!-- Check if the item is expandable (either an object or an array) -->
    <template v-if="item.expandable && depth < 1">
      <div
        class="flex items-center"
        @click="toggleCollapse(item.uuid)"
      >
        <Icon
          class="mr-2"
          :name="isExpanded(item.uuid) ? 'i-carbon-caret-down' : 'i-carbon-caret-right'"
        />
        <span class="text-purple-400"> {{ item.key }}</span>  : {{ isArray(item.value) ? 'Array' : 'Object' }}
      </div>
      <div
        v-show="isExpanded(item.uuid)"
        class="pl-8 py2"
      >
        <!-- Handle Objects -->
        <template v-if="isObject(item.value)">
          <!--  <InspectorBranch
            :entry="item.value"
            :depth="depth + 1"
          /> -->
        </template>
        <!-- Handle Arrays -->
        <template v-if="isArray(item.value)">
          <div
            v-for="(elem, index) in item.value"
            :key="index"
          >
            <!-- This assumes you want to show each array element. Adjust as needed. -->
            <!--  <InspectorBranch :entry="elem" /> -->
          </div>
        </template>
      </div>
    </template>
    <!-- Non-expandable items (primitive types) -->
    <template v-else>
      <div class="flex gap-1">
        <label
          for=""
          class="text-purple-400"
        >{{ item.key }}</label> :
        <input
          class="text-red-400"
          :value="item.value"
          :type="typeof item.value"
        >
      </div>
    </template>
  </div>
</template>