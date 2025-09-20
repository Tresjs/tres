<script setup lang="ts">
import type { Side, Texture } from 'three'
import { Color, FrontSide } from 'three'
import type { TresColor } from '@tresjs/core'
import { useTres } from '@tresjs/core'
import { computed, shallowRef, watchEffect } from 'vue'
import ImageMaterial from './ImageMaterial.vue'
import { useTexture } from '../../loaders/useTexture'

export type ImageProps = {
  /**
   * Number of divisions in the the default geometry.
   */
  segments?: number
  /**
   * Scale of the geometry.
   */
  scale?: number | [number, number]
  /**
   * Color multiplied into the image texture. Default is white.
   */
  color?: TresColor
  /**
   * Shrinks or enlarges the image texture.
   */
  zoom?: number
  /**
   * Border radius applied to image texture. Intended for rectangular geometries.
   */
  radius?: number
  /**
   * Power of grayscale effect. 0 is no grayscale. 1 is full grayscale.
   */
  grayscale?: number
  /**
   * Whether this material is tone mapped according to the renderer's toneMapping setting. [See THREE.material.tonemapped](https://threejs.org/docs/?q=material#api/en/materials/Material.toneMapped)
   */
  toneMapped?: boolean
  /**
   * Whether the image material should be transparent. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent)
   */
  transparent?: boolean
  /**
   * Opacity of the image material. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent)
   */
  opacity?: number
  /**
   * THREE.Side of the image material. [See THREE.material.side](https://threejs.org/docs/?q=material#api/en/materials/Material.side)
   */
  side?: Side
} & ({
  /**
   * Image texture to display on the geometry.
   */
  texture: Texture
  url?: never
} | {
  texture?: never
  /**
   * Image URL to load and display on the geometry.
   */
  url: string
})

const props = withDefaults(defineProps<ImageProps>(), {
  segments: 1,
  scale: 1,
  color: () => new Color('white'),
  zoom: 1,
  radius: 0,
  grayscale: 0,
  toneMapped: true,
  transparent: false,
  opacity: 1,
  side: FrontSide,
})

const imageRef = shallowRef()
const texture = shallowRef<Texture | null>(props.texture ?? null)
const size = useTres().sizes
const planeBounds = computed(() => Array.isArray(props.scale) ? [props.scale[0], props.scale[1]] : [props.scale, props.scale])
const imageBounds = computed(() => [texture.value?.image?.width ?? 0, texture.value?.image?.height ?? 0])
const resolution = computed(() => Math.max(size.width.value, size.height.value))

watchEffect(() => {
  if (props.texture) {
    texture.value = props.texture
  }
  else {
    const { state: t } = useTexture(props.url!)
    texture.value = t.value
  }
})

const scale = computed(
  () => Array.isArray(props.scale)
    ? ([...props.scale, 1] as [number, number, number])
    : props.scale,
)

defineExpose({ instance: imageRef })
</script>

<template>
  <TresMesh ref="imageRef" :scale="scale">
    <slot>
      <TresPlaneGeometry :args="[1, 1, props.segments, props.segments]" />
    </slot>
    <ImageMaterial
      :color="props.color"
      :map="texture"
      :zoom="props.zoom"
      :grayscale="props.grayscale"
      :opacity="props.opacity"
      :scale="planeBounds"
      :imageBounds="imageBounds"
      :resolution="resolution"
      :radius="radius"
      :toneMapped="toneMapped"
      :transparent="transparent"
      :side="side"
    />
  </TresMesh>
</template>
