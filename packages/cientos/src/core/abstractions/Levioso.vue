<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { MathUtils } from 'three'
import { shallowRef } from 'vue'

const props = withDefaults(
  defineProps<{
    speed?: number
    rotationFactor?: number
    floatFactor?: number
    range?: [number, number]
  }>(),
  {
    speed: 1,
    rotationFactor: 1,
    floatFactor: 1,
    range: () => [-0.1, 0.1],
  },
)
const groupRef = shallowRef()

defineExpose({
  instance: groupRef,
})

{
  const PERIOD_SCALE = 1 / 4
  const AMPLITUDE_ROTATION_X = 1 / 8
  const AMPLITUDE_ROTATION_Y = 1 / 8
  const AMPLITUDE_ROTATION_Z = 1 / 20
  const START_OFFSET = Math.random() * 10000

  const { onBeforeRender } = useLoop()
  let elapsed = START_OFFSET

  onBeforeRender(({ delta /* invalidate */ }) => {
    if (!groupRef.value) { return }

    elapsed += delta * props.speed
    const theta = elapsed * PERIOD_SCALE

    const group = groupRef.value
    group.rotation.x = Math.cos(theta) * AMPLITUDE_ROTATION_X * props.rotationFactor
    group.rotation.y = Math.sin(theta) * AMPLITUDE_ROTATION_Y * props.rotationFactor
    group.rotation.z = Math.sin(theta) * AMPLITUDE_ROTATION_Z * props.rotationFactor
    group.position.y = MathUtils.mapLinear(Math.sin(theta), -1, 1, props.range[0], props.range[1]) * props.floatFactor

    // TODO: comment this until invalidate is back in the loop callback on v5
    // invalidate()
  })
}
</script>

<template>
  <TresGroup
    v-bind="$attrs"
    ref="groupRef"
  >
    <slot></slot>
  </TresGroup>
</template>
