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
const componentIds = new WeakMap<object, string>()
let nextComponentId = 0

export interface TslCallSite {
  // Component + call index: the same for every mount of the component, and across hot updates.
  owner: string
  // Only development builds give components an `__hmrId`.
  hmr: boolean
  // A hot update puts a new `setup` on the same component definition, so this changes when the code changes.
  code: unknown
}

export function getCallSite(kind: string): TslCallSite | undefined {
  const instance = getCurrentInstance()
  if (!instance) { return undefined }

  const type = instance.type as { __hmrId?: string, setup?: unknown, render?: unknown }
  let id = type.__hmrId ?? componentIds.get(type)
  if (id === undefined) {
    id = `component${nextComponentId++}`
    componentIds.set(type, id)
  }

  const index = callCounts.get(instance) ?? 0
  callCounts.set(instance, index + 1)
  return { owner: `${id}:${kind}:${index}`, hmr: type.__hmrId !== undefined, code: type.setup ?? type.render }
}
