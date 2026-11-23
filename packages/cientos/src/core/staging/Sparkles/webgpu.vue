<script lang="ts" setup>
import { Sprite } from 'three/webgpu'
import type { SparklesProps } from './props'
import { sparklesDefaults } from './props'
import { SparklesNodeMaterial } from './SparklesNodeMaterial'
import { useSparkles } from './useSparkles'

const props = withDefaults(defineProps<SparklesProps>(), sparklesDefaults)

const { object: sparkles } = useSparkles(props, (yFor) => {
  const material = new SparklesNodeMaterial(yFor)
  const sprite = new Sprite(material)
  // Own copy of the shared quad: disposing it frees the instance buffers, and other sprites keep theirs.
  sprite.geometry = sprite.geometry.clone()
  sprite.count = 0
  // Sprite culling and raycasting test one quad at the origin, not the instances.
  sprite.frustumCulled = false
  sprite.raycast = () => {}
  return {
    object: sprite,
    material,
    setGeometry: (geometry) => { sprite.count = material.setGeometry(geometry) },
  }
})

defineExpose({ instance: sparkles })
</script>

<template>
  <primitive :object="sparkles" />
</template>
