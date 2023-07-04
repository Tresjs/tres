import { Scene, WebGLRenderer } from 'three';
import { inject, provide, readonly, shallowRef, computed } from 'vue';
import type { ComputedRef, DeepReadonly, Ref, ShallowReactive, ShallowRef } from 'vue';
import { toValue, useElementSize, useWindowSize } from '@vueuse/core';
import { TresCamera } from '../types';
import { useCamera, useLogger } from '../composables';
import { TresCanvasProps } from '../components/TresCanvas.vue';

export type TresState = {
  scene: DeepReadonly<ShallowRef<Scene>>;
  cameras: DeepReadonly<ShallowReactive<TresCamera[]>>;
  camera: ComputedRef<TresCamera | undefined>;
  renderer?: DeepReadonly<ShallowRef<WebGLRenderer | null>>
  addCamera: (camera: TresCamera) => void;
  setCameraToActive: (cameraId: string) => void;
  clearCameras: () => void;
  setRenderer: (renderer: WebGLRenderer) => void;
  sizes: { height: Ref<number>, width: Ref<number>, aspectRatio: ComputedRef<number> }
}

const { logError } = useLogger()

export function useTresContextProvider(
  scene: Scene,
  canvas: Ref<HTMLCanvasElement | undefined>,
  props: TresCanvasProps
): TresState {
  if (!scene) {
    logError('A scene most be provided to the TresProvider');
  }
  const { width, height }
    // eslint-disable-next-line max-len
    = toValue(props.windowSize) == true || canvas.value === undefined
      ? useWindowSize()
      : useElementSize(canvas.value?.parentElement)
  const aspectRatio = computed(() => width.value / height.value)

  const sizes = {
    height,
    width,
    aspectRatio
  }
  const localScene = shallowRef<Scene>(scene);
  const { camera, cameras, addCamera, setCameraToActive, clearCameras } = useCamera(sizes);
  const renderer = shallowRef<WebGLRenderer | null>(null);

  // Renderer

  function setRenderer(newRenderer: WebGLRenderer): void {
    if (renderer.value) return;
    renderer.value = newRenderer;
  }

  const toProvide: TresState = {
    scene: readonly(localScene),
    cameras: readonly(cameras),
    camera,
    addCamera,
    setCameraToActive,
    clearCameras,
    renderer: readonly(renderer),
    setRenderer,
    sizes
  }

  provide('useTres', toProvide);

  return toProvide;
}

export function useTresContext(): TresState {
  const context = inject<Partial<TresState>>('useTres');

  if (!context) {
    throw new Error('useTresContext must be used within a TresProvider');
  }

  return context as TresState;
}