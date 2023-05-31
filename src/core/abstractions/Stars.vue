<script setup lang="ts">
import { shallowRef, computed } from 'vue'
import { Vector3, Spherical } from 'three'

export interface StarsProps {
  /**
   * The size of the stars.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 0.1
   */
  size?: number
  /**
   * keep the same size regardless distance.
   *
   * @type {boolean}
   * @memberof StarsProps
   * @default true
   */
   sizeAttenuation?: boolean
  /**
   * show transparency on the stars texture.
   *
   * @type {boolean}
   * @memberof StarsProps
   * @default true
   */
   transparent?: boolean
  /**
   * enables the WebGL to know when not to render the pixel.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 0.01
   */
   alphaTest?: number
  /**
   * number of stars.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
   count?: number
  /**
   * depth of star's shape.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 50
   */
   depth?: number
  /**
   * Radius of star's shape.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 100
   */
   radius?: number
  /**
   * factor of randomness scale star.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 4
   */
   factor?: number
  /**
   * texture of the stars.
   *
   * @type {string}
   * @memberof StarsProps
   * @default null
   */
   alphaMap?: null
}

const props = withDefaults(defineProps<StarsProps>(), {
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  alphaTest: 0.01,
  alphaMap: null,
  count: 5000,
  depth: 50,
  radius: 100,
  factor: 4,
})

let circle = props.radius + props.depth
const increment = props.depth / props.count

const positionArray: number[] = []
const scaleArray: number[] = Array.from({ length: props.count }, () => (0.5 + 0.5 * Math.random()) * props.factor)


const genStar = (circle: number) => {
  return new Vector3()
  .setFromSpherical(new Spherical(circle, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI))
}

for (let i = 0; i < props.count; i++) {
  circle -= increment * Math.random()
  positionArray.push(...genStar(circle).toArray())
}
const position = new Float32Array(positionArray)
const scale = new Float32Array(scaleArray)

const starsOptions = computed(() => {
  return {
  size: props.size,
  sizeAttenuation: props.sizeAttenuation,
  transparent: props.transparent,
  alphaTest: props.alphaTest,
  alphaMap: props.alphaMap,
  }
})

const starsRef = shallowRef()

defineExpose({
  value: starsRef,
})
</script>
<template>
  <TresPoints ref="starsRef">
    <TresBufferGeometry :position="[position, 3]" :a-scale="[scale, 1]" />
      <TresPointsMaterial v-bind="starsOptions" />
  </TresPoints>
</template>
