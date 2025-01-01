<script setup lang="ts">
import { MathUtils } from 'three'
import { useDark } from '@vueuse/core'

import { PI, colors } from './constants'
const { clamp } = MathUtils

const isDark = useDark()

const pyramidRef = ref()
const boxRef = ref()
const sphereRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (!pyramidRef.value || !boxRef.value || !sphereRef.value) return
  elapsed = elapsed * 3 + 7
  pyramidRef.value.position.y = Math.tan(clamp((1 + elapsed) % 9, 0, PI))
  boxRef.value.position.y = Math.tan(clamp((0.5 + elapsed) % 9, 0, PI))
  sphereRef.value.position.y = Math.tan(clamp(elapsed % 9, 0, PI))

  const scale0 = Math.abs(Math.cos(clamp((1 + elapsed) % 9, 0, PI)))
  const scale1 = Math.abs(Math.cos(clamp((0.5 + elapsed) % 9, 0, PI)))
  const scale2 = Math.abs(Math.cos(clamp(elapsed % 9, 0, PI)))
  pyramidRef.value.scale.set(scale0, scale0, scale0)
  boxRef.value.scale.set(scale1, scale1, scale1)
  sphereRef.value.scale.set(scale2, scale2, scale2)
})

watch(isDark, (newVal) => {
  boxRef.value.material.color.set(newVal ? colors.LIGHT : colors.DARK)
})
</script>

<template>
  <TresGroup name="imago">
    <TresMesh 
      name="pyramid"
      :position="[-1.5, 0, 0]"
      ref="pyramidRef"
    >
      <TresCylinderGeometry :args="[0, 0.60, 1]" />
      <TresMeshToonMaterial :color="colors.TEAL" />
    </TresMesh>
    <TresMesh 
      name="box"
      ref="boxRef"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshToonMaterial :color="isDark ? colors.LIGHT : colors.DARK" />
    </TresMesh>
    <TresMesh 
      name="sphere"
      :position="[1.5, 0, 0]"
      ref="sphereRef"
    >
      <TresSphereGeometry :args="[0.5, 32, 32]" />
      <TresMeshToonMaterial :color="colors.ORANGE" />
    </TresMesh>
  </TresGroup>
</template>

