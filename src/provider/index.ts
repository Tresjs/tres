import { Camera, Scene, WebGLRenderer } from 'three';
import { toValue, useElementSize, useWindowSize } from '@vueuse/core';
import { inject, provide, readonly, shallowRef, computed } from 'vue';
import { type UseRendererOptions, useCamera, useRenderer } from '../composables';

import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue';

export type TresContext = {
  scene: DeepReadonly<ShallowRef<Scene>>;
  camera: ComputedRef<Camera | undefined>;
  cameras: DeepReadonly<Ref<Camera[]>>;
  renderer: DeepReadonly<ShallowRef<WebGLRenderer>>

  addCamera: (camera: Camera) => void;
  setCameraActive: (cameraId: string) => void;
  removeCamera: (camera: Camera) => void
  clearCameras: () => void;

  sizes: { height: Ref<number>, width: Ref<number>, aspectRatio: ComputedRef<number> }
}
// TODO move file to composables

export function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  disableRender,
  rendererOptions
}: {
  scene: Scene,
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  disableRender: MaybeRefOrGetter<boolean>
  rendererOptions: UseRendererOptions
}): TresContext {

  const elementSize = computed(() =>
    toValue(windowSize)
      ? useWindowSize()
      : useElementSize(toValue(canvas).parentElement)
  )

  const width = computed(() => elementSize.value.width.value)
  const height = computed(() => elementSize.value.height.value)


  const aspectRatio = computed(() => width.value / height.value)

  const sizes = {
    height,
    width,
    aspectRatio
  }
  const localScene = shallowRef<Scene>(scene);
  const {
    camera,
    cameras,
    addCamera,
    clearCameras,
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
    }) //TODO should useRenderer be called if disableRender is used? idea: handle it like cameras; event listeners


  const toProvide: TresContext = {
    sizes,
    scene: readonly(localScene),
    camera,
    cameras: readonly(cameras),
    renderer: readonly(renderer),
    addCamera,
    removeCamera,
    clearCameras,
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