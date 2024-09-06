<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { ref, watch, watchEffect } from 'vue'
import type { InstancedMesh, Mesh } from 'three'
import { useSurfaceSampler } from '.'
import type { useSurfaceSamplerProps } from '.'

const props = defineProps<useSurfaceSamplerProps>()

const samplerRef = ref()
const instancedRef = ref()
const meshToSampleRef = ref()

const { invalidate } = useTresContext()

watch(props, () => invalidate())

// TODO: refactor to use watch instead.
watchEffect(() => {
  instancedRef.value = props.instanceMesh ?? samplerRef.value?.children.find((c: any) => Object.prototype.hasOwnProperty.call(c, 'instanceMatrix')) as InstancedMesh

  meshToSampleRef.value = props.mesh ?? (samplerRef.value?.children.find((c: any) => c.type === 'Mesh') as Mesh)

  useSurfaceSampler(meshToSampleRef.value, props.count, instancedRef.value, props.weight, props.transform)
})

defineExpose({
  samplerRef,
})
</script>

<template>
  <TresGroup ref="samplerRef">
    <slot></slot>
  </TresGroup>
</template>
