import type { Camera } from 'three'
import type { Node, WebGPURenderer } from 'three/webgpu'
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance } from 'vue'
import type { TresContext } from '../../composables'
import { useTresContext } from '../../composables'
import type { SizesType } from '../../composables/useSizes'
import type { TresScene } from '../../types'
import type { TslStore, TslStores } from './store'
import { createTslStore } from './store'

const stores = new WeakMap<TresContext, TslStore>()

export function getTslStore(ctx: TresContext): TslStore {
  let store = stores.get(ctx)
  if (!store) {
    const created = createTslStore(() => ctx.renderer.invalidate())
    ctx.onUnmount(() => {
      created.dispose()
      stores.delete(ctx)
    })
    stores.set(ctx, created)
    store = created
  }
  return store
}

export function useTslStore() {
  const ctx = useTresContext()
  return { ctx, store: getTslStore(ctx) }
}

/** The node slots `WebGPURenderer` reads from a scene, which three's `Scene` types leave out. */
export interface TslScene extends TresScene {
  backgroundNode?: Node | null
  fogNode?: Node | null
}

export interface TslCreatorState extends TslStores {
  scene: TslScene
  camera: Camera | undefined
  renderer: WebGPURenderer
  sizes: SizesType
}

export const createCreatorState = (ctx: TresContext, views: TslStores): TslCreatorState => {
  const state: Omit<TslCreatorState, keyof TslStores> = {
    scene: ctx.scene.value as TslScene,
    camera: ctx.camera.activeCamera.value,
    renderer: ctx.renderer.instance as WebGPURenderer,
    sizes: ctx.sizes,
  }
  // Getters, not a spread: a spread would build every session view, read or not.
  for (const kind of ['uniforms', 'nodes', 'passes'] as const) {
    Object.defineProperty(state, kind, { enumerable: true, get: () => views[kind] })
  }
  return state as TslCreatorState
}

const callCounts = new WeakMap<ComponentInternalInstance, number>()

// Component `__hmrId` + call index: stable across hot updates, undefined in production builds.
export function getHmrCallSite(kind: string): string | undefined {
  const instance = getCurrentInstance()
  const hmrId = (instance?.type as { __hmrId?: string } | undefined)?.__hmrId
  if (!instance || !hmrId) { return undefined }

  const index = callCounts.get(instance) ?? 0
  callCounts.set(instance, index + 1)
  return `${hmrId}:${kind}:${index}`
}
