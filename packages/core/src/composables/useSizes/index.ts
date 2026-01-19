import type { ComputedRef, MaybeRef, MaybeRefOrGetter, Ref } from 'vue'
import { refDebounced, useDevicePixelRatio, useElementSize, useWindowSize } from '@vueuse/core'
import { computed, readonly, toValue } from 'vue'

export interface SizesType {
  width: Readonly<Ref<number>>
  height: Readonly<Ref<number>>
  pixelRatio: Readonly<Ref<number>>
  aspectRatio: ComputedRef<number>
}

export default function useSizes(
  windowSize: MaybeRefOrGetter<boolean>,
  canvas: MaybeRef<HTMLCanvasElement>,
  debounceMs: number = 10,
): SizesType {
  const { pixelRatio } = useDevicePixelRatio()

  const reactiveSize = toValue(windowSize)
    ? useWindowSize()
    : useElementSize(computed(() => toValue(canvas).parentElement))

  const debouncedReactiveWidth = readonly(refDebounced(reactiveSize.width, debounceMs))
  const debouncedReactiveHeight = readonly(refDebounced(reactiveSize.height, debounceMs))

  const aspectRatio = computed(() => debouncedReactiveWidth.value / debouncedReactiveHeight.value)

  return {
    width: debouncedReactiveWidth,
    height: debouncedReactiveHeight,
    pixelRatio,
    aspectRatio,
  }
}
