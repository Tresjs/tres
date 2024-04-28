<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import type { TresColor } from '@tresjs/core'
import { FrontSide } from 'three'
import type { Side } from 'three'

import HolographicMaterial from './material'

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
    hologramOpacity: 1.,
    hologramColor: '#00d5ff',
    side: FrontSide,
  },
)

const MeshHolographicMaterialClass = shallowRef()

const { extend } = useTresContext()

extend({ HolographicMaterial })

defineExpose({ root: MeshHolographicMaterialClass, constructor: HolographicMaterial })

const { onLoop } = useRenderLoop()

onLoop(() => {
  MeshHolographicMaterialClass.value?.update()
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
    :uniforms-hologramColor-value="props.hologramColor"
    :uniforms-hologramOpacity-value="props.hologramOpacity"
    :uniforms-blinkFresnelOnly-value="props.blinkFresnelOnly"
    :enableAdditive="props.enableAdditive"
    :side="props.side"
  />
</template>
