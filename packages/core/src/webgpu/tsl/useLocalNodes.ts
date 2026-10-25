import type { ShallowRef, WatchSource } from 'vue'
import { markRaw, onScopeDispose, shallowRef, watch } from 'vue'
import { logWarning } from '../../utils/logger'
import type { TslCreatorState } from './context'
import { createCreatorState, useTslStore } from './context'
import type { TslSession } from './store'
import { watchTslSession } from './store'

/** Puts the built nodes onto objects (`scene.fogNode = ...`). What it returns undoes that. */
export type LocalNodesInstall = () => (() => void) | void

export type LocalNodesRefs<T extends Record<string, unknown>> = { [K in keyof T]: ShallowRef<T[K]> }

export type LocalNodesSources = WatchSource | readonly WatchSource[]

const isDev = process.env.NODE_ENV !== 'production'

const REBUILD_WARNING_COUNT = 10
const REBUILD_WARNING_WINDOW_MS = 1000

/**
 * Builds a component's own TSL graph from the shared uniforms and nodes. The graph is not registered in the store.
 *
 * The creator runs untracked: reading a prop in it does not rebuild the graph. It rebuilds only when
 * a declared source changes, when a store entry it read is replaced, removed or appears, or on `rebuild*`.
 * Values that change belong in a uniform; declare a source only for an input that decides the graph's structure.
 *
 * Return a record to get a record of `shallowRef`s, or return an install function to put the nodes onto objects.
 *
 * @example
 * ```ts
 * const { colorNode } = useLocalNodes(({ uniforms, nodes }) => ({
 *   colorNode: nodes.wobbleFn.mul(uniforms.uStrength),
 * }))
 *
 * useLocalNodes(({ scene, uniforms }) => {
 *   const fogNode = fog(uniforms.fogColor, rangeFogFactor(uniforms.near, uniforms.far))
 *   return () => {
 *     scene.fogNode = fogNode
 *     return () => { scene.fogNode = null }
 *   }
 * })
 * ```
 */
export function useLocalNodes(creator: (state: TslCreatorState) => LocalNodesInstall, sources?: LocalNodesSources): void
export function useLocalNodes<T extends Record<string, unknown>>(creator: (state: TslCreatorState) => T, sources?: LocalNodesSources): LocalNodesRefs<T>
export function useLocalNodes(creator: (state: TslCreatorState) => Record<string, unknown> | LocalNodesInstall, sources?: LocalNodesSources) {
  const { ctx, store } = useTslStore()
  const refs: Record<string, ShallowRef<unknown>> = {}
  const session = shallowRef<TslSession>()
  let cleanup: (() => void) | void
  let isInstallForm = false

  const rebuilds: number[] = []
  let warnedRebuilds = false
  const warnOnFrequentRebuilds = () => {
    if (!isDev || warnedRebuilds) { return }
    const now = performance.now()
    rebuilds.push(now)
    while (rebuilds.length && now - rebuilds[0] > REBUILD_WARNING_WINDOW_MS) { rebuilds.shift() }
    if (rebuilds.length > REBUILD_WARNING_COUNT) {
      warnedRebuilds = true
      logWarning(`useLocalNodes: the graph rebuilt ${rebuilds.length} times in one second, and every rebuild recompiles the materials that use it. Move the input that changes into a uniform (useUniforms) instead of a source.`)
    }
  }

  const build = () => {
    const next = store.createSession({ label: 'useLocalNodes creator' })
    try {
      const result = creator(createCreatorState(ctx, next.stores))

      if (typeof result === 'function') {
        isInstallForm = true
        cleanup?.()
        cleanup = result()
      }
      else if (result && typeof result === 'object') {
        for (const [name, value] of Object.entries(result)) {
          const raw = (typeof value === 'object' && value !== null) || typeof value === 'function' ? markRaw(value) : value
          if (refs[name]) { refs[name].value = raw }
          else { refs[name] = shallowRef(raw) }
        }
      }
      else if (isDev) {
        logWarning('useLocalNodes: the creator returned nothing. Return a record of nodes, or an install function that puts them onto an object.')
      }
    }
    finally {
      next.close()
    }
    session.value = next
  }

  const rebuild = () => {
    warnOnFrequentRebuilds()
    build()
  }

  build()

  if (sources) {
    watch(sources as WatchSource[], rebuild)
  }

  watchTslSession(store, session, rebuild)

  onScopeDispose(() => {
    cleanup?.()
    cleanup = undefined
  })

  return isInstallForm ? undefined : refs
}
