import type { TslCreatorState } from './context'
import { createCreatorState, getCallSite, useTslStore } from './context'
import { createLiveView } from './store'

/** A node read by name. Its type is unknown, so it is typed loosely (TSL accepts it, and an `Fn` can be called). */
export type LooseNode = any

export type NodeCreator<T extends Record<string, unknown>> = (state: TslCreatorState) => T

export interface NodesUtils {
  /** Removes nodes by name from the root or from `scope`. */
  removeNodes: (names: string | string[], scope?: string) => void
  /** Clears a scope, the root nodes (`'root'`) or every node (no argument). */
  clearNodes: (scope?: string) => void
  /** Re-runs the creators of a scope, the root (`'root'`) or all of them. Starts a new generation. */
  rebuildNodes: (scope?: string) => void
}

export type NodesWithUtils<T> = T & NodesUtils

/**
 * Registers shared TSL graphs (functions, noise, varyings) that many components read, or reads them.
 *
 * The creator runs once per generation and the first registration of a name wins. It does not re-run
 * when a value it captured changes: put changing values in a uniform, and change structure with `rebuildNodes`.
 *
 * @example
 * ```ts
 * useNodes(() => ({ wobbleFn: Fn(() => vec3(sin(time), cos(time), 0)) }))
 * useNodes(() => ({ damageFn: Fn(() => ...) }), 'player')
 * const fx = useNodes('player')
 * ```
 */
export function useNodes<T extends Record<string, unknown>>(creator: NodeCreator<T>, scope?: string): NodesWithUtils<T>
export function useNodes<T extends Record<string, unknown> = Record<string, LooseNode>>(scope?: string): NodesWithUtils<T>
export function useNodes(creatorOrScope?: NodeCreator<Record<string, unknown>> | string, maybeScope?: string) {
  const { ctx, store } = useTslStore()
  const utils: NodesUtils = {
    removeNodes: store.nodes.remove,
    clearNodes: store.nodes.clear,
    rebuildNodes: store.nodes.rebuild,
  }

  if (typeof creatorOrScope !== 'function') {
    return createLiveView(store.nodes, creatorOrScope, utils)
  }

  const creator = creatorOrScope
  const scope = maybeScope
  const callSite = getCallSite('nodes')

  store.nodes.register(
    views => creator(createCreatorState(ctx, views)) as Record<string, object>,
    { scope, owner: callSite?.owner, source: callSite?.hmr ? String(creator) : undefined },
  )

  return createLiveView(store.nodes, scope, utils)
}
