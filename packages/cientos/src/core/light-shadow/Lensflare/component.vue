<script setup lang="ts">
import { normalizeColor } from '@tresjs/core'
import { TextureLoader } from 'three'
// TODO:
// three-stdlib's Lensflare is not currently working.
// PR here: https://github.com/pmndrs/three-stdlib/issues/396
// Once three-stdlib's Lensflare is fixed, use it below
// and delete ./LensflareImpl from the repo.
import { Lensflare } from './LensflareImpl'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { Texture } from 'three'
import type { LensflareElement } from 'three-stdlib'
import { partialLensflarePropsArrayToLensflarePropsArray as fillInProps } from '.'
import type { LensflareElementProps, SeedProps } from '.'

const props = withDefaults(defineProps<LensflareProps>(), {
  scale: 1.0,
  distance: 1.0,
  elements: undefined,
  seed: undefined,
  seedProps: undefined,
  color: undefined,
  texture: undefined,
})

function pickDefined(obj: Record<string, unknown>): Partial<LensflareElementProps> {
  const result: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) { result[k] = v }
  }
  return result as Partial<LensflareElementProps>
}

export interface LensflareProps {
  /**
   * scale of the lensflare element sizes
   */
  scale?: number
  /**
   * multiplier for element distances from flare center
   */
  distance?: number
  /**
   * array of lensflare element properties
   */
  elements?: Partial<LensflareElementProps>[]
  /**
   * random seed for generating random seeded elements
   */
  seed?: number
  /**
   * specifications for generating random seeded elements
   */
  seedProps?: SeedProps[]
  /**
   * default color of lensflare elements
   */
  color?: TresColor
  /**
   * default texture of lensflare elements
   */
  texture?: Texture | string
}

const lensflareRef = shallowRef<Lensflare>()
const lensflareElementPropsArrayRef = shallowRef<LensflareElementProps[]>([])
const userDefaultLensflareElementPropsRef
  = shallowRef<Partial<LensflareElementProps>>(pickDefined({
    color: props.color,
    texture: props.texture,
  }))

defineExpose({
  instance: lensflareRef,
})

const textureLoader = new TextureLoader()

const threeLensflare = new Lensflare()
// NOTE: THREE.Lensflare doesn't expose `elements` – the "parts" of a lensflare.
// We'll maintain references that we can update.
const threeElements: LensflareElement[] = []

const dispose = () => {
  while (threeElements.length) { threeElements.pop() }
  lensflareRef.value?.children.forEach((c: any) => {
    if ('dispose' in c) {
      c.dispose()
    }
  })
  lensflareRef.value?.remove(...lensflareRef.value.children)
  lensflareRef.value?.dispose()
}

const lensflareElementPropsToLensflareElement = (p: LensflareElementProps) => {
  if (typeof p.texture === 'string') {
    const path = p.texture
    p.texture = textureLoader.load(path)
    p.texture.name = path
  }
  p.color = normalizeColor(p.color)
  return p as LensflareElement
}

const applyScaleAndDistance = () => {
  // NOTE: We can't remove already added elements from the THREE lensflare.
  // So if we've previously added more elements than are currently needed,
  // make those elements too small to display.
  for (let i = lensflareElementPropsArrayRef.value.length - 1; i < threeElements.length; i++) {
    threeElements[i].size = 0
  }

  lensflareElementPropsArrayRef.value.forEach((elementProps, i) => {
    threeElements[i].size = elementProps.size * props.scale
    threeElements[i].distance = elementProps.distance * props.distance
  })
}

const updateThreeElements = () => {
  while (lensflareElementPropsArrayRef.value.length > threeElements.length) {
    const element = lensflareElementPropsToLensflareElement(lensflareElementPropsArrayRef.value[threeElements.length])
    const copy = { ...element }
    threeElements.push(copy)
    threeLensflare.addElement(copy)
  }

  lensflareElementPropsArrayRef.value.forEach((elementProps, i) => {
    const threeElement = threeElements[i]
    const { texture, size, distance, color } = elementProps
    if (typeof texture === 'string') {
      if (threeElement.texture.name !== texture) {
        threeElement.texture.dispose()
        const name = texture
        threeElement.texture = textureLoader.load(name)
        threeElement.texture.name = name
      }
    }
    else {
      if (threeElement.texture !== texture) {
        threeElement.texture.dispose()
        threeElement.texture = texture
      }
    }

    threeElement.size = size
    threeElement.distance = distance
    threeElement.color = normalizeColor(color)
  })

  applyScaleAndDistance()
}

onUnmounted(() => {
  dispose()
})

onMounted(() => {
  lensflareRef.value?.add(threeLensflare)
  lensflareElementPropsArrayRef.value
    = fillInProps(props.elements, userDefaultLensflareElementPropsRef.value, props.seed, props.seedProps)
})

watch(() => [props.color, props.texture], () => {
  userDefaultLensflareElementPropsRef.value = pickDefined({
    color: props.color,
    texture: props.texture,
  })
})

watch(() => [userDefaultLensflareElementPropsRef.value, props.elements, props.seed, props.seedProps], () => {
  lensflareElementPropsArrayRef.value
    = fillInProps(props.elements, userDefaultLensflareElementPropsRef.value, props.seed, props.seedProps)
})

watch(() => [props.scale, props.distance], () => {
  applyScaleAndDistance()
})

watch(() => lensflareElementPropsArrayRef.value, () => {
  updateThreeElements()
})
</script>

<template>
  <TresGroup ref="lensflareRef" />
</template>
