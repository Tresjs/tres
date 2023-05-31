<script setup lang="ts">
import { TextGeometry, FontLoader } from 'three-stdlib'

import { computed, useSlots, shallowRef, watchEffect } from 'vue'
import { useCientos } from '../../core/useCientos'

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
  /**
   * Whether to update the text.
   *
   * @type {boolean}
   * @memberof Text3DProps
   * @default false
   */
  needUpdates?: boolean
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
  needUpdates: false,
})

const { extend } = useCientos()

extend({ TextGeometry })

const loader = new FontLoader()

const slots = useSlots()

const localText = computed(() => {
  if (props.text) return props.text
  else if (slots.default) return (slots.default()[0].children as string)?.trim()
  return props.needUpdates ? '' : 'TresJS'
})

const text3DRef = shallowRef()

defineExpose({
  value: text3DRef,
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
    // eslint-disable-next-line no-console
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

watchEffect(() => {
  if (text3DRef.value && props.needUpdates) {
    text3DRef.value.geometry.dispose()
    text3DRef.value.geometry = new TextGeometry(localText.value, textOptions.value)
    if (props.center) {
      text3DRef.value.geometry.center()
    }
  }
})
</script>
<template>
  <TresMesh v-if="font" ref="text3DRef">
    <TresTextGeometry v-if="localText" :args="[localText, textOptions]" :center="center" />
    <slot />
  </TresMesh>
</template>
