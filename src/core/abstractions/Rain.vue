<script setup lang="ts">
import { watch, shallowRef } from 'vue'
import { useRenderLoop, TresColor } from '@tresjs/core'

export interface RainProps {
  /**
   * The size of the drops.
   *
   * @type {number}
   * @memberof RainProps
   * @default 0.1
   */
  size?: number
  /**
   * The size of the rain area.
   *
   * @type {[number, number, number]}
   * @memberof RainProps
   * @default "[10, 10, 20]"
   */
  area?: [number, number, number]
  /**
   * The color of the shadows.
   *
   * @default '#000000'
   * @type {TresColor}
   * @memberof ContactShadowsProps
   *
   */
   color?: TresColor
  /**
   * texture of the stars.
   *
   * @type {string}
   * @memberof StarsProps
   * @default null
   */
   map?: null
  /**
   * texture of the alphamap stars.
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
   * number of drops.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
   speed?: 0.1
  /**
   * Add ramdomness to the drops.
   *
   * @default 0.5
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
   ramdomness?: number
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
   * show transparency on the stars texture.
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

const props = withDefaults(defineProps<RainProps>(), {
  size: 0.1,
  area: () => [10, 10, 20],
  color: 0xffffff,
  alphaMap: null,
  map: null,
  alphaTest: 0.01,
  opacity: 0.8,
  count: 5000,
  speed: 0.1,
  deepWrite: false,
  ramdomness: 0.5,
  transparent: true,
  sizeAttenuation: true,
})

const RainGeoRef = shallowRef()

const rainOptions = {
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
  velocityArray[i] = ((Math.random() - 0.5) / 5) * props.speed * props.ramdomness
  velocityArray[i + 1] = (Math.random() / 5) * props.speed + 0.01
}

watch(RainGeoRef, value => {
  console.log(value)
})
const { onLoop } = useRenderLoop()

onLoop(() => {
  if (RainGeoRef.value) {
    const positionArray = RainGeoRef.value.attributes.position.array
    for (let i = 0; i < RainGeoRef.value.attributes.position.count; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -(props.area[0]) || positionArray[i * 3] >= props.area[0])
        positionArray[i * 3] = positionArray[i * 3] * -1
      if (positionArray[i * 3 + 1] <= -(props.area[1]) || positionArray[i * 3 + 1] >= props.area[1])
        positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1
    }
    RainGeoRef.value.attributes.position.needsUpdate = true
  }
})
</script>

<template>
      <TresPoints>
        <TresPointsMaterial v-bind="rainOptions" />
        <TresBufferGeometry ref="RainGeoRef" :position="[position, 3]" :velocity="[velocityArray]"  />
      </TresPoints>
</template>
