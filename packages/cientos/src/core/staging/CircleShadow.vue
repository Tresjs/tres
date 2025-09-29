<script setup lang="ts">
import { Color, DoubleSide, Texture } from 'three'

import { onUnmounted, shallowRef, watchEffect } from 'vue'

interface ShadowProps {
  color?: Color | number | string
  offset?: number
  opacity?: number
  fog?: boolean
  depthWrite?: boolean
}

const props = withDefaults(defineProps<ShadowProps>(), {
  color: 'black',
  offset: 0.0,
  opacity: 0.5,
  fog: false,
  depthWrite: false,
})

const SIZE = 128
const canvas = document.createElement('canvas')
canvas.width = SIZE
canvas.height = SIZE
const context = canvas.getContext('2d') as CanvasRenderingContext2D

const texture = new Texture(canvas)

function createCanvas() {
  const gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2,
  )

  gradient.addColorStop(props.offset, new Color(props.color).getStyle())
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  context.clearRect(0, 0, SIZE, SIZE)
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  texture.needsUpdate = true
}

watchEffect(createCanvas)

const shadowRef = shallowRef()

defineExpose({ instance: shadowRef })

onUnmounted(() => texture.dispose())
</script>

<template>
  <TresMesh ref="shadowRef" :rotation-x="-Math.PI * 0.5">
    <TresPlaneGeometry />
    <TresMeshBasicMaterial transparent :opacity="props.opacity" :fog="props.fog" :depth-write="depthWrite" :side="DoubleSide" :map="texture" />
  </TresMesh>
</template>
