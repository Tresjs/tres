<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { Color, FrontSide } from 'three'
import { computed, shallowRef } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { Side } from 'three'

import HolographicMaterial from './HolographicMaterialParameters'

const props = withDefaults(
  defineProps<{
    fresnelAmount?: number
    fresnelOpacity?: number
    blinkFresnelOnly?: boolean
    enableBlinking?: boolean
    enableAdditive?: boolean
    hologramBrightness?: number
    scanlineSize?: number
    signalSpeed?: number
    hologramOpacity?: number
    hologramColor?: TresColor
    side?: Side
  }>(),
  {
    fresnelAmount: 0.45,
    fresnelOpacity: 1.0,
    blinkFresnelOnly: true,
    enableBlinking: true,
    enableAdditive: true,
    hologramBrightness: 0.7,
    scanlineSize: 8.0,
    signalSpeed: 0.45,
    hologramOpacity: 1.0,
    hologramColor: '#00d5ff',
    side: FrontSide,
  },
)

const MeshHolographicMaterialClass = shallowRef()

const { extend } = useTresContext()

extend({ HolographicMaterial })

defineExpose({ root: MeshHolographicMaterialClass, constructor: HolographicMaterial })

const colorValue = computed(() => new Color(props.hologramColor as string))

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  MeshHolographicMaterialClass.value?.update()
  // TODO: comment this until invalidate is back in the loop callback on v5
  // invalidate()
})
</script>

<template>
  <TresHolographicMaterial
    ref="MeshHolographicMaterialClass"
    :uniforms-fresnelAmount-value="props.fresnelAmount"
    :uniforms-enableBlinking-value="props.enableBlinking"
    :uniforms-fresnelOpacity-value="props.fresnelOpacity"
    :uniforms-hologramBrightness-value="props.hologramBrightness"
    :uniforms-scanlineSize-value="props.scanlineSize"
    :uniforms-signalSpeed-value="props.signalSpeed"
    :uniforms-hologramColor-value="colorValue"
    :uniforms-hologramOpacity-value="props.hologramOpacity"
    :uniforms-blinkFresnelOnly-value="props.blinkFresnelOnly"
    :enableAdditive="props.enableAdditive"
    :side="props.side"
  />
</template>
