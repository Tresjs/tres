<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { MathUtils } from 'three'
import { ref, shallowRef } from 'vue'

const props = withDefaults(
  defineProps<{
    speed: number
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
  value: groupRef,
})

const { onLoop } = useRenderLoop()

const offset = ref(Math.random() * 10000)

onLoop(({ elapsed }) => {
  if (!groupRef.value) return

  const theta = offset.value + elapsed
  groupRef.value.rotation.x = (Math.cos((theta / 4) * props.speed) / 8) * props.rotationFactor
  groupRef.value.rotation.y = (Math.sin((theta / 4) * props.speed) / 8) * props.rotationFactor
  groupRef.value.rotation.z = (Math.sin((theta / 4) * props.speed) / 20) * props.rotationFactor
  let yPosition = Math.sin((theta / 4) * props.speed) / 10
  yPosition = MathUtils.mapLinear(yPosition, -0.1, 0.1, props.range?.[0] ?? -0.1, props.range?.[1] ?? 0.1)
  groupRef.value.position.y = yPosition * props.floatFactor
})
</script>

<template>
  <TresGroup
    v-bind="$attrs"
    ref="groupRef"
  >
    <slot />
  </TresGroup>
</template>
