<script setup lang="ts">
import { useTres } from '@tresjs/core'
import * as THREE from 'three'
import { isReactive, shallowRef, watch } from 'vue'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/master/src/core/GradientTexture.tsx

export type GradientType = 'linear' | 'radial'

interface Props {
  /**
   * A `number[]` of values between `0` and `1` representing the color positions in the gradient. `stops.length` should match `color.
   */
  stops: Array<number>
  /**
   * A `THREE.ColorRepresentation[]` representing the colors in the gradient.
   */
  colors: Array<THREE.ColorRepresentation>
  /**
   * Where the component should be attached within its parent.
   */
  attach?: string
  /**
   * Height of the canvas used to draw the gradient.
   */
  height?: number
  /**
   * Width of the canvas used to draw the gradient.
   */
  width?: number
  /**
   * `'linear' \| 'radial'` Type of gradient to draw.
   */
  type?: GradientType
  /**
   * Radius of the inner circle of a radial gradient.
   */
  innerCircleRadius?: number
  /**
   * Radius of the outer circle of a radial gradient.
   */
  outerCircleRadius?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  height: 1024,
  width: 16,
  type: 'linear',
  innerCircleRadius: 0,
  outerCircleRadius: 'auto',
  attach: 'map',
})

const textureRef = shallowRef()
const canvas = document.createElement('canvas')

function update(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')!
  canvas.width = props.width
  canvas.height = props.height
  let gradient
  if (props.type === 'linear') {
    gradient = context.createLinearGradient(0, 0, 0, props.height)
  }
  else {
    const canvasCenterX = canvas.width / 2
    const canvasCenterY = canvas.height / 2
    const radius
        = props.outerCircleRadius !== 'auto'
          ? Math.abs(Number(props.outerCircleRadius))
          : Math.sqrt(canvasCenterX ** 2 + canvasCenterY ** 2)
    gradient = context.createRadialGradient(
      canvasCenterX,
      canvasCenterY,
      Math.abs(props.innerCircleRadius),
      canvasCenterX,
      canvasCenterY,
      radius,
    )
  }

  const tempColor = new THREE.Color() // reuse instance for performance
  let i = props.stops.length
  while (i--) {
    gradient.addColorStop(props.stops[i], tempColor.set(props.colors[i]).getStyle())
  }
  context.save()
  context.fillStyle = gradient
  context.fillRect(0, 0, props.width, props.height)
  context.restore()

  if (textureRef.value) {
    textureRef.value.needsUpdate = true
  }
}

const renderer = useTres().renderer

watch(() => [props.colors, props.stops, props.height, props.width, props.type, props.innerCircleRadius, props.outerCircleRadius], () => { update(canvas) }, { immediate: true })

if (isReactive(props.colors)) {
  watch(props.colors, () => update(canvas))
}

if (isReactive(props.stops)) {
  watch(props.stops, () => update(canvas))
}

defineExpose({ instance: textureRef })
</script>

<template>
  <TresCanvasTexture ref="textureRef" :color-space="renderer.outputColorSpace" :args="[canvas]" :attach="props.attach" />
</template>
