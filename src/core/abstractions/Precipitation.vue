<script setup lang="ts">
import { watchEffect, shallowRef, toRefs } from 'vue'
import { useRenderLoop, TresColor } from '@tresjs/core'

export type PrecipitationProps = {
  /**
   * The size of the drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.1
   */
  size?: number
  /**
   * The size of the precipitation area.
   *
   * @type {[number, number, number]}
   * @memberof PrecipitationProps
   * @default "[10, 10, 20]"
   */
  area?: [number, number, number]
  /**
   * The color of the shadows.
   *
   * @default '0xffffff'
   * @type {TresColor}
   * @memberof PrecipitationProps
   *
   */
  color?: TresColor
  /**
   * Color texture of the drops.
   *
   * @type {string}
   * @memberof StarsProps
   * @default null
   */
  map?: null
  /**
   * texture of the alphaMap Drops.
   *
   * @type {string}
   * @memberof StarsProps
   * @default null
   */
  alphaMap?: string
  /**
   * enables the WebGL to know when not to render the pixel.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 0.01
   */
  alphaTest?: number
  /**
   * Set the opacity of the drops.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 0.8
   */
  opacity?: number
  /**
   * number of drops.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
  count?: number
  /**
   * Speed of drops.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
  speed?: number
  /**
   * Add randomness to the drops.
   *
   * @default 0.5
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  randomness?: number
  /**
   * Whether the shadows should write to the depth buffer or not.
   *
   * @default false
   * @type {boolean}
   * @memberof ContactShadowsProps
   *
   */
  depthWrite?: boolean
  /**
   * show transparency on the drops texture.
   *
   * @type {boolean}
   * @memberof StarsProps
   * @default true
   */
  transparent?: boolean
  /**
   * keep the same size regardless distance.
   *
   * @type {boolean}
   * @memberof StarsProps
   * @default true
   */
  sizeAttenuation?: boolean
}

const props = withDefaults(defineProps<PrecipitationProps>(), {
  size: 0.1,
  area: () => [10, 10, 20],
  color: 0xffffff,
  alphaTest: 0.01,
  opacity: 0.8,
  count: 5000,
  speed: 0.1,
  randomness: 0.5,
  depthWrite: false,
  transparent: true,
  sizeAttenuation: true,
})

const {
  size,
  area,
  color,
  alphaMap,
  map,
  opacity,
  alphaTest,
  depthWrite,
  transparent,
  sizeAttenuation,
  count,
  speed,
  randomness,
} = toRefs(props)

const geometryRef = shallowRef()
let positionArray: [] | Float32Array = []
let velocityArray: [] | Float32Array = []

const setPosition = () => {
  positionArray = new Float32Array(count.value * 3)
  for (let i = 0; i < count.value; i++) {
    const i3 = i * 3
    positionArray[i3] = (Math.random() - 0.5) * area.value[0]
    positionArray[i3 + 1] = (Math.random() - 0.5) * area.value[1]
    positionArray[i3 + 2] = (Math.random() - 0.5) * area.value[2]
  }
}
const setSpeed = () => {
  velocityArray = new Float32Array(count.value * 2)
  for (let i = 0; i < count.value * 2; i += 2) {
    velocityArray[i] = ((Math.random() - 0.5) / 5) * speed.value * randomness.value
    velocityArray[i + 1] = (Math.random() / 5) * speed.value + 0.01
  }
}
setSpeed()
setPosition()

watchEffect(() => {
  setSpeed()
  setPosition()
})

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (geometryRef.value?.attributes.position.array && geometryRef.value?.attributes.position.count) {
    const positionArray = geometryRef.value.attributes.position.array
    for (let i = 0; i < geometryRef.value.attributes.position.count; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -area.value[0] / 2 || positionArray[i * 3] >= area.value[0] / 2)
        positionArray[i * 3] = positionArray[i * 3] * -1
      if (positionArray[i * 3 + 1] <= -area.value[1] / 2 || positionArray[i * 3 + 1] >= area.value[1] / 2)
        positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1
    }
    geometryRef.value.attributes.position.needsUpdate = true
  }
})
</script>

<template>
  <TresPoints>
    <TresPointsMaterial
      :size="size"
      :color="color"
      :alpha-map="alphaMap"
      :map="map"
      :opacity="opacity"
      :alpha-test="alphaTest"
      :depth-write="depthWrite"
      :transparent="transparent"
      :size-attenuation="sizeAttenuation"
    />
    <TresBufferGeometry ref="geometryRef" :position="[positionArray, 3]" :velocity="[velocityArray]" />
  </TresPoints>
</template>
