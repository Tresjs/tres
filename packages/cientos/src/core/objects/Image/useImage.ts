import type { Texture } from 'three'
import { useTres } from '@tresjs/core'
import { computed, shallowRef, watchEffect } from 'vue'
import { useTexture } from '../../loaders/useTexture'
import type { ImageProps } from './props'

export function useImage(props: ImageProps) {
  const texture = shallowRef<Texture | null>(props.texture ?? null)
  const { sizes: size, renderer } = useTres()
  const planeBounds = computed(() =>
    Array.isArray(props.scale)
      ? [props.scale[0], props.scale[1]]
      : [props.scale, props.scale],
  )
  const imageBounds = computed(() => {
    const image = texture.value?.image as { width?: number, height?: number } | null
    return [image?.width ?? 1, image?.height ?? 1]
  })
  const resolution = computed(() => Math.max(size.width.value, size.height.value))

  const { state, isLoading } = useTexture(computed(() => props.url!))

  watchEffect(() => {
    if (props.texture) {
      texture.value = props.texture
    }
    else if (!isLoading.value) {
      texture.value = state.value
      texture.value.colorSpace = renderer.outputColorSpace
    }
  })

  // Not built from `planeBounds`: a number scales the mesh on all three axes, so a custom 3D
  // geometry in the slot keeps its depth in proportion.
  const scale = computed(() =>
    Array.isArray(props.scale)
      ? ([...props.scale, 1] as [number, number, number])
      : props.scale,
  )

  const materialProps = computed(() => ({
    color: props.color,
    map: texture.value,
    zoom: props.zoom,
    grayscale: props.grayscale,
    opacity: props.opacity,
    scale: planeBounds.value,
    imageBounds: imageBounds.value,
    resolution: resolution.value,
    radius: props.radius,
    toneMapped: props.toneMapped,
    transparent: props.transparent,
    side: props.side,
  }))

  return { materialProps, scale }
}
