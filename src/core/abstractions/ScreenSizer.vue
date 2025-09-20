<script setup lang="ts">
import { Vector3 } from 'three'
import { calculateScaleFactor } from '../../utils/calculateScaleFactor'
import { computed, shallowRef } from 'vue'
import { useLoop, useTres } from '@tresjs/core'

const worldPos = new Vector3()
const outerRef = shallowRef()
const innerRef = shallowRef()

const sizes = useTres().sizes
const size = computed(() => ({ width: sizes.width.value, height: sizes.height.value }))

useLoop().onBeforeRender(({ camera }) => {
  const obj = innerRef.value
  if (!obj || !camera.value) { return }
  const sf = calculateScaleFactor(obj.getWorldPosition(worldPos), 1, camera.value, size.value)
  obj.scale.setScalar(sf)
})

defineExpose({ instance: outerRef })
</script>

<template>
  <TresObject3D ref="outerRef">
    <TresObject3D ref="innerRef">
      <slot></slot>
    </TresObject3D>
  </TresObject3D>
</template>
