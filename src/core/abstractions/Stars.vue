<script setup lang="ts">
import { shallowRef, computed, toRefs, watchEffect, ref } from 'vue'
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
})

const position = ref()
const scale = ref()

const { radius, depth, count, size, sizeAttenuation, transparent, alphaMap, alphaTest } = toRefs(props)

const setStars = () => {
  let circle = radius.value + depth.value
  const increment = computed(() => depth.value / count.value)

  const positionArray: number[] = []
  const scaleArray: number[] = Array.from(
    { length: count.value },
    () => (0.5 + 0.5 * Math.random()) * 4,
  )

  const generateStars = (circle: number): Array<number> => {
    const starArray = new Vector3()
      .setFromSpherical(new Spherical(circle, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI))
      .toArray()
    return starArray
  }

  for (let i = 0; i < count.value; i++) {
    circle -= increment.value * Math.random()
    positionArray.push(...generateStars(circle))
  }
  position.value = new Float32Array(positionArray)
  scale.value = new Float32Array(scaleArray)
}

watchEffect(() => {
  setStars()
})

const starsRef = shallowRef()

defineExpose({
  value: starsRef,
})
</script>
<template>
  <TresPoints ref="starsRef">
    <TresBufferGeometry :position="[position, 3]" :a-scale="[scale, 1]" />
    <TresPointsMaterial
      :size="size"
      :size-attenuation="sizeAttenuation"
      :transparent="transparent"
      :alpha-test="alphaTest"
      :alpha-map="alphaMap"
    />
  </TresPoints>
</template>
