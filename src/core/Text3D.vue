<script setup lang="ts">
import { TextGeometry, FontLoader } from 'three-stdlib'

import { computed, useSlots, shallowRef } from 'vue'
import { useCientos } from './useCientos'

export type Glyph = {
  _cachedOutline: string[]
  ha: number
  o: string
}

export type FontData = {
  boundingBox: {
    yMax: number
    yMin: number
  }
  familyName: string
  glyphs: {
    [k: string]: Glyph
  }
  resolution: number
  underlineThickness: number
}

export interface Text3DProps {
  /**
   *
   *  The JSON font to use for the text.
   *  Text3D requires fonts in JSON format generated through [typeface.json](http://gero3.github.io/facetype.js)
   *
   * @type {(FontData | string)}
   * @memberof Text3DProps
   * @see https://threejs.org/docs/index.html?q=TEXT#examples/en/geometries/TextGeometry
   */
  font: FontData | string
  /**
   * The text to display.
   *
   * @type {string}
   * @memberof Text3DProps
   */
  text?: string
  /**
   * The size of the text.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 0.5
   */
  size?: number
  /**
   * The height of the text.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 0.2
   */
  height?: number
  /**
   * The curve segments of the text.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 5
   */
  curveSegments?: number
  /**
   * Turn on bevel
   *
   * @type {boolean}
   * @memberof Text3DProps
   * @default true
   */
  bevelEnabled?: boolean
  /**
   * How deep into text bevel goes.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 0.05
   */
  bevelThickness?: number
  /**
   * How far from text outline is bevel.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 0.02
   */
  bevelSize?: number
  /**
   * How far from text outline is bevel.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 0
   */
  bevelOffset?: number
  /**
   * How many bevel segments.
   *
   * @type {number}
   * @memberof Text3DProps
   * @default 4
   */
  bevelSegments?: number
  /**
   * Whether to center the text.
   *
   * @type {boolean}
   * @memberof Text3DProps
   * @default false
   */
  center?: boolean
}

const props = withDefaults(defineProps<Text3DProps>(), {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
  center: false,
})

const { extend } = useCientos()

extend({ TextGeometry })

const loader = new FontLoader()

const slots = useSlots()

const localText = computed(() => {
  if (props.text) return props.text
  else if (slots.default) return (slots.default()[0].children as string)?.trim()
  return 'TresJS'
})

const textRef = shallowRef()

defineExpose({
  value: textRef,
})

const font = await new Promise((resolve, reject) => {
  try {
    if (typeof props.font === 'string') {
      loader.load(props.font, font => {
        resolve(font)
      })
    } else {
      resolve(props.font)
    }
  } catch (error) {
    reject(console.error('cientos', error))
  }
})

const textOptions = computed(() => {
  return {
    font: font,
    size: props.size,
    height: props.height,
    curveSegments: props.curveSegments,
    bevelEnabled: props.bevelEnabled,
    bevelThickness: props.bevelThickness,
    bevelSize: props.bevelSize,
    bevelOffset: props.bevelOffset,
    bevelSegments: props.bevelSegments,
  }
})

</script>
<template>
  <TresMesh v-if="font" ref="textRef" v-bind="$attrs">
    <TresTextGeometry v-if="localText" :args="[localText, textOptions]" :center="center" />
    <slot />
  </TresMesh>
</template>
