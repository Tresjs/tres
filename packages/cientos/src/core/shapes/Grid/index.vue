<script setup lang="ts">
import { extend } from '@tresjs/core'
import { Mesh } from 'three'
import { shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { GridMaterial } from './GridMaterial'
import type { GridProps } from './props'
import { gridDefaults } from './props'
import { useGrid } from './useGrid'

const props = withDefaults(defineProps<GridProps>(), gridDefaults)

useWebGPUSupportWarning('Grid', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile. Import Grid from @tresjs/cientos/webgpu instead')

extend({ GridMaterial })

const mesh = shallowRef<Mesh>(new Mesh())
const { materialProps } = useGrid(props, mesh)
</script>

<template>
  <TresMesh ref="mesh" :frustum-culled="false">
    <TresGridMaterial
      v-bind="materialProps"
      :transparent="true"
      :extensions-derivatives="true"
    />
    <TresPlaneGeometry :args="props.args" />
  </TresMesh>
</template>
