<script setup lang="ts">
import { useDevtoolsHook } from '../../composables/useDevtoolsHook'
import InspectorBoolean from './InspectorBoolean.vue'
import InspectorNumber from './InspectorNumber.vue'

const props = defineProps<{
  label: string
  value: any
  type?: string
  path?: string
}>()

const { editSceneObjectByPath } = useDevtoolsHook()

function changeValue(value) {
  editSceneObjectByPath(props?.path || '', value)
}
</script>

<template>
  <div class="flex items-center">
    <InspectorBoolean
      v-if="type === 'boolean'" 
      :label="label"
      :value="value"
      :type="type"
      :path="path"
      @change="changeValue"
    />
    <InspectorNumber
      v-else-if="type === 'number'"
      :label="label"
      :value="value"
      :type="type"
      :path="path"
      @change="changeValue"
    />
    <!-- <input
      class="ml-2 bg-gray-200"
      :value="value"
      :type="type"
      @input="changeValue"
    > -->
  </div>
</template>