<script setup lang="ts">
import { Lensflare } from 'three/examples/jsm/objects/Lensflare'
import type { LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import type { Texture } from 'three'
import { TextureLoader } from 'three'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import { normalizeColor } from '@tresjs/core'
import type { LensflareElementProps, SeedProps } from '.'
import { partialLensflarePropsArrayToLensflarePropsArray as fillInProps, filterLensflareElementProps } from '.'

export interface LensflareProps {
  /**
   * scale of the lensflare
   */
  scale?: number
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
   *  default distance of lensflare elements from flare center
   */
  distance?: number
  /**
   *  default size of lensflare elements
   */
  size?: number
  /**
   * default texture of lensflare elements
   */
  texture?: Texture | string
}

const props = withDefaults(defineProps<LensflareProps>(), {
  scale: 1.0,
  elements: undefined,
  seed: undefined,
  seedProps: undefined,
  color: undefined,
  distance: undefined,
  size: undefined,
  texture: undefined,
})

const lensflareRef = shallowRef<Lensflare>()
const lensflareElementPropsArrayRef = shallowRef<LensflareElementProps[]>([])
const userDefaultLensflareElementPropsRef
  = shallowRef<Partial<LensflareElementProps>>(filterLensflareElementProps(props))

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

const scaleThreeElements = () => {
  // NOTE: We can't remove already added elements from the THREE lensflare.
  // So if we've previously added more elements than are currently needed,
  // make those elements too small to display.
  for (let i = lensflareElementPropsArrayRef.value.length - 1; i < threeElements.length; i++) {
    threeElements[i].size = 0
  }

  lensflareElementPropsArrayRef.value.forEach((elementProps, i) => {
    threeElements[i].size = elementProps.size * props.scale
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

  scaleThreeElements()
}

onUnmounted(() => {
  dispose()
})

onMounted(() => {
  lensflareRef.value?.add(threeLensflare)
  lensflareElementPropsArrayRef.value
    = fillInProps(props.elements, userDefaultLensflareElementPropsRef.value, props.seed, props.seedProps)
})

watch(() => [props.color, props.distance, props.size, props.texture], () => {
  userDefaultLensflareElementPropsRef.value = {
    color: props.color,
    distance: props.distance,
    size: props.size,
    texture: props.texture as Texture | string,
  }
})

watch(() => [userDefaultLensflareElementPropsRef.value, props.elements, props.seed, props.seedProps], () => {
  lensflareElementPropsArrayRef.value
    = fillInProps(props.elements, userDefaultLensflareElementPropsRef.value, props.seed, props.seedProps)
})

watch(() => props.scale, () => {
  scaleThreeElements()
})

watch(() => lensflareElementPropsArrayRef.value, () => {
  updateThreeElements()
})
</script>

<template>
  <TresGroup ref="lensflareRef" />
</template>
