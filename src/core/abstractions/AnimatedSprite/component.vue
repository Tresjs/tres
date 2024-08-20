<script setup lang="ts">
import { onUnmounted, ref, shallowRef, watch } from 'vue'
import type { TresVector2 } from '@tresjs/core'
import { normalizeVectorFlexibleParam, useLoop, useTresContext } from '@tresjs/core'
import type { Texture } from 'three'
import { DoubleSide } from 'three'
import type { Atlas, Atlasish } from './Atlas'
import { getAtlasFrames, getNullAtlasFrame, getTextureAndAtlasAsync, setAtlasDefinitions } from './Atlas'

export interface AnimatedSpriteProps {
  /** URL of the image texture or an image dataURL. This prop is not reactive. */
  image: string
  /**
   * If `string`, the URL of the JSON atlas.
   * If `number`, the number of columns in the texture.
   * If `[number, number]`, the number of columns/rows in the texture.
   * If `AtlasData`, the atlas as a JS object.
   * This prop is not reactive.
   */
  atlas: string | Atlasish
  /**
  * Specify playback frame order and repeated frames (delays). `definitions` is a record where keys are atlas animation names and values are strings containing an animation definition.
  * A "animation definition" comma-separated string of frame numbers with optional parentheses-surrounded durations.
  * Here is how various definition strings convert to arrays of frames for playback:
  * "0,2,1" - [0,2,1], i.e., play frame 0, 2, then 1.
  * "2(10)" - [2,2,2,2,2,2,2,2,2,2], i.e., play from 2 10 times.
  * "1-4" - [1,2,3,4]
  * "10-5(2)" - [10,10,9,9,8,8,7,7,6,6,5,5]
  * "1-4(3),10(2)" - [1,1,1,2,2,2,3,3,3,4,4,4,10,10]
   */
  definitions?: Record<string, string>
  /** Desired frames per second of the animation. */
  fps?: number
  /** Whether or not the animation should loop. */
  loop?: boolean
  /** If `string`, name of the animation to play. If `[number, number]`, start and end frames of the animation. If `number`, frame number to display. */
  animation?: string | [number, number] | number
  /** Whether the animation is paused. */
  paused?: boolean
  /** Whether to play the animation in reverse. */
  reversed?: boolean
  /** Whether the sprite should be flipped, left to right. */
  flipX?: boolean
  /** For a non-looping animation, when the animation ends, whether to display the zeroth frame. */
  resetOnEnd?: boolean
  /** Whether to display the object as a THREE.Sprite. [See THREE.Sprite](https://threejs.org/docs/?q=sprite#api/en/objects/Sprite) */
  asSprite?: boolean
  /** Anchor point of the object. A value of [0.5, 0.5] corresponds to the center. [0, 0] is left, bottom. */
  center?: TresVector2
  /** Alpha test value for the material. [See THREE.Material.alphaTest](https://threejs.org/docs/#api/en/materials/Material.alphaTest) */
  alphaTest?: number
  /** Depth test value for the material. [See THREE.Material.depthTest](https://threejs.org/docs/#api/en/materials/Material.depthTest) */
  depthTest?: boolean
  /** Depth write value for the material. [See THREE.Material.depthWrite](https://threejs.org/docs/#api/en/materials/Material.depthWrite) */
  depthWrite?: boolean
}

const props = withDefaults(defineProps<AnimatedSpriteProps>(), {
  fps: 30,
  loop: true,
  animation: 0,
  paused: false,
  reversed: false,
  flipX: false,
  resetOnEnd: false,
  asSprite: true,
  center: () => [0.5, 0.5],
  alphaTest: 0.0,
  depthTest: true,
  depthWrite: true,
})

const emit = defineEmits<{
  (e: 'frame', frameName: string): void
  (e: 'end', frameName: string): void
  (e: 'loop', frameName: string): void
}>()

const { invalidate } = useTresContext()

watch(props, () => {
  invalidate()
})

const positionX = ref(0)
const positionY = ref(0)
const scaleX = ref(0)
const scaleY = ref(0)

const groupRef = shallowRef()
defineExpose({ instance: groupRef })

const [texture, atlas]: [Texture, Atlas] = await getTextureAndAtlasAsync(props.image, props.atlas) as [Texture, Atlas]
texture.matrixAutoUpdate = false

let animation = getAtlasFrames(atlas, props.animation, props.reversed)
let centerX = 0.5
let centerY = 0.5
let cooldown = 1
let frame = getNullAtlasFrame()
let frameNameToEmit: string | null = null
let frameNum = 0
let frameHeldOnLoopEnd = false
let dirtyFlag = true
const TEXTURE_PX_TO_WORLD_UNITS = 0.01

useLoop().onBeforeRender(({ delta }) => {
  if (!props.paused && !frameHeldOnLoopEnd) {
    cooldown -= delta * props.fps
  }

  while (cooldown <= 0) {
    cooldown++
    frameNum++

    if (props.loop) {
      if (frameNum >= animation.length) { emit('loop', animation[animation.length - 1].name) }
      frameNum %= animation.length
    }
    else {
      if (frameNum >= animation.length) {
        frameHeldOnLoopEnd = true
        frameNum = props.resetOnEnd ? 0 : animation.length - 1
        emit('end', animation[animation.length - 1].name)
      }
    }
  }

  if (animation[frameNum] !== frame) {
    frame = animation[frameNum]
    frameNameToEmit = frame.name
    render()
  }

  if (dirtyFlag) {
    dirtyFlag = false

    texture.offset.x = frame.offsetX + (props.flipX ? frame.repeatX : 0)
    texture.offset.y = frame.offsetY
    texture.repeat.x = frame.repeatX * (props.flipX ? -1 : 1)
    texture.repeat.y = frame.repeatY
    texture.updateMatrix()

    scaleX.value = frame.width * TEXTURE_PX_TO_WORLD_UNITS
    scaleY.value = frame.height * TEXTURE_PX_TO_WORLD_UNITS

    positionX.value = (0.5 - centerX) * frame.width * TEXTURE_PX_TO_WORLD_UNITS
    positionY.value = (0.5 - centerY) * frame.height * TEXTURE_PX_TO_WORLD_UNITS
  }

  if (frameNameToEmit) {
    emit('frame', frameNameToEmit)
    frameNameToEmit = null
  }
})

function render() {
  dirtyFlag = true
}

watch(() => props.animation, (newValue, oldValue) => {
  if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
    return
  }
  animation = getAtlasFrames(atlas, props.animation, props.reversed)
  frameNum = 0
  cooldown = 1
  frameHeldOnLoopEnd = false
  render()
}, { immediate: true })

watch(() => props.reversed, () => {
  frameNum = (animation.length - frameNum - 1) % animation.length
  animation = getAtlasFrames(atlas, props.animation, props.reversed)
  if (frameHeldOnLoopEnd) {
    frameNum = props.resetOnEnd ? 0 : animation.length - 1
  }
  render()
})

watch(() => props.paused, () => {
  frameHeldOnLoopEnd = false
})

watch(() => props.loop, () => {
  if (frameHeldOnLoopEnd && props.loop) { frameHeldOnLoopEnd = false }
})

watch(() => props.resetOnEnd, () => {
  if (frameHeldOnLoopEnd) {
    frameNum = props.resetOnEnd ? 0 : animation.length - 1
    render()
  }
})

watch(() => props.flipX, render)

watch(() => [props.center], () => {
  [centerX, centerY] = normalizeVectorFlexibleParam(props.center as number[])
  render()
}, { immediate: true })

watch(() => [props.definitions], () => {
  setAtlasDefinitions(atlas, props.definitions)
  // NOTE: Must reset animation, as running animation might have changed.
  animation = getAtlasFrames(atlas, props.animation, props.reversed)
  cooldown = 1
  frameNum = 0
  render()
}, { immediate: true })

onUnmounted(() => {
  texture.dispose()
})
</script>

<template>
  <TresGroup
    ref="groupRef"
  >
    <template v-if="props.asSprite">
      <TresSprite
        :scale="[scaleX, scaleY, 1]"
        :position="[positionX, positionY, 0]"
      >
        <TresSpriteMaterial
          :toneMapped="false"
          :map="texture"
          :transparent="true"
          :alphaTest="props.alphaTest"
        />
      </TresSprite>
    </template>
    <template v-else>
      <TresMesh
        :scale="[scaleX, scaleY, 1]"
        :position="[positionX, positionY, 0]"
      >
        <TresPlaneGeometry :args="[1, 1]" />
        <TresMeshBasicMaterial
          :toneMapped="false"
          :side="DoubleSide"
          :map="texture"
          :transparent="true"
          :alphaTest="props.alphaTest"
          :depthWrite="props.depthWrite"
          :depthTest="props.depthTest"
        />
      </TresMesh>
    </template>
    <slot></slot>
  </TresGroup>
</template>
