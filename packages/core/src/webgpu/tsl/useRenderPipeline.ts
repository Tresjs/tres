import type { Camera, Scene } from 'three'
import { pass } from 'three/tsl'
import type { Node, PassNode } from 'three/webgpu'
import { RenderPipeline } from 'three/webgpu'
import type { ComputedRef, ShallowRef } from 'vue'
import { computed, markRaw, onScopeDispose, shallowRef, watch } from 'vue'
import type { TresContext } from '../../composables'
import { isWebGPURenderer } from '../../utils/is'
import { logWarning } from '../../utils/logger'
import type { TslCreatorState } from './context'
import { createCreatorState, useTslStore } from './context'
import type { TslSession, TslStore } from './store'
import { createLiveView, watchTslSession } from './store'

export const SCENE_PASS = 'scenePass'

export interface RenderPipelinePasses {
  /** The pass that renders the scene with the active camera. Created before the callbacks run. */
  scenePass: PassNode
  [name: string]: any
}

export interface RenderPipelineCallbackState extends TslCreatorState {
  renderPipeline: RenderPipeline
  passes: RenderPipelinePasses
}

/**
 * Configures the pipeline (`renderPipeline.outputNode = ...`). A returned record registers extra passes.
 */
export type RenderPipelineCallback = (state: RenderPipelineCallbackState) => Record<string, Node> | void

export interface UseRenderPipelineReturn {
  /** The pipeline that renders the canvas, or `null` while no component configures one. */
  renderPipeline: Readonly<ShallowRef<RenderPipeline | null>>
  /** Every registered pass, `scenePass` included. */
  passes: Partial<RenderPipelinePasses>
  isReady: ComputedRef<boolean>
  /** Re-runs the callbacks of the configuring component against a new scene pass. */
  rebuild: () => void
  /** Frees the pipeline now. The canvas renders without it until the next rebuild. */
  reset: () => void
  /** Removes every registered pass. */
  clearPasses: () => void
}

interface PipelineOwner {
  main: RenderPipelineCallback
  setup?: RenderPipelineCallback
  session: ShallowRef<TslSession | undefined>
}

interface PipelineState {
  renderPipeline: ShallowRef<RenderPipeline | null>
  owners: PipelineOwner[]
  sceneKey?: [Scene, Camera]
  restoreRender?: () => void
}

const isDev = process.env.NODE_ENV !== 'production'

const states = new WeakMap<TslStore, PipelineState>()

function getPipelineState(store: TslStore): PipelineState {
  let state = states.get(store)
  if (!state) {
    const created: PipelineState = { renderPipeline: shallowRef(null), owners: [] }
    store.onDispose(() => free(created, store))
    states.set(store, created)
    state = created
  }
  return state
}

function free(state: PipelineState, store: TslStore) {
  state.restoreRender?.()
  state.restoreRender = undefined
  state.renderPipeline.value?.dispose()
  state.renderPipeline.value = null
  for (const name of store.passes.keys()) {
    const node = store.passes.get(name) as Partial<PassNode> | undefined
    if (node?.isPassNode) { node.dispose?.() }
  }
  state.sceneKey = undefined
  store.passes.clear()
}

const activeOwner = (state: PipelineState) => state.owners.at(-1)

function registerPasses(store: TslStore, passes: Record<string, Node> | void) {
  if (!passes) { return }
  for (const [name, node] of Object.entries(passes)) {
    if (name === SCENE_PASS) {
      logWarning(`useRenderPipeline: "${SCENE_PASS}" is reserved for the pass the composable creates. Return your pass under another name.`)
      continue
    }
    store.passes.set(name, node)
  }
}

function runCallbacks(ctx: TresContext, store: TslStore, state: PipelineState, owner: PipelineOwner) {
  const renderPipeline = state.renderPipeline.value
  if (!renderPipeline || !store.passes.get(SCENE_PASS)) { return }

  const session = store.createSession({ label: 'useRenderPipeline callback' })
  try {
    const callbackState = Object.defineProperty(
      createCreatorState(ctx, session.stores),
      'renderPipeline',
      { value: renderPipeline, enumerable: true },
    ) as RenderPipelineCallbackState
    registerPasses(store, owner.setup?.(callbackState))
    registerPasses(store, owner.main(callbackState))
  }
  finally {
    session.close()
  }
  owner.session.value = session
  renderPipeline.needsUpdate = true
  ctx.renderer.invalidate()
}

function configure(ctx: TresContext, store: TslStore, state: PipelineState, fresh = false) {
  const owner = activeOwner(state)
  const scene = ctx.scene.value
  const camera = ctx.camera.activeCamera.value
  if (!owner || !camera) { return }

  if (!state.renderPipeline.value) {
    state.renderPipeline.value = markRaw(new RenderPipeline(ctx.renderer.instance as any))
    state.restoreRender = ctx.renderer.replaceRenderFunction((notifyFrameRendered) => {
      const renderPipeline = state.renderPipeline.value
      if (!renderPipeline || !store.passes.get(SCENE_PASS)) { return }
      renderPipeline.render()
      notifyFrameRendered()
    })
  }

  const [lastScene, lastCamera] = state.sceneKey ?? []
  if (fresh || lastScene !== scene || lastCamera !== camera) {
    ;(store.passes.get(SCENE_PASS) as PassNode | undefined)?.dispose()
    const scenePass = pass(scene, camera)
    store.passes.set(SCENE_PASS, scenePass)
    state.renderPipeline.value.outputNode = scenePass
    state.sceneKey = [scene, camera]
  }

  runCallbacks(ctx, store, state, owner)
}

/**
 * Renders the canvas through a three `RenderPipeline` (WebGPU post-processing).
 *
 * With callbacks, it creates the pipeline and a `scenePass`, runs `setup` then `main`, and renders through the
 * pipeline until the component unmounts. The callbacks re-run when the pipeline is created, when the scene or
 * active camera changes, when a store entry they read changes, and on `rebuild()`. Not on re-render: put
 * dynamic values in uniforms. Without callbacks, it reads the pipeline that renders.
 *
 * @example
 * ```ts
 * useRenderPipeline(({ renderPipeline, passes, uniforms }) => {
 *   renderPipeline.outputNode = bloom(passes.scenePass.getTextureNode(), uniforms.uIntensity)
 * })
 *
 * const { renderPipeline, passes, isReady, rebuild, reset, clearPasses } = useRenderPipeline()
 * ```
 *
 * @throws Under a `WebGLRenderer`. `RenderPipeline` needs the `WebGPURenderer` of `@tresjs/core/webgpu`.
 */
export function useRenderPipeline(main?: RenderPipelineCallback, setup?: RenderPipelineCallback): UseRenderPipelineReturn {
  const { ctx, store } = useTslStore()

  if (!isWebGPURenderer(ctx.renderer.instance)) {
    throw new Error('useRenderPipeline needs a WebGPURenderer. Use the TresCanvas from @tresjs/core/webgpu (or a renderer factory that returns a WebGPURenderer).')
  }

  const state = getPipelineState(store)

  const result: UseRenderPipelineReturn = {
    renderPipeline: state.renderPipeline,
    passes: createLiveView(store.passes, undefined, {}),
    isReady: computed(() => state.renderPipeline.value !== null),
    rebuild: () => configure(ctx, store, state, true),
    reset: () => free(state, store),
    clearPasses: () => store.passes.clear(),
  }

  if (!main) { return result }

  const owner: PipelineOwner = { main, setup, session: shallowRef() }
  if (isDev && state.owners.length > 0) {
    logWarning('useRenderPipeline: another component already configures the render pipeline of this canvas. The latest one renders; mount one configuring component at a time.')
  }
  state.owners.push(owner)

  watch([ctx.scene, ctx.camera.activeCamera], () => {
    if (activeOwner(state) === owner) { configure(ctx, store, state) }
  }, { immediate: true })

  watchTslSession(store, owner.session, () => {
    if (activeOwner(state) === owner) { runCallbacks(ctx, store, state, owner) }
  })

  onScopeDispose(() => {
    const wasActive = activeOwner(state) === owner
    state.owners = state.owners.filter(o => o !== owner)
    if (!wasActive) { return }
    if (state.owners.length > 0) {
      configure(ctx, store, state, true)
    }
    else {
      free(state, store)
    }
  })

  return result
}
