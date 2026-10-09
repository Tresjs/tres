<script setup lang="ts">
import { extend } from '@tresjs/core'
import { PointsNodeMaterial } from 'three/webgpu'
import { shallowRef } from 'vue'
import { useInstancedPoints } from '../../../utils/useInstancedPoints'
import type { StarsProps } from './props'
import { starsDefaults } from './props'
import { useStars } from './useStars'

const props = withDefaults(defineProps<StarsProps>(), starsDefaults)

extend({ PointsNodeMaterial })

const materialRef = shallowRef<PointsNodeMaterial>()
// `PointsMaterial` never reads the GLSL version's `aScale` attribute, so this version leaves it out.
const { positions, materialProps } = useStars(props, materialRef)
const { positionNode, count } = useInstancedPoints(positions, materialRef)

// A `Sprite`, not `Points` as in the root entry. It raycasts as one quad at its origin.
const starsRef = shallowRef()

defineExpose({
  instance: starsRef,
})
</script>

<template>
  <TresSprite ref="starsRef" :count="count" :frustum-culled="false">
    <TresPointsNodeMaterial
      ref="materialRef"
      v-bind="materialProps"
      :position-node="positionNode"
    />
  </TresSprite>
</template>
