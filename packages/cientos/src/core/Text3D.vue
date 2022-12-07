<script setup lang="ts">
import { WebGLRenderer } from 'three'
import { TextGeometry, FontLoader } from 'three-stdlib'

import { computed, inject, Ref } from 'vue'
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
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5,
  },
)
const renderer = inject<Ref<WebGLRenderer>>('renderer')

const { extend } = useCientos()

extend({ TextGeometry })

const loader = new FontLoader()

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
  <TresMesh v-if="renderer && font">
    <TresTextGeometry :args="[text, textOptions]" />
    <TresMeshStandardMaterial />
  </TresMesh>
</template>
