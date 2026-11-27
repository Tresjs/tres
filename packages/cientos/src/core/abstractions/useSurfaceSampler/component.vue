<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { ref, shallowReactive, watch, watchEffect } from 'vue'
import type { InstancedMesh, Mesh } from 'three'
import { useSurfaceSampler } from '.'
import type { SurfaceSamplerOptions } from '.'

const props = defineProps<SurfaceSamplerOptions>()

const samplerRef = ref()

const { invalidate } = useTres()

watch(props, () => {
  invalidate()
})

const samplerOptions = shallowReactive<SurfaceSamplerOptions>({
  transform: props.transform,
})

watchEffect(() => {
  samplerOptions.instanceMesh = props.instanceMesh ?? samplerRef.value?.children.find((c: any) => Object.hasOwn(c, 'instanceMatrix')) as InstancedMesh | undefined
  samplerOptions.mesh = props.mesh ?? samplerRef.value?.children.find((c: any) => c.type === 'Mesh') as Mesh | undefined
  samplerOptions.count = props.count
  samplerOptions.weight = props.weight
})

useSurfaceSampler(samplerOptions)

defineExpose({
  samplerRef,
})
</script>

<template>
  <TresGroup ref="samplerRef">
    <slot></slot>
  </TresGroup>
</template>
