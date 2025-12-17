<script setup lang="ts">
import { AnimatedSprite, Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'
import { ref, watch } from 'vue'

const ASSETS_URL = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/'
  + '462ad0f669f78d2c5ed7007b5134b419f646efad/textures/animated-sprite/'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { fps, animation, definitions, flipX, loop, paused, reversed, resetOnEnd, asSprite, centerX, centerY, scale, rotationX, rotationY, rotationZ, position } = useControls({
  fps: { value: 10, min: 0, max: 120, step: 1 },
  animation: { label: 'Animation', value: 'idle', options: ['idle', 'walk', 'blink'] },
  definitions: { label: 'Definitions', value: '{}', options: ['{}', '{"idle":"0(10),1-5"}'] },
  flipX: false,
  loop: true,
  paused: false,
  reversed: false,
  resetOnEnd: false,
  asSprite: false,
  centerX: { value: 0.5, min: 0, max: 1, step: 0.01 },
  centerY: { value: 0.5, min: 0, max: 1, step: 0.01 },
  scale: { value: 1, min: 0.1, max: 4, step: 0.01 },
  rotationX: { value: 0, step: 1, min: -360, max: 360 },
  rotationY: { value: 0, step: 1, min: -360, max: 360 },
  rotationZ: { value: 0, step: 1, min: -360, max: 360 },
  position: { value: [0, 0, 0] },
})

const lastFrame = ref('-')
const lastEnd = ref('-')
const lastLoop = ref('-')
const defsParsed = ref(JSON.parse(definitions.value))

watch(() => definitions.value, () => {
  defsParsed.value = JSON.parse(definitions.value)
})

const centerDemoAtlas = { frames: [] }
const centerDemoImgData = (() => {
  const NUM_ROWS_COLS = 32
  const rects: { x: number, y: number, w: number, h: number }[] = []
  let h = 1
  for (let r = 0; r < NUM_ROWS_COLS; r += h) {
    let w = 1
    for (let c = 0; c < NUM_ROWS_COLS; c += w) {
      if (Math.random() > 0.6) {
        w++
      }
      if (c + w >= NUM_ROWS_COLS) {
        w = NUM_ROWS_COLS - c
      }
      if (Math.random() > 0.9) {
        h++
      }
      if (r + h >= NUM_ROWS_COLS) {
        h = NUM_ROWS_COLS - r
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
  const CENTER_center_SIZE = COL_SIZE
  rects.forEach((rect, i) => {
    const frame = { x: rect.x * COL_SIZE, y: rect.y * ROW_SIZE, w: rect.w * COL_SIZE, h: rect.h * ROW_SIZE }
    const { x, y, w, h } = frame
    centerDemoAtlas.frames.push({ filename: `rect_${i.toString().padStart(4, '0')}`, frame })
    ctx.fillStyle = `hsl(${360 * i / rects.length}, 100%, 50%)`
    ctx.fillRect(x, y, w, h)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(
      x + w * 0.5 - CENTER_center_SIZE * 0.5,
      y + h * 0.5 - CENTER_center_SIZE * 0.5,
      CENTER_center_SIZE,
      CENTER_center_SIZE,
    )

    ctx.fillStyle = '#FFF'
    ctx.textAlign = 'center'
    ctx.font = '12px monospace'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Frame ${i}`, x + w * 0.5, y + h * 0.5)

    ctx.fillStyle = '#FFF'
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
  <TresLeches />
  <div style="position:absolute; top:0; z-index:1; font: 10px sans-serif; padding:10px;">
    <p>@frame: {{ lastFrame }}</p>
    <p>@end: {{ lastEnd }}</p>
    <p>@loop: {{ lastLoop }}</p>
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <TresGroup :position="[0, 0, -4]">
      <Suspense>
        <AnimatedSprite
          :image="centerDemoImgData"
          :atlas="centerDemoAtlas"
          animation="rect"
          :flip-x="flipX"
          :fps="fps"
          :loop="loop"
          :reset-on-end="resetOnEnd"
          :as-sprite="asSprite"
          :center="[centerX, centerY]"
          :reversed="reversed"
          :scale="scale"
          :paused="paused"
          :position="[position[0], position[1], position[2]]"
          :rotation="[degToRad(rotationX), degToRad(rotationY), degToRad(rotationZ)]"
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
    </TresGroup>
    <TresGroup :position="[4, 0, 0]">
      <Suspense>
        <AnimatedSprite
          :image="`${ASSETS_URL}namedAnimationsTexture.png`"
          :atlas="`${ASSETS_URL}namedAnimationsAtlas.json`"
          animation="yes"
          :flip-x="flipX"
          :fps="fps"
          :loop="loop"
          :reset-on-end="resetOnEnd"
          :as-sprite="asSprite"
          :center="[centerX, centerY]"
          :reversed="reversed"
          :scale="scale"
          :paused="paused"
          :position="[position[0], position[1], position[2]]"
          :rotation="[degToRad(rotationX), degToRad(rotationY), degToRad(rotationZ)]"
        />
      </Suspense>
    </TresGroup>
    <TresGroup :position="[-4, 0, 0]">
      <Suspense>
        <AnimatedSprite
          :image="`${ASSETS_URL}textureWithoutAtlas.png`"
          :atlas="16"
          :animation="[0, 15]"
          :flip-x="flipX"
          :fps="fps"
          :loop="loop"
          :reset-on-end="resetOnEnd"
          :as-sprite="asSprite"
          :center="[centerX, centerY]"
          :reversed="reversed"
          :scale="scale"
          :paused="paused"
          :position="[position[0], position[1], position[2]]"
          :rotation="[degToRad(rotationX), degToRad(rotationY), degToRad(rotationZ)]"
        />
      </Suspense>
    </TresGroup>
    <TresGroup :position="[0, 0, 0]">
      <Suspense>
        <AnimatedSprite
          :image="`${ASSETS_URL}cientosTexture.png`"
          :atlas="`${ASSETS_URL}cientosAtlas.json`"
          :definitions="defsParsed"
          :flip-x="flipX"
          :as-sprite="asSprite"
          :center="[centerX, centerY]"
          :animation="animation"
          :fps="fps"
          :loop="loop"
          :reversed="reversed"
          :reset-on-end="resetOnEnd"
          :scale="scale"
          :paused="paused"
          :position="[position[0], position[1], position[2]]"
          :rotation="[degToRad(rotationX), degToRad(rotationY), degToRad(rotationZ)]"
          :depth-write="false"
          :depth-test="false"
          @end="(frameName) => lastEnd = frameName"
          @frame="(frameName) => lastFrame = frameName"
          @loop="(frameName) => lastLoop = frameName"
        />
      </Suspense>
    </TresGroup>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
