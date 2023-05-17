<script setup lang="ts">
import { watch, shallowRef } from 'vue'
import { useRenderLoop, TresColor } from '@tresjs/core'

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

const props = withDefaults(defineProps<PrecipitationProps>(), {
  size: 0.1,
  area: () => [10, 10, 20],
  color: 0xffffff,
  map: null,
  alphaMap: null,
  alphaTest: 0.01,
  opacity: 0.8,
  count: 5000,
  speed: 0.1,
  randomness: 0.5,
  deepWrite: false,
  transparent: true,
  sizeAttenuation: true,
})

const PrecipitationGeoRef = shallowRef()

const precipitationOptions = {
  size: props.size,
  color: props.color,
  alphaMap: props.alphaMap,
  opacity: props.opacity,
  alphaTest: props.alphaTest,
  vertexColors: false,
  deepWrite: props.deepWrite,
  transparent: props.transparent,
  sizeAttenuation: props.sizeAttenuation
}

const position = new Float32Array(props.count * 3)

for (let i = 0; i < props.count; i++) {
  const i3 = i * 3
  position[i3] = (Math.random() - 0.5) * props.area[0]
  position[i3 + 1] = (Math.random() - 0.5) * props.area[1]
  position[i3 + 2] = (Math.random() - 0.5) * props.area[2]
}

const velocityArray = new Float32Array(props.count * 2)
for (let i = 0; i < props.count * 2; i += 2) {
  velocityArray[i] = ((Math.random() - 0.5) / 5) * props.speed * props.randomness
  velocityArray[i + 1] = (Math.random() / 5) * props.speed + 0.01
}

watch(PrecipitationGeoRef, value => {
  console.log(value)
})
const { onLoop } = useRenderLoop()

onLoop(() => {
  if (PrecipitationGeoRef.value) {
    const positionArray = PrecipitationGeoRef.value.attributes.position.array
    for (let i = 0; i < PrecipitationGeoRef.value.attributes.position.count; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -(props.area[0]) / 2 || positionArray[i * 3] >= props.area[0] / 2)
        positionArray[i * 3] = positionArray[i * 3] * -1
      if (positionArray[i * 3 + 1] <= -(props.area[1]) / 2 || positionArray[i * 3 + 1] >= props.area[1] / 2)
        positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1
    }
    PrecipitationGeoRef.value.attributes.position.needsUpdate = true
  }
})
</script>

<template>
      <TresPoints>
        <TresPointsMaterial v-bind="precipitationOptions" />
        <TresBufferGeometry ref="PrecipitationGeoRef" :position="[position, 3]" :velocity="[velocityArray]"  />
      </TresPoints>
</template>
