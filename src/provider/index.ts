import { Scene, WebGLRenderer } from 'three';
import { inject, provide, readonly, shallowRef, computed, ref, watch, watchEffect } from 'vue';
import type { ComputedRef, Ref, ShallowRef } from 'vue';
import { TresCamera } from '../types';
import { useCamera, useLogger } from '../composables';
import { toValue, useElementSize, useWindowSize } from '@vueuse/core';


export type TresState = {
  scene: Readonly<ShallowRef<Scene>>;
  cameras: Readonly<ShallowRef<TresCamera[]>>;
  camera: ComputedRef<TresCamera | undefined>;
  renderer?: Readonly<ShallowRef<WebGLRenderer | null>>
  addCamera: (camera: TresCamera) => void;
  setCameraToActive: (cameraId: string) => void;
  clearCameras: () => void;
  setRenderer: (renderer: WebGLRenderer) => void;
  sizes: { height: Ref<number>, width: Ref<number>, aspectRatio: ComputedRef<number> }
}

const { logError } = useLogger()

export function useTresContextProvider(scene: Scene, canvas: Ref<HTMLCanvasElement | undefined>, props): TresState {
  if (!scene) {
    logError('A scene most be provided to the TresProvider');
  }
  let { width, height } =
    toValue(props.windowSize) == true || toValue(props.windowSize) === '' || toValue(props.windowSize) === 'true' || canvas.value === undefined
      ? useWindowSize()
      : useElementSize(canvas.value?.parentElement)

  watchEffect(() => {
    if (canvas.value) {
      width = useElementSize(canvas.value?.parentElement).width
      height = useElementSize(canvas.value?.parentElement).height
    }
  })

  const sizes = {
    height,
    width,
    aspectRatio: computed(() => width.value / height.value)
  }
  const localScene = shallowRef<Scene>(scene);
  const { camera, cameras, addCamera, setCameraToActive } = useCamera(sizes);
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