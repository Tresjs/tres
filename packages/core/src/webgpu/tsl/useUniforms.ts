import type { Color, Matrix3, Matrix4 } from 'three'
import { Vector2, Vector3, Vector4 } from 'three'
import { uniform } from 'three/tsl'
import type { InputNode, Node, UniformNode } from 'three/webgpu'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { isReactive, isRef, toRaw, toValue, watch } from 'vue'
import type { TresContext } from '../../composables'
import { normalizeColor } from '../../utils/normalize'
import { getCallSite, useTslStore } from './context'
import type { TslStore } from './store'
import { createLiveView } from './store'

interface VectorLike2 { x: number, y: number }
interface VectorLike3 extends VectorLike2 { z: number }
interface VectorLike4 extends VectorLike3 { w: number }

export type UniformInput
  = | number
    | boolean
    | string
    | Color
    | Vector2
    | Vector3
    | Vector4
    | Matrix3
    | Matrix4
    | VectorLike2
    | VectorLike3
    | VectorLike4
    | Node

export type UniformSource = MaybeRefOrGetter<UniformInput>

/** A uniform read by name: its value type is unknown, so TSL accepts it as any node. */
export type LooseUniformNode = UniformNode<any, any>

type UnwrapSource<S> = S extends Ref<infer V> ? V : S extends () => infer V ? V : S

// `0 extends 1 & V` is true only for `any` (a Leches control is `Ref<any>`). Without it, `any` spreads over every branch.
export type UniformNodeOf<V>
  = 0 extends (1 & V) ? LooseUniformNode
    : V extends number ? UniformNode<'float', number>
      : V extends boolean ? UniformNode<'bool', boolean>
        : V extends string | Color ? UniformNode<'color', Color>
          : V extends Matrix4 ? UniformNode<'mat4', Matrix4>
            : V extends Matrix3 ? UniformNode<'mat3', Matrix3>
              : V extends VectorLike4 ? UniformNode<'vec4', Vector4>
                : V extends VectorLike3 ? UniformNode<'vec3', Vector3>
                  : V extends VectorLike2 ? UniformNode<'vec2', Vector2>
                    : V extends InputNode<infer T, infer Value> ? UniformNode<T, Value>
                      : LooseUniformNode

export type UniformNodesOf<T extends Record<string, UniformSource>> = {
  [K in keyof T]: UniformNodeOf<UnwrapSource<T[K]>>
}

export interface UniformsUtils {
  /** Removes uniforms by name from the root or from `scope`. */
  removeUniforms: (names: string | string[], scope?: string) => void
  /** Clears a scope, the root uniforms (`'root'`) or every uniform (no argument). */
  clearUniforms: (scope?: string) => void
  /** Re-creates the uniforms of a scope, the root (`'root'`) or all of them. Starts a new generation. */
  rebuildUniforms: (scope?: string) => void
}

export type UniformsWithUtils<T> = T & UniformsUtils

const isPlainVector = (value: object): value is VectorLike2 =>
  'x' in value && 'y' in value && !('isVector2' in value || 'isVector3' in value || 'isVector4' in value)

const isNode = (value: unknown): value is Node => (value as Node | undefined)?.isNode === true

export const toUniformValue = (input: UniformInput): unknown => {
  const value = toRaw(input)
  if (typeof value === 'string') {
    return normalizeColor(value)
  }
  if (isNode(value)) {
    return (uniform(value as any) as LooseUniformNode).value
  }
  if (typeof value === 'object' && value !== null && isPlainVector(value)) {
    if ('w' in value) { return new Vector4(value.x, value.y, (value as VectorLike4).z, (value as VectorLike4).w) }
    if ('z' in value) { return new Vector3(value.x, value.y, (value as VectorLike3).z) }
    return new Vector2(value.x, value.y)
  }
  return value
}

const isSameValue = (a: unknown, b: unknown) => {
  if (Object.is(a, b)) { return true }
  const equals = (a as { equals?: (other: unknown) => boolean } | null)?.equals
  return typeof equals === 'function' && a?.constructor === (b as object | null)?.constructor && equals.call(a, b)
}

const snapshot = (value: unknown) => {
  const clone = (value as { clone?: () => unknown } | null)?.clone
  return typeof clone === 'function' ? clone.call(value) : value
}

export const writeUniformValue = (node: LooseUniformNode, value: unknown) => {
  const current = node.value as { copy?: (other: unknown) => unknown } | null
  if (typeof current?.copy === 'function' && current.constructor === (value as object | null)?.constructor) {
    current.copy(value)
  }
  else {
    node.value = value
  }
}

const createUniformNode = (name: string, input: UniformInput, scope: string | undefined) => {
  const node = isNode(input) ? uniform(input as any) : uniform(toUniformValue(input) as any)
  // Names end up in the shader, where two scopes may each have a `uColor`.
  return (node as LooseUniformNode).setName(scope ? `${scope}_${name}`.replace(/\W/g, '_') : name)
}

const isSameKind = (a: unknown, b: unknown) =>
  typeof a === typeof b && (typeof a !== 'object' || (a as object | null)?.constructor === (b as object | null)?.constructor)

function applyOwnerValue(store: TslStore, ctx: TresContext, name: string, input: UniformInput, scope: string | undefined) {
  const existing = store.uniforms.get(name, scope)
  const value = toUniformValue(input)
  if (!existing || isSameValue(existing.value, value)) { return }
  if (isSameKind(existing.value, value)) {
    writeUniformValue(existing, value)
  }
  else {
    // The value changed type (a number became a color): only a new node has the right shader type.
    store.uniforms.set(name, createUniformNode(name, input, scope), scope)
  }
  ctx.renderer.invalidate()
}

const isWatchable = (source: UniformSource) => isRef(source) || typeof source === 'function'

/**
 * Creates (or reuses) uniforms and keeps their values in sync with plain values, refs or getters.
 * A value change writes `uniform.value`: no graph rebuild, no shader recompile.
 *
 * @example
 * ```ts
 * const { uColor, uDensity } = useUniforms({ uColor: colorRef, uDensity: () => props.density }, 'fog')
 * const fog = useUniforms('fog')
 * const all = useUniforms()
 * ```
 */
export function useUniforms<T extends Record<string, UniformSource>>(sources: T, scope?: string): UniformsWithUtils<UniformNodesOf<T>>
export function useUniforms<T extends Record<string, LooseUniformNode> = Record<string, LooseUniformNode>>(scope?: string): UniformsWithUtils<T>
export function useUniforms(sourcesOrScope?: Record<string, UniformSource> | string, maybeScope?: string) {
  const { ctx, store } = useTslStore()
  const utils: UniformsUtils = {
    removeUniforms: store.uniforms.remove,
    clearUniforms: store.uniforms.clear,
    rebuildUniforms: store.uniforms.rebuild,
  }

  if (sourcesOrScope === undefined || typeof sourcesOrScope === 'string') {
    return createLiveView(store.uniforms, sourcesOrScope, utils)
  }

  const sources = sourcesOrScope
  const scope = maybeScope

  // The call that created a uniform owns its value: when it runs again (remount, hot update), its value applies.
  // Another component that reuses the name never resets it.
  const owner = getCallSite('uniforms')?.owner
  const { created } = store.uniforms.register(() => Object.fromEntries(
    Object.entries(sources).map(([name, source]) => [name, createUniformNode(name, toValue(source), scope)]),
  ), { scope, owner })

  for (const [name, source] of Object.entries(sources)) {
    const read = () => toUniformValue(toValue(source))

    if (owner && !created.has(name) && store.uniforms.ownerOf(name, scope) === owner) {
      applyOwnerValue(store, ctx, name, toValue(source), scope)
    }
    const readTracked = () => {
      const value = toValue(source)
      // One level, and only for reactive values: sees `pos.value.x = 1` but never walks a TSL node graph.
      if (isReactive(value)) {
        for (const key in value as object) { void Reflect.get(value as object, key) }
      }
      return toUniformValue(value)
    }

    if (!isWatchable(source)) { continue }

    let last = snapshot(read())
    watch(readTracked, (value) => {
      if (isSameValue(value, last)) { return }
      last = snapshot(value)
      const node = store.uniforms.get(name, scope)
      if (!node) { return }
      writeUniformValue(node, value)
      ctx.renderer.invalidate()
    })
  }

  return createLiveView(store.uniforms, scope, utils)
}

/**
 * Creates (or reuses) one root uniform, or returns an existing one when called with a name only.
 *
 * @throws When called with a name only and the uniform does not exist.
 */
export function useUniform<S extends UniformSource>(name: string, source: S): UniformNodeOf<UnwrapSource<S>>
export function useUniform<N extends LooseUniformNode = LooseUniformNode>(name: string): N
export function useUniform(name: string, source?: UniformSource) {
  if (source === undefined) {
    const { store } = useTslStore()
    const existing = store.uniforms.get(name)
    if (!existing) {
      throw new Error(`useUniform: the uniform "${name}" does not exist. Create it with useUniform("${name}", value) or useUniforms() first.`)
    }
    return existing
  }
  return useUniforms({ [name]: source })[name]
}
