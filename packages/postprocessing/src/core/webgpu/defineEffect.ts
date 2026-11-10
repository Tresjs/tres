import { logWarning, normalizeColor, useTres } from '@tresjs/core/webgpu'
import type { UniformNodeOf } from '@tresjs/core/webgpu'
import type { Vector2, Vector3, Vector4 } from 'three'
import { Color } from 'three'
import { uniform } from 'three/tsl'
import type { Node, UniformNode } from 'three/webgpu'
import type { DefineComponent, PropType } from 'vue'
import { defineComponent, getCurrentInstance, inject, markRaw, onUnmounted, watch } from 'vue'
import type { ComposedEffect, EffectCreateState } from './context'
import { effectComposerInjectionKey } from './context'

export type EffectPropDefault = number | boolean | string | Color | Vector2 | Vector3 | Vector4

/** A prop value: a color prop also takes a CSS color or hex number, a vector prop also takes a tuple. */
export type EffectPropValue<V>
  = V extends boolean ? boolean
    : V extends number ? number
      : V extends string | Color ? Color | string | number
        : V extends Vector4 ? Vector4 | [number, number, number, number]
          : V extends Vector3 ? Vector3 | [number, number, number]
            : V extends Vector2 ? Vector2 | [number, number]
              : V

/** Booleans become `0`/`1` float uniforms, because WGSL does not allow `bool` in a uniform buffer. */
export type EffectUniformOf<V> = V extends boolean ? UniformNode<'float', number> : UniformNodeOf<V>

export type EffectUniforms<P extends Record<string, EffectPropDefault>> = { [K in keyof P]: EffectUniformOf<P[K]> }

export type EffectProps<P extends Record<string, EffectPropDefault>> = { [K in keyof P]?: EffectPropValue<P[K]> }

export interface EffectDefinition<P extends Record<string, EffectPropDefault>> {
  /** The component name, also used in warnings. */
  name: string
  /** Prop defaults. Each prop is backed by a uniform. */
  props?: P
  /**
   * Returns the output node for `input`. Runs again only when effects are added, removed or reordered,
   * or the scene or camera changes. Prop changes write the uniforms and do not call it.
   */
  create: (input: Node, state: EffectCreateState<EffectUniforms<P>>) => Node
}

export type EffectComponent<P extends Record<string, EffectPropDefault>> = DefineComponent<EffectProps<P>>

const toUniformValue = (value: unknown) => {
  if (typeof value === 'boolean') { return value ? 1 : 0 }
  if (typeof value === 'string') { return normalizeColor(value) }
  const object = value as { clone?: () => unknown } | null
  // A clone, so writing to one instance's uniform never changes the shared default.
  return typeof object?.clone === 'function' ? object.clone() : value
}

// three only warns on an unknown color string and keeps the color, so a NaN color shows the parse failed.
const isColorString = (value: string) => !Number.isNaN(new Color(Number.NaN, Number.NaN, Number.NaN).setStyle(value).r)

const isColorInput = (value: unknown) =>
  (value as { isColor?: boolean } | null)?.isColor === true
  || (typeof value === 'number' && Number.isFinite(value))
  || (Array.isArray(value) && value.length === 3 && value.every(Number.isFinite))
  || (typeof value === 'string' && isColorString(value))

// Returns `false` when `value` does not fit the uniform: the compiled shader expects the type of the default.
const writeUniform = (node: UniformNode<any, any>, value: unknown): boolean => {
  const current = node.value as { isColor?: boolean, fromArray?: (array: unknown[]) => unknown, copy?: (other: unknown) => unknown } | number
  if (typeof current === 'number') {
    if (typeof value !== 'number' && typeof value !== 'boolean') { return false }
    node.value = toUniformValue(value)
  }
  else if (current?.isColor) {
    if (!isColorInput(value)) { return false }
    current.copy!(normalizeColor(value as Parameters<typeof normalizeColor>[0]))
  }
  else if (Array.isArray(value) && typeof current?.fromArray === 'function') {
    current.fromArray(value)
  }
  else if (typeof current?.copy === 'function' && current.constructor === (value as object | null)?.constructor) {
    current.copy(value)
  }
  else {
    return false
  }
  return true
}

const runtimeType = (value: unknown) => {
  if (typeof value === 'boolean') { return Boolean }
  if (typeof value === 'number') { return Number }
  return null
}

/**
 * Defines a WebGPU effect component for the `EffectComposer` of `@tresjs/post-processing/webgpu`.
 *
 * @example
 * ```ts
 * export const ChromaticAberration = defineEffect({
 *   name: 'ChromaticAberration',
 *   props: { strength: 1, scale: 1.1 },
 *   create: (input, { uniforms }) => chromaticAberration(input, uniforms.strength, vec2(0.5, 0.5), uniforms.scale),
 * })
 * ```
 */
export function defineEffect<P extends Record<string, EffectPropDefault> = Record<never, never>>(definition: EffectDefinition<P>): EffectComponent<P> {
  const defaults = (definition.props ?? {}) as Record<string, EffectPropDefault>
  const props = Object.fromEntries(Object.keys(defaults).map(key => [
    key,
    // A primitive default is required: Vue casts an absent `Boolean` prop to `false`.
    { type: runtimeType(defaults[key]) as PropType<unknown>, default: typeof defaults[key] === 'object' ? undefined : defaults[key] },
  ]))

  return defineComponent({
    name: definition.name,
    props,
    setup(props, { expose }) {
      const composer = inject(effectComposerInjectionKey, null)
      const { invalidate } = useTres()

      const uniforms: Record<string, UniformNode<any, any>> = {}
      for (const [key, value] of Object.entries(defaults)) {
        uniforms[key] = uniform(toUniformValue(value) as any)
        const write = (value: unknown) => {
          if (writeUniform(uniforms[key], value ?? defaults[key])) { return }
          logWarning(`${definition.name}: the prop "${key}" does not match the type of its default. The uniform keeps its value.`)
        }
        if (props[key] != null) { write(props[key]) }
        watch(() => props[key], (next) => {
          write(next)
          invalidate()
        })
      }

      expose({ uniforms })

      if (!composer) {
        logWarning(`${definition.name} must be a child of the EffectComposer from @tresjs/post-processing/webgpu.`)
        return () => null
      }

      const effect: ComposedEffect = markRaw({
        instance: getCurrentInstance()!,
        create: definition.create,
        uniforms,
      })
      composer.add(effect)
      onUnmounted(() => composer.remove(effect))

      return () => null
    },
  }) as unknown as EffectComponent<P>
}
