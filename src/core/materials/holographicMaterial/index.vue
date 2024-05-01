<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import type { TresColor } from '@tresjs/core'
import { FrontSide } from 'three'
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

const { onLoop } = useRenderLoop()

onLoop(() => {
  MeshHolographicMaterialClass.value?.update()
})
</script>

<template>
  <TresHolographicMaterial
    ref="MeshHolographicMaterialClass"
    :uniforms-fresnel-amount-value="props.fresnelAmount"
    :uniforms-enable-blinking-value="props.enableBlinking"
    :uniforms-fresnel-opacity-value="props.fresnelOpacity"
    :uniforms-hologram-brightness-value="props.hologramBrightness"
    :uniforms-scanline-size-value="props.scanlineSize"
    :uniforms-signal-speed-value="props.signalSpeed"
    :uniforms-hologram-color-value="props.hologramColor"
    :uniforms-hologram-opacity-value="props.hologramOpacity"
    :uniforms-blink-fresnel-only-value="props.blinkFresnelOnly"
    :enable-additive="props.enableAdditive"
    :side="props.side"
  />
</template>
