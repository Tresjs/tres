import { toValue, useElementSize, useWindowSize } from '@vueuse/core';
import { Camera, EventDispatcher, Raycaster, Scene, WebGLRenderer } from 'three';
import { computed, inject, provide, readonly, ref, shallowRef } from 'vue';
import { extend } from '../../core/catalogue';
import { useCamera } from '../useCamera';
import { UseRendererOptions, useRenderer } from '../useRenderer';

import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue';

export type TresContext = {
  scene: ShallowRef<Scene>;
  camera: ComputedRef<Camera | undefined>;
  cameras: DeepReadonly<Ref<Camera[]>>;
  renderer: ShallowRef<WebGLRenderer>
  raycaster: ShallowRef<Raycaster>
  controls: Ref<(EventDispatcher & { enabled: boolean }) | null>
  extend: (objects: any) => void
  addCamera: (camera: Camera) => void;
  removeCamera: (camera: Camera) => void
  setCameraActive: (cameraOrUuid: Camera | string) => void;

  sizes: { height: Ref<number>, width: Ref<number>, aspectRatio: ComputedRef<number> }
}

export function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  disableRender,
  rendererOptions
}: {
  scene: ShallowRef<Scene>,
  canvas: MaybeRef<HTMLCanvasElement | undefined>
  windowSize: MaybeRefOrGetter<boolean>
  disableRender: MaybeRefOrGetter<boolean>
  rendererOptions: UseRendererOptions
}): TresContext {

  const elementSize = computed(() =>
    toValue(windowSize)
      ? useWindowSize()
      : useElementSize(toValue(canvas)?.parentElement)
  )

  const width = computed(() => elementSize.value.width.value)
  const height = computed(() => elementSize.value.height.value)


  const aspectRatio = computed(() => width.value / height.value)

  const sizes = {
    height,
    width,
    aspectRatio
  }

  const {
    camera,
    cameras,
    addCamera,
    removeCamera,
    setCameraActive,
  } = useCamera({ sizes, scene });

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
    scene,
    camera,
    cameras: readonly(cameras),
    renderer,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    extend,
    addCamera,
    removeCamera,
    setCameraActive,
  }

  provide('useTres', toProvide);

  return toProvide;
}

export function useTresContext(): TresContext {
  const context = inject<Partial<TresContext>>('useTres');

  if (!context) {
    throw new Error('useTresContext must be used together with useTresContextProvider');
  }

  return context as TresContext;
}

export const useTres = useTresContext;
