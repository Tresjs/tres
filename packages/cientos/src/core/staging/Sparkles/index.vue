<script lang="ts" setup>
import { BufferGeometry, Points } from 'three'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import type { SparklesProps } from './props'
import { sparklesDefaults } from './props'
import { SparklesMaterial } from './SparklesMaterial'
import { useSparkles } from './useSparkles'

const props = withDefaults(defineProps<SparklesProps>(), sparklesDefaults)

useWebGPUSupportWarning('Sparkles', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile. Import Sparkles from @tresjs/cientos/webgpu instead')

const { object: sparkles } = useSparkles(props, (yFor) => {
  const material = new SparklesMaterial(yFor)
  const points = new Points(new BufferGeometry(), material)
  return {
    object: points,
    material,
    setGeometry: geometry => points.geometry.copy(geometry),
  }
})

defineExpose({ instance: sparkles })
</script>

<template>
  <primitive :object="sparkles" />
</template>
