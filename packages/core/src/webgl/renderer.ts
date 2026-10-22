// Import only from root entry modules, else `@tresjs/core/webgpu` apps bundle `WebGLRenderer`.
import { unrefElement } from '@vueuse/core'
import * as THREE from 'three'
import type { DefaultRendererFactory, UseRendererOptions } from '../composables/useRenderer/useRendererManager'
import { useBaseRendererManager } from '../composables/useRenderer/useRendererManager'
import type { TresContextProviderOptions } from '../composables/useTresContextProvider'
import { useBaseTresContextProvider } from '../composables/useTresContextProvider'
import { extend } from '../core/catalogue'

export const extendWithThree = () => extend(THREE)

export const createWebGLRenderer: DefaultRendererFactory = (ctx, options) => new THREE.WebGLRenderer({
  ...options,
  canvas: unrefElement(ctx.canvas),
})

export const useRendererManager = (options: UseRendererOptions) =>
  useBaseRendererManager(options, createWebGLRenderer)

export const useTresContextProvider = (options: TresContextProviderOptions) =>
  useBaseTresContextProvider(options, createWebGLRenderer)
