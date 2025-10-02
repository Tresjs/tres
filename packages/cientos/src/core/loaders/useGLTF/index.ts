import type { TresLoader, TresLoaderOptions, TresObject } from '@tresjs/core'
import { buildGraph, useLoader } from '@tresjs/core'

import { computed, type ComputedRef, type MaybeRef, type Ref, watch } from 'vue'

import type { GLTF } from 'three-stdlib'
import { DRACOLoader, GLTFLoader } from 'three-stdlib'

export interface UseGLTFOptions {
  /**
   * Whether to use DRACO compression for loading the model
   * @type {boolean}
   */
  draco?: boolean
  /**
   * Path to the DRACO decoder. Defaults to https://www.gstatic.com/draco/versioned/decoders/1.5.6/
   * @type {string}
   */
  decoderPath?: string
  /**
   * A traverse function applied to the scene upon loading the model.
   * @type {Function}
   */
  traverse?: (child: TresObject) => void
}

/**
 * Vue composable for loading GLTF models in TresJS
 *
 * @remarks
 * This composable uses Three.js GLTFLoader under the hood and supports DRACO compression.
 * When DRACO compression is enabled, it will use the specified decoder path or fallback to Google's CDN.
 *
 * @example
 * ```ts
 * const { state: model } = useGLTF('/path/to/model.glb', { draco: true })
 * ```
 *
 * @param {MaybeRef<string>} path - Path to the GLTF model file
 * @param {UseGLTFOptions} options - Options for loading the model
 * @returns {{ state: GLTF, isLoading: boolean, execute: () => Promise<void> }} Object containing the model state, loading state and reload function
 */
export function useGLTF(path: MaybeRef<string>, options?: UseGLTFOptions): {
  state: Ref<GLTF | null>
  isLoading: Ref<boolean>
  execute: (delay?: number, ...args: any[]) => Promise<GLTF>
  nodes: ComputedRef<Record<string, any>>
  materials: ComputedRef<Record<string, any>>
} {
  const useLoaderOptions: TresLoaderOptions<GLTF, true> = {

  }
  if (options?.draco) {
    const dracoLoader = new DRACOLoader()
    // Set the path to the Draco decoder (you might want to use a CDN or local path)
    dracoLoader.setDecoderPath(options.decoderPath || 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    useLoaderOptions.extensions = (loader: TresLoader<GLTF>) => {
      if (loader instanceof GLTFLoader) {
        loader.setDRACOLoader(dracoLoader)
      }
    }
  }

  const result = useLoader(GLTFLoader, path, useLoaderOptions)
  if (options?.traverse) {
    watch(result.state, (state) => {
      state.scene.traverse(child => options.traverse?.(child as TresObject))
    })
  }

  const nodes = computed(() => {
    return result.state.value?.scene ? buildGraph(result.state.value?.scene as unknown as TresObject).nodes : {}
  })

  const materials = computed(() => {
    return result.state.value?.scene ? buildGraph(result.state.value?.scene as unknown as TresObject).materials : {}
  })

  return {
    ...result,
    nodes,
    materials,
  }
}
