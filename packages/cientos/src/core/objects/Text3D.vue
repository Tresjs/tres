<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { FontLoader, TextGeometry } from 'three-stdlib'
import { computed, shallowRef, toRefs, toValue, useSlots, watch, watchEffect } from 'vue'
import type { Slots } from 'vue'
import type { TextGeometryParameters } from 'three-stdlib'

export interface Glyph {
  _cachedOutline: string[]
  ha: number
  o: string
}

export interface FontData {
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

const {
  center,
  font,
  text,
  needUpdates,
  size,
  height,
  curveSegments,
  bevelEnabled,
  bevelThickness,
  bevelSize,
  bevelOffset,
  bevelSegments,
} = toRefs(props)

const { extend, invalidate } = useTres()

watch(props, () => {
  invalidate()
})

extend({ TextGeometry })

const loader = new FontLoader()

const slots: Slots = useSlots()

const localText = computed((): string => {
  if (text?.value) { return text.value }
  else if (slots.default) { return (slots.default()[0].children as string)?.trim() }
  return needUpdates.value ? '' : 'TresJS'
})

const text3DRef = shallowRef()

defineExpose({
  instance: text3DRef,
})

const localFont = await new Promise((resolve, reject) => {
  try {
    if (typeof font.value === 'string') {
      loader.load(font.value, (font) => {
        resolve(font)
      })
    }
    else {
      resolve(font.value)
    }
  }
  catch (error) {
    reject(console.error('cientos', error))
  }
})

const textOptions = computed(() => ({
  font: localFont,
  size: toValue(size),
  height: toValue(height),
  curveSegments: toValue(curveSegments),
  bevelEnabled: toValue(bevelEnabled),
  bevelThickness: toValue(bevelThickness),
  bevelSize: toValue(bevelSize),
  bevelOffset: toValue(bevelOffset),
  bevelSegments: toValue(bevelSegments),
}))

watchEffect(() => {
  if (text3DRef.value && needUpdates.value) {
    text3DRef.value.geometry.dispose()
    text3DRef.value.geometry = new TextGeometry(localText.value, textOptions.value as TextGeometryParameters)
    if (center.value) {
      text3DRef.value.geometry.center()
    }
  }
})
</script>

<template>
  <TresMesh
    v-if="font"
    ref="text3DRef"
  >
    <TresTextGeometry
      v-if="localText"
      :args="[localText, textOptions]"
      :center="center"
    />
    <slot></slot>
  </TresMesh>
</template>
