<script setup lang="ts">
import type { LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import { Lensflare } from 'three/examples/jsm/objects/Lensflare'
import { TextureLoader } from 'three'
import { watch, shallowRef, onMounted, onUnmounted } from 'vue'
import { normalizeColor } from '@tresjs/core'
import type { LensflareElementProps, SeedProps } from '.'
import { partialLensflarePropsArrayToLensflarePropsArray as fillInProps, filterLensflareElementProps } from '.'

const props = withDefaults(
  defineProps<Partial<LensflareElementProps> & {
    elements?: Partial<LensflareElementProps>[]
    scale?: number
    seed?: number
    seedProps?: SeedProps[]
  }>(),
  {
    elements: undefined,
    scale: 1,
    seed: undefined,
    seedProps: undefined,
  },
)

const lensflareRef = shallowRef<Lensflare>()
const lensflareElementPropsArrayRef = shallowRef<LensflareElementProps[]>([])
const userDefaultLensflareElementPropsRef
  = shallowRef<Partial<LensflareElementProps>>(filterLensflareElementProps(props))

defineExpose({
  value: lensflareRef,
})

const textureLoader = new TextureLoader()

const threeLensflare = new Lensflare()
// NOTE: THREE.Lensflare doesn't expose `elements` – the "parts" of a lensflare. 
// We'll maintain references that we can update.
const threeElements: LensflareElement[] = []

const dispose = () => {
  while (threeElements.length) threeElements.pop()
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
    texture: props.texture,
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
