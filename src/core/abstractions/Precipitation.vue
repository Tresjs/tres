<script setup lang="ts">
import { watchEffect, shallowRef } from 'vue'
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
  alphaMap?: null
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
  opacity?: 0.8
  /**
   * number of drops.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
  count?: 5000
  /**
   * Speed of drops.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
  speed?: 0.1
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

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const {
  size = 0.1,
  area = [10, 10, 20],
  color = 0xffffff,
  map = null,
  alphaMap = null,
  alphaTest = 0.01,
  opacity = 0.8,
  count = 5000,
  speed = 0.1,
  randomness = 0.5,
  depthWrite = false,
  transparent = true,
  sizeAttenuation = true,
} = defineProps<PrecipitationProps>()

const precipitationGeoRef = shallowRef()

let position: [] | Float32Array = []
let velocityArray: [] | Float32Array = []
const setPosition = () => {
  position = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    position[i3] = (Math.random() - 0.5) * area[0]
    position[i3 + 1] = (Math.random() - 0.5) * area[1]
    position[i3 + 2] = (Math.random() - 0.5) * area[2]
  }
}
const setSpeed = () => {
  velocityArray = new Float32Array(count * 2)
  for (let i = 0; i < count * 2; i += 2) {
    velocityArray[i] = ((Math.random() - 0.5) / 5) * speed * randomness
    velocityArray[i + 1] = (Math.random() / 5) * speed + 0.01
  }
}
setSpeed()
setPosition()

watchEffect(() => {
  setSpeed()
  setPosition()
  if (precipitationGeoRef.value?.attributes.position) {
    precipitationGeoRef.value.attributes.position = position
  }
})

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (precipitationGeoRef.value) {
    const positionArray = precipitationGeoRef.value.attributes.position.array
    for (let i = 0; i < precipitationGeoRef.value.attributes.position.count; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -area[0] / 2 || positionArray[i * 3] >= area[0] / 2)
        positionArray[i * 3] = positionArray[i * 3] * -1
      if (positionArray[i * 3 + 1] <= -area[1] / 2 || positionArray[i * 3 + 1] >= area[1] / 2)
        positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1
    }
    precipitationGeoRef.value.attributes.position.needsUpdate = true
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
    <TresBufferGeometry ref="precipitationGeoRef" :position="[position, 3]" :velocity="[velocityArray]" />
  </TresPoints>
</template>
