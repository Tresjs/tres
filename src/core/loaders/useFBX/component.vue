<script setup lang="ts">
import { ref } from 'vue'
import { useFBX } from '.'

export interface FBXModelProps {
  /**
   * Path to the FBX file.
   *
   * @type {string}
   * @memberof FBXModelProps
   * @required
   */
  path: string
}

const props = defineProps<{
  path: string
}>()

const modelRef = ref()

defineExpose({
  value: modelRef,
})

const model = await useFBX(props.path as string)
</script>

<template>
  <primitive
    ref="modelRef"
    :object="model"
    v-bind="$attrs"
  />
</template>