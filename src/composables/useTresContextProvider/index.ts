import { toValue, useElementSize, useFps, useMemory, useWindowSize } from '@vueuse/core'
import { inject, provide, readonly, shallowRef, computed, ref } from 'vue'
import type { Camera, EventDispatcher, Scene, WebGLRenderer } from 'three'
import { Raycaster } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import { useCamera } from '../useCamera'
import type { UseRendererOptions } from '../useRenderer'
import { useRenderer } from '../useRenderer'
import { extend } from '../../core/catalogue'

export interface TresContext {
  scene: ShallowRef<Scene>
  sizes: { height: Ref<number>; width: Ref<number>; aspectRatio: ComputedRef<number> }
  extend: (objects: any) => void
  camera: ComputedRef<Camera | undefined>
  cameras: DeepReadonly<Ref<Camera[]>>
  controls: Ref<(EventDispatcher & { enabled: boolean }) | null>
  renderer: ShallowRef<WebGLRenderer>
  raycaster: ShallowRef<Raycaster>
  registerCamera: (camera: Camera) => void
  setCameraActive: (cameraOrUuid: Camera | string) => void
  deregisterCamera: (camera: Camera) => void
}

export function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  disableRender,
  rendererOptions,
}: {
  scene: Scene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  disableRender: MaybeRefOrGetter<boolean>
  rendererOptions: UseRendererOptions
}): TresContext {

  const elementSize = computed(() =>
    toValue(windowSize)
      ? useWindowSize()
      : useElementSize(toValue(canvas).parentElement),
  )

  const width = computed(() => elementSize.value.width.value)
  const height = computed(() => elementSize.value.height.value)

  const aspectRatio = computed(() => width.value / height.value)

  const sizes = {
    height,
    width,
    aspectRatio,
  }
  const localScene = shallowRef<Scene>(scene)
  const {
    camera,
    cameras,
    registerCamera,
    deregisterCamera,
    setCameraActive,
  } = useCamera({ sizes, scene })

  const { renderer } = useRenderer(
    {
      scene,
      canvas,
      options: rendererOptions,
      contextParts: { sizes, camera },
      disableRender,
    })

  const toProvide: TresContext = {
    sizes,
    scene: localScene,
    camera,
    cameras: readonly(cameras),
    renderer,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    extend,
    registerCamera,
    setCameraActive,
    deregisterCamera,
  }

  provide('useTres', toProvide)

  return toProvide
}

export function useTresContext(): TresContext {
  const context = inject<Partial<TresContext>>('useTres')

  if (!context) {
    throw new Error('useTresContext must be used together with useTresContextProvider')
  }

  return context as TresContext
}

export const useTres = useTresContext
