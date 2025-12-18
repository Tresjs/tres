<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { computed, shallowRef, toRefs } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { Object3D } from 'three'
import { useTexture } from '../loaders/useTexture'

export interface SmokeProps {
  /**
   * The color of the smoke.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof SmokeProps
   */
  color?: TresColor
  /**
   * The strength of the opacity.
   * @default 0.5
   * @type {number}
   * @memberof SmokeProps
   */
  opacity?: number
  /**
   * The rotation speed of the smoke.
   * @default 0.4
   * @type {number}
   * @memberof SmokeProps
   */
  speed?: number
  /**
   * The base depth.
   * @default 10
   * @type {number}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
   */
  depth?: number
  /**
   * The number of smoke to render.
   * @default 10
   * @type {number}
   * @memberof SmokeProps
   */
  segments?: number
  /**
   * The texture of the smoke.
   * @default 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png'
   * @type {string}
   * @memberof SmokeProps
   */
  texture?: string
  /**
   * The depthTest.
   * @default true
   * @type {boolean}
   * @memberof SmokeProps
   */
  depthTest?: boolean
  /**
   * Spread on the Y axis.
   * @default 0.1
   * @type {number}
   * @memberof SmokeProps
   */
  spreadY?: number
  /**
   * Spread on the X axis.
   * @default 0.5
   * @type {number}
   * @memberof SmokeProps
   */
  spreadX?: number
  /**
   * Scale.
   * @default 1
   * @type {number}
   * @memberof SmokeProps
   */
  scale?: number
}

const props = withDefaults(defineProps<SmokeProps>(), {
  opacity: 0.5,
  speed: 0.4,
  depth: 0.3,
  segments: 10,
  texture:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png',
  color: '#f7f7f7',
  depthTest: false,
  spreadY: 0.1,
  spreadX: 0.5,
  scale: 1,
})

const { depth, segments, texture, color, depthTest, opacity, speed, spreadY, spreadX, scale } = toRefs(
  props,
)

const smokeRef = shallowRef()
const groupRef = shallowRef()

defineExpose({
  instance: smokeRef,
})

const smoke = computed(() =>
  Array.from({ length: segments.value }, (_, index) => ({
    x: (Math.random() - 0.5) * spreadX.value,
    y: (Math.random() - 0.5) * spreadY.value,
    scale: Math.sin((index + 1) / segments.value) * scale.value,
  })),
)

const { state: map } = useTexture(texture.value)

const { renderer, camera } = useTresContext()
const colorSpace = computed(() => renderer.instance?.outputColorSpace)

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (smokeRef.value && camera.activeCamera.value && groupRef.value) {
    groupRef.value?.children.forEach((child: Object3D) => {
      child.rotation.z += Math.max(0.002, 0.005 * Math.random()) * speed.value
    })
    smokeRef.value.lookAt(camera.activeCamera.value?.position)
    // TODO: comment this until invalidate is back in the loop callback on v5
    // invalidate()
  }
})
</script>

<template>
  <TresGroup ref="smokeRef">
    <TresGroup ref="groupRef" :position="[0, 0, (segments / 2) * depth]">
      <TresMesh
        v-for="({ x, y, scale: smokeScale }, index) in smoke"
        :key="`${index}`"
        :position="[x, y, -index * depth]"
        :scale="smokeScale"
      >
        <TresPlaneGeometry
          :width="scale"
          :height="scale"
          :rotation="[0, 0, 0]"
        />
        <TresMeshStandardMaterial
          :map="map"
          :depth-test="depthTest"
          :color-space="colorSpace"
          :color="color"
          :depth-write="false"
          transparent
          :opacity="opacity"
        />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
