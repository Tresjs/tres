<script setup lang="ts">
import type { Mesh } from 'three'
import { provide, shallowReactive } from 'vue'
import type { InstancesApi } from './const'
import { MERGED_INJECTION_KEY } from './const'
import Instances from './Instances.vue'

export interface MergedProps {
  /**
   * One batch per entry, keyed by the name `<Instance name="...">` refers to.
   */
  meshes: Record<string, Mesh>
  /**
   * Initial buffer allocation per batch. One batch per entry in `meshes`,
   * so this is deliberately lower than `<Instances>`.
   * @default 100
   */
  limit?: number
}

withDefaults(defineProps<MergedProps>(), { limit: 100 })

const registry = shallowReactive<Record<string, InstancesApi>>({})

provide(MERGED_INJECTION_KEY, registry)

defineExpose({ instances: registry })
</script>

<template>
  <Instances
    v-for="(mesh, key) in meshes"
    :key="key"
    :name="key"
    :geometry="mesh.geometry"
    :material="mesh.material"
    :limit="limit"
  />
  <slot></slot>
</template>
