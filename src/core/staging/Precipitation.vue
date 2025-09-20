<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { useTexture } from '../loaders/useTexture'
import { shallowRef, toRefs, watchEffect } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { Texture } from 'three'

export interface PrecipitationProps {
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
   * @type {Texture}
   * @memberof PrecipitationProps
   * @default null
   */
  map?: string | Texture | null
  /**
   * texture of the alphaMap Drops.
   *
   * @type {Texture}
   * @memberof PrecipitationProps
   * @default null
   */
  alphaMap?: string | Texture | null
  /**
   * enables the WebGL to know when not to render the pixel.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.01
   */
  alphaTest?: number
  /**
   * Set the opacity of the drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.8
   */
  opacity?: number
  /**
   * number of drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 5000
   */
  count?: number
  /**
   * Speed of drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 5000
   */
  speed?: number
  /**
   * Add randomness to the drops.
   *
   * @default 0.5
   * @type {number}
   * @memberof PrecipitationProps
   *
   */
  randomness?: number
  /**
   * Whether the shadows should write to the depth buffer or not.
   *
   * @default false
   * @type {boolean}
   * @memberof PrecipitationProps
   *
   */
  depthWrite?: boolean
  /**
   * show transparency on the drops texture.
   *
   * @type {boolean}
   * @memberof PrecipitationProps
   * @default true
   */
  transparent?: boolean
  /**
   * keep the same size regardless distance.
   *
   * @type {boolean}
   * @memberof PrecipitationProps
   * @default true
   */
  sizeAttenuation?: boolean
}

const props = withDefaults(defineProps<PrecipitationProps>(), {
  size: 0.1,
  area: () => [10, 10, 20],
  color: 0xFFFFFF,
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
  alphaMap: alphaMapUrl,
  map: mapUrl,
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
    velocityArray[i + 1] = (Math.random() / 5) * speed.value
  }
}
setSpeed()
setPosition()

watch((speed), () => {
  setSpeed()
})

watchEffect(() => {
  if (speed.value) { return }
  setPosition()
})

// Load textures if URLs are provided
const alphaMapTexture = shallowRef<Texture | null>(null)
const mapTexture = shallowRef<Texture | null>(null)

watchEffect(async () => {
  if (typeof alphaMapUrl.value === 'string') {
    const { state: alphaMap } = useTexture(alphaMapUrl.value)
    alphaMapTexture.value = alphaMap.value
  }
  else {
    alphaMapTexture.value = alphaMapUrl.value ?? null
  }

  if (typeof mapUrl.value === 'string') {
    const { state: map } = useTexture(mapUrl.value)
    mapTexture.value = map.value
  }
  else {
    mapTexture.value = mapUrl.value ?? null
  }
})

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (geometryRef.value?.attributes.position.array && geometryRef.value?.attributes.position.count) {
    const positionArray = geometryRef.value.attributes.position.array
    for (let i = 0; i < geometryRef.value.attributes.position.count; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -area.value[0] / 2 || positionArray[i * 3] >= area.value[0] / 2) { positionArray[i * 3] = positionArray[i * 3] * -1 }
      if (positionArray[i * 3 + 1] <= -area.value[1] / 2 || positionArray[i * 3 + 1] >= area.value[1] / 2) { positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1 }
    }
    geometryRef.value.attributes.position.needsUpdate = true

    // TODO: comment this until invalidate is back in the loop callback on v5
    // invalidate()
  }
})

const pointsRef = shallowRef()
defineExpose({ instance: pointsRef })
</script>

<template>
  <TresPoints ref="pointsRef">
    <TresPointsMaterial
      :size="size"
      :color="color"
      :alpha-map="alphaMapTexture"
      :map="mapTexture"
      :opacity="opacity"
      :alpha-test="alphaTest"
      :depth-write="depthWrite"
      :transparent="transparent"
      :size-attenuation="sizeAttenuation"
    />
    <TresBufferGeometry
      ref="geometryRef"
      :position="[positionArray, 3]"
      :velocity="[velocityArray]"
    />
  </TresPoints>
</template>
