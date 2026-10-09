<script setup lang="ts">
import { extend } from '@tresjs/core'
import { PointsNodeMaterial } from 'three/webgpu'
import { shallowRef } from 'vue'
import { useInstancedPoints } from '../../../utils/useInstancedPoints'
import type { PrecipitationProps } from './props'
import { precipitationDefaults } from './props'
import { usePrecipitation } from './usePrecipitation'

const props = withDefaults(defineProps<PrecipitationProps>(), precipitationDefaults)

extend({ PointsNodeMaterial })

const materialRef = shallowRef<PointsNodeMaterial>()
const { positions, materialProps, onPositionsMoved } = usePrecipitation(props, materialRef)
const { attribute, positionNode, count } = useInstancedPoints(positions, materialRef, { dynamic: true })

onPositionsMoved(() => {
  attribute.value.needsUpdate = true
})

// A `Sprite`, not `Points` as in the root entry. It raycasts as one quad at its origin.
const spriteRef = shallowRef()
defineExpose({ instance: spriteRef })
</script>

<template>
  <TresSprite ref="spriteRef" :count="count" :frustum-culled="false">
    <TresPointsNodeMaterial
      ref="materialRef"
      v-bind="materialProps"
      :position-node="positionNode"
    />
  </TresSprite>
</template>
