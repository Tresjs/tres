<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite, Box, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import type { AtlasData } from '../../../../src/core/abstractions/AnimatedSprite/Atlas'

const { centerX, centerY, fps, asSprite } = useControls({
  centerX: { value: 0.5, min: 0, max: 1, step: 0.1 },
  centerY: { value: 0.5, min: 0, max: 1, step: 0.1 },
  fps: { value: 5, min: 0, max: 30, step: 1 },
  asSprite: true,
})

const centerDemoAtlas: AtlasData = { frames: [] }
const centerDemoImgData = (() => {
  const NUM_ROWS_COLS = 64
  const rects: { x: number, y: number, w: number, h: number }[] = []
  let h = 0
  for (let r = 0; r < NUM_ROWS_COLS; r += h) {
    let w = 0
    h++
    if (r + h >= NUM_ROWS_COLS) {
      continue
    }
    for (let c = 0; c < NUM_ROWS_COLS; c += w) {
      w++
      if (c + w >= NUM_ROWS_COLS) {
        continue
      }
      rects.push({ x: c, y: r, w, h })
    }
  }

  const canvas = document.createElement('canvas')
  const IMG_SIZE = 2048
  const COL_SIZE = IMG_SIZE / NUM_ROWS_COLS
  const ROW_SIZE = IMG_SIZE / NUM_ROWS_COLS
  canvas.width = IMG_SIZE
  canvas.height = IMG_SIZE
  document.body.append(canvas)
  const ctx = canvas.getContext('2d')!
  const EDGE_center_SIZE = 6
  rects.forEach((rect, i) => {
    const frame = { x: rect.x * COL_SIZE, y: rect.y * ROW_SIZE, w: rect.w * COL_SIZE, h: rect.h * ROW_SIZE }
    const { x, y, w, h } = frame
    centerDemoAtlas.frames.push({ filename: `rect_${i.toString().padStart(4, '0')}`, frame })
    ctx.fillStyle = '#222'
    ctx.fillRect(x, y, w, h)

    ctx.fillStyle = '#999'
    ctx.fillRect(
      x + w * 0.5 - EDGE_center_SIZE * 0.5,
      y + h * 0.5 - EDGE_center_SIZE * 0.5,
      EDGE_center_SIZE,
      EDGE_center_SIZE,
    )

    ctx.fillRect(x, y, EDGE_center_SIZE, EDGE_center_SIZE)
    ctx.fillRect(x + w * 0.5 - EDGE_center_SIZE * 0.5, y, EDGE_center_SIZE, EDGE_center_SIZE)
    ctx.fillRect(x + w - EDGE_center_SIZE, y, EDGE_center_SIZE, EDGE_center_SIZE)

    ctx.fillRect(x, y + h * 0.5 - EDGE_center_SIZE * 0.5, EDGE_center_SIZE, EDGE_center_SIZE)
    ctx.fillRect(x + w - EDGE_center_SIZE, y + h * 0.5 - EDGE_center_SIZE * 0.5, EDGE_center_SIZE, EDGE_center_SIZE)

    ctx.fillRect(x, y + h - EDGE_center_SIZE, EDGE_center_SIZE, EDGE_center_SIZE)
    ctx.fillRect(x + w * 0.5 - EDGE_center_SIZE * 0.5, y + h - EDGE_center_SIZE, EDGE_center_SIZE, EDGE_center_SIZE)
    ctx.fillRect(x + w - EDGE_center_SIZE, y + h - EDGE_center_SIZE, EDGE_center_SIZE, EDGE_center_SIZE)
  })
  const imgData = canvas.toDataURL()
  canvas.parentElement?.removeChild(canvas)
  return imgData
})()
</script>

<template>
  <TresLeches style="position:absolute; left:10px; top:10px;" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera
      :position="[5, 1, 5]"
      :look-at="[-2, 0, 0]"
    />
    <OrbitControls />
    <TresGroup :position-x="2">
      <Suspense>
        <AnimatedSprite
          :image="centerDemoImgData"
          :atlas="centerDemoAtlas"
          animation="rect"
          :center="[centerX.value, centerY.value]"
          :fps="fps.value"
          :as-sprite="asSprite.value"
        >
          <TresGroup :scale="0.5">
            <Box
              :scale="[1, 0.06, 0.06]"
              color="red"
            />
            <Box
              :scale="[0.06, 1, 0.06]"
              color="blue"
            />
            <Box
              :scale="[0.06, 0.06, 1]"
              color="green"
            />
          </TresGroup>
        </AnimatedSprite>
      </Suspense>
      <TresGridHelper :args="[10, 10]" />
    </TresGroup>
  </TresCanvas>
</template>
