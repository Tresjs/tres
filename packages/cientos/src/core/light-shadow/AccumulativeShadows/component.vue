<script setup lang="ts">
import { computed, shallowRef, watch, watchEffect } from 'vue'
import type { ColorRepresentation, Mesh, PlaneGeometry, ShaderMaterial, Texture, WebGLRenderer } from 'three'
import { Group } from 'three'
import { extend, useLoop, useTres } from '@tresjs/core'
import RandomizedLights from '../RandomizedLights/component.vue'
import { ProgressiveLightMap } from './ProgressiveLightMap'
import { SoftShadowMaterial } from './SoftShadowMaterial'

export interface AccumulativeShadowsProps {
  /** Whether shadow creation only happens once (resets after props change), false */
  once?: boolean
  /** Whether shadows accumulate progressively over several frames, true */
  accumulate?: boolean
  /**
   * Number of frames to render. More yields cleaner results but takes more time.
   * If `accumulate && once`, 1 frame will be consumed every update for `frames` updates.
   * Otherwise, `frames` frames are consumed for every update.
   * 40
   */
  frames?: number
  /** If `accumulate`, controls the refresh ratio, 100 */
  blend?: number
  /** If less than `Infinity`, limits the amount of frames rendered. Use this to increase performance once a movable scene has settled, Infinity */
  limit?: number
  /** Scale of the plane, 10 */
  scale?: number
  /** Opacity of the plane, 1 */
  opacity?: number
  /** Discards alpha pixels, 0.65 */
  alphaTest?: number
  /** Shadow color, black */
  color?: ColorRepresentation
  /** Colorblend, amount of `color` in shadow, 0 is black, 2 */
  colorBlend?: number
  /** Buffer resolution, 1024 */
  resolution?: number
  /** Texture tonemapping, true */
  toneMapped?: boolean
}

interface SoftShadowMaterialProps {
  map: Texture
  color?: ColorRepresentation
  alphaTest?: number
  blend?: number
}

const props = withDefaults(defineProps<AccumulativeShadowsProps>(), {
  once: true,
  accumulate: true,
  frames: 40,
  limit: Infinity,
  blend: 20,
  scale: 10,
  opacity: 1,
  alphaTest: 0.65,
  color: 'black',
  colorBlend: 2,
  resolution: 1024,
  toneMapped: true,
})

extend({ SoftShadowMaterial })

const { renderer, scene, camera, invalidate } = useTres()
const gOuter = shallowRef<Group>()
const gPlane = shallowRef<Mesh<PlaneGeometry, SoftShadowMaterialProps & ShaderMaterial>>(null!)
const gLights = shallowRef<Group>(new Group())
const progressiveLightMap = computed(() => new ProgressiveLightMap(renderer as WebGLRenderer, scene.value, props.resolution))
const shadowMapTexture = shallowRef<Texture>()

let frameCount = 0
let frameLimitRemaining = props.limit

function reset() {
  // NOTE: Clear buffers, reset opacities, set frame count to 0
  progressiveLightMap.value.clear()
  if (gPlane.value) {
    const material = gPlane.value.material
    material.opacity = 0
    material.alphaTest = 0
  }
  frameCount = 0
  frameLimitRemaining = props.limit
}

function update(frames = 1) {
  if (gPlane.value) {
    const material = gPlane.value.material
    if (props.accumulate) {
      // NOTE: Adapt the opacity-blend ratio to the number of frames
      material.opacity = Math.min(props.opacity, material.opacity + props.opacity / Math.max(2, props.blend))
      material.alphaTest = Math.min(props.alphaTest, material.alphaTest + props.alphaTest / Math.max(2, props.blend))
    }
    else {
      material.opacity = props.opacity
      material.alphaTest = props.alphaTest
    }
  }

  // NOTE: Switch accumulative lights on
  gLights.value.visible = true
  // NOTE: Collect scene lights and meshes
  progressiveLightMap.value.prepare()

  // NOTE: Update the lightmap and the accumulative lights
  for (let i = 0; i < frames; i++) {
    gLights.value?.children.forEach((light) => {
      if ('update' in light && typeof light.update === 'function') {
        light.update()
      }
    })
    if (camera.value) {
      const blend = Math.max(2, props.accumulate ? props.blend : props.frames)
      progressiveLightMap.value.update(camera.value, blend)
    }
  }

  // NOTE: Switch accumulative lights off
  gLights.value.visible = false

  // NOTE: Restore lights and meshes
  progressiveLightMap.value.finish()

  shadowMapTexture.value = progressiveLightMap.value.progressiveLightMap2.texture
}

watchEffect(() => {
  if (gPlane.value) { progressiveLightMap.value.configure(gPlane.value, gLights.value) }
})

watch(() => [props.frames, props.once, props.accumulate, props.scale, props.limit], reset)
watchEffect(reset)

useLoop().onBeforeRender(() => {
  if (!props.once) { frameCount = 0 }

  frameLimitRemaining--
  if (frameLimitRemaining < 0) { return }

  if (props.accumulate && props.once) {
    if (frameCount < props.frames || frameCount < props.blend) {
      invalidate()
      update()
      frameCount++
    }
  }
  else {
    invalidate()
    if (frameCount < props.frames) {
      update(props.frames - frameCount)
      frameCount = props.frames
    }
  }
})

watchEffect(() => gLights.value.traverse = () => null)

defineExpose({ instance: gOuter, update: () => { reset(); update() } })
</script>

<template>
  <TresGroup ref="gOuter">
    <TresGroup ref="gLights">
      <slot>
        <RandomizedLights
          :ambient="0.25"
          :bias="0.001"
          :count="8"
          :intensity="Math.PI"
          :map-size="1024"
          :position="[5, 5, -10]"
          :radius="2"
        />
      </slot>
    </TresGroup>

    <TresMesh ref="gPlane" :receive-shadow="true" :scale="scale" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry />
      <TresSoftShadowMaterial
        :alpha-test="alphaTest"
        :blend="colorBlend"
        :color="color"
        :depth-write="false"
        :map="shadowMapTexture"
        :opacity="opacity"
        :tone-mapped="toneMapped"
        :transparent="true"
      />
    </TresMesh>
  </TresGroup>
</template>
