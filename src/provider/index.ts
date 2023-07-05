import { Scene, WebGLRenderer } from 'three';
import { inject, provide, readonly, shallowRef, computed } from 'vue';
import { toValue, useElementSize, useWindowSize } from '@vueuse/core';
import { TresCamera } from '../types';
import { type UseRendererOptions, useCamera, useRenderer } from '../composables';

import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowReactive, ShallowRef } from 'vue';

export type TresContext = {
  scene: DeepReadonly<ShallowRef<Scene>>;
  cameras: DeepReadonly<ShallowReactive<TresCamera[]>>;
  camera: ComputedRef<TresCamera | undefined>;
  renderer: DeepReadonly<ShallowRef<WebGLRenderer>>
  addCamera: (camera: TresCamera) => void;
  setCameraToActive: (cameraId: string) => void;
  clearCameras: () => void;
  // setRenderer: (renderer: WebGLRenderer) => void; // TODO remove -> might not be required at all
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
    setCameraToActive,
  } = useCamera({ sizes });

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
    clearCameras,
    setCameraToActive,
  }

  provide('useTres', toProvide);

  return toProvide;
}

export function useTresContext(): TresContext {
  const context = inject<Partial<TresContext>>('useTres');

  if (!context) {
    throw new Error('useTresContext must be used within a TresProvider');
  }

  return context as TresContext;
}