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
  debounceMs: number = 10,
) {
  const reactiveSize = toValue(windowSize)
    ? useWindowSize()
    : useElementSize(
      computed(
        () => toValue(canvas).parentElement,
      ),
      {
        width:
            toValue(canvas).parentElement
              ?.clientWidth ?? 0,
        height:
            toValue(canvas).parentElement
              ?.clientHeight ?? 0,
      },
    )

  const debouncedReactiveWidth = readonly(refDebounced(reactiveSize.width, debounceMs))
  const debouncedReactiveHeight = readonly(refDebounced(reactiveSize.height, debounceMs))

  const aspectRatio = computed(() => debouncedReactiveWidth.value / debouncedReactiveHeight.value)

  return {
    height: debouncedReactiveHeight,
    width: debouncedReactiveWidth,
    aspectRatio,
  }
}