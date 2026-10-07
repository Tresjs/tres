<script setup lang="ts">
import { extend } from '@tresjs/core'
import { Mesh } from 'three'
import { shallowRef } from 'vue'
import { GridNodeMaterial } from './GridNodeMaterial'
import type { GridProps } from './props'
import { gridDefaults } from './props'
import { useGrid } from './useGrid'

const props = withDefaults(defineProps<GridProps>(), gridDefaults)

extend({ GridNodeMaterial })

const mesh = shallowRef<Mesh>(new Mesh())
const { materialProps } = useGrid(props, mesh)
</script>

<template>
  <!-- The material sets `transparent` itself. WebGPU needs no `extensions-derivatives`. -->
  <TresMesh ref="mesh" :frustum-culled="false">
    <TresGridNodeMaterial v-bind="materialProps" />
    <TresPlaneGeometry :args="props.args" />
  </TresMesh>
</template>
