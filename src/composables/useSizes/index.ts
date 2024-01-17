import { computed, readonly } from 'vue'
import type { MaybeRefOrGetter, MaybeRef, ComputedRef, Ref } from 'vue'
import { refDebounced, toValue, useElementSize, useWindowSize } from '@vueuse/core'

export interface SizesType {
  height: Readonly<Ref<number>>
  width: Readonly<Ref<number>>
  aspectRatio: ComputedRef<number>
}

export default function useSizes(
  windowSize: MaybeRefOrGetter<boolean>,
  canvas: MaybeRef<HTMLCanvasElement>,
  debounce: number = 10,
) {
  const reactiveSize = toValue(windowSize)
    ? useWindowSize()
    : useElementSize(computed(() => toValue(canvas).parentElement))

  const debouncedReactiveWidth = readonly(refDebounced(reactiveSize.width, debounce))
  const debouncedReactiveHeight = readonly(refDebounced(reactiveSize.height, debounce))

  const aspectRatio = computed(() => debouncedReactiveWidth.value / debouncedReactiveHeight.value)

  return {
    height: debouncedReactiveHeight,
    width: debouncedReactiveWidth,
    aspectRatio,
  }
}