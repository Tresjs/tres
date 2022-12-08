<script async setup lang="ts">
import { TextGeometry, FontLoader } from 'three-stdlib'

import { computed, useSlots } from 'vue'
import { useCientos } from './useCientos'

type Glyph = {
  _cachedOutline: string[]
  ha: number
  o: string
}

type FontData = {
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

const props = withDefaults(
  defineProps<{
    font: FontData | string
    text?: string
    size?: number
    height?: number
    curveSegments?: number
    bevelEnabled?: boolean
    bevelThickness?: number
    bevelSize?: number
    bevelOffset?: number
    bevelSegments?: number
  }>(),
  {
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  },
)

const { extend } = useCientos()

extend({ TextGeometry })

const loader = new FontLoader()

const slots = useSlots()

const localText = computed(() => {
  if (props.text) return props.text
  else if (slots.default) return (slots.default()[0].children as string)?.trim()
  return 'TresJS'
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
  <TresMesh v-if="font">
    <TresTextGeometry v-if="localText" :args="[localText, textOptions]" />
    <slot />
  </TresMesh>
</template>
