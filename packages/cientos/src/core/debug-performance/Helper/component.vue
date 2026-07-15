<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { useHelper } from './useHelper'
import type { TresObject } from '@tresjs/core'

type HelperConstructor = new (...args: any[]) => any

export interface HelperProps {
  type: HelperConstructor
  args?: any[]
}

const props = defineProps<HelperProps>()

const objRef = shallowRef<TresObject>()
const parentRef = shallowRef<TresObject>()

watchEffect(() => {
  if (objRef.value && objRef.value.parent) {
    parentRef.value = objRef.value.parent
  }
})

useHelper(parentRef, props.type, ...(props.args) ?? [])
</script>

<template>
  <TresObject3D ref="objRef" />
</template>
