import { Scene, WebGLRenderer } from 'three';
import { inject, provide, readonly, shallowRef, computed } from 'vue';
import type { ComputedRef, DeepReadonly, Ref, ShallowReactive, ShallowRef } from 'vue';
import { toValue, useElementSize, useWindowSize } from '@vueuse/core';
import { TresCamera } from '../types';
import { useCamera, useRenderer } from '../composables';
import { TresCanvasProps } from '../components/TresCanvas.vue';

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

export function useTresContextProvider(
  scene: Scene,
  canvas: Ref<HTMLCanvasElement>,
  props: TresCanvasProps // TODO change!
): TresContext {

  const elementSize = computed(() =>
    props.windowSize
      ? useWindowSize()
      : useElementSize(canvas.value?.parentElement)
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
  const { camera, cameras, addCamera, setCameraToActive, clearCameras } = useCamera({ sizes });

  const { renderer } = useRenderer(canvas, props, scene, props.disableRender || false, { sizes, camera }) //TODO should useRenderer be called if disableRender is used?


  const toProvide: TresContext = {
    scene: readonly(localScene),
    cameras: readonly(cameras),
    camera,
    addCamera,
    setCameraToActive,
    clearCameras,
    renderer: readonly(renderer),
    sizes
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