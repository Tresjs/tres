import { Color } from 'three'
import type { TresColor, VectorFlexibleParams } from '@tresjs/core'
import { normalizeColor, normalizeVectorFlexibleParam } from '@tresjs/core'

export type Gradient<T> = T | T[] | NormalizedGradient<T>
export type NormalizedGradient<T> = [number, T][]
export type GradientTresColor = Gradient<TresColor>
export type GradientScalar = Gradient<number>
export type GradientVectorFlexibleParams = Gradient<VectorFlexibleParams>

export function normalizeColorGradient(
  gradient: GradientTresColor,
): NormalizedGradient<Color> {
  return normalizeGradient<TresColor, Color>(gradient, {
    normalizeValue: (input: TresColor) => normalizeColor(input),
    getDefaultValue: () => new Color(0, 0, 0),
    isSingleValue: (t: typeof gradient) => !Array.isArray(t),
    isMultipleValues: (t: typeof gradient) =>
      Array.isArray(t) && (t.length === 0 || !Array.isArray(t[0])),
    isMultipleValuesWithStops: (t: typeof gradient) =>
      Array.isArray(t) && t.length > 0 && Array.isArray(t[0]),
    isEmpty: (t: typeof gradient) => Array.isArray(t) && t.length === 0,
  })
}

function isVectorFlexibleParams(p: any) {
  return (
    'isVector3' in p
    || (Array.isArray(p) && p.length > 0 && p.every(v => typeof v === 'number'))
  )
}

export function normalizeFlexibleVector3Gradient(
  gradient: GradientVectorFlexibleParams,
) {
  return normalizeGradient<VectorFlexibleParams, Array<number>>(gradient, {
    normalizeValue: (input: VectorFlexibleParams) =>
      normalizeVectorFlexibleParam(input),
    getDefaultValue: () => [0, 0, 0],
    isSingleValue: (t: typeof gradient) => isVectorFlexibleParams(t),
    isMultipleValues: (t: typeof gradient) =>
      Array.isArray(t) && t.length > 0 && isVectorFlexibleParams(t[0]),
    isMultipleValuesWithStops: (t: typeof gradient) =>
      Array.isArray(t)
      && t.length > 0
      && Array.isArray(t[0])
      && t[0].length === 2
      && isVectorFlexibleParams(t[0][1]),
    isEmpty: (t: typeof gradient) => Array.isArray(t) && t.length === 0,
  })
}
export function normalizeScalarGradient(
  gradient: GradientScalar,
): NormalizedGradient<number> {
  return normalizeGradient<number, number>(gradient, {
    normalizeValue: (input: number) => input,
    getDefaultValue: () => 1,
    isSingleValue: (t: typeof gradient) =>
      !Array.isArray(t) && typeof t !== 'undefined',
    isMultipleValues: (t: typeof gradient) =>
      Array.isArray(t) && (t.length === 0 || !Array.isArray(t[0])),
    isMultipleValuesWithStops: (t: typeof gradient) =>
      Array.isArray(t) && t.length > 0 && Array.isArray(t[0]),
    isEmpty: (t: typeof gradient) => Array.isArray(t) && t.length === 0,
  })
}

interface NormalizeConfig<U, T> {
  normalizeValue: (t: T) => U
  getDefaultValue: () => U
  isSingleValue: (t: Gradient<T>) => boolean
  isMultipleValues: (t: Gradient<T>) => boolean
  isMultipleValuesWithStops: (t: Gradient<T>) => boolean
  isEmpty: (t: Gradient<T>) => boolean
}

function normalizeGradient<T, U>(
  gradient: Gradient<T>,
  config: NormalizeConfig<U, T>,
): NormalizedGradient<U> {
  const { normalizeValue, getDefaultValue, isEmpty } = config
  const isSingleValue = (t: Gradient<T>): t is T => config.isSingleValue(t)
  const isMultipleValues = (t: Gradient<T>): t is T[] =>
    config.isMultipleValues(t)
  const isMultipleValuesWithStops = (t: Gradient<T>): t is Array<[number, T]> =>
    config.isMultipleValuesWithStops(t)

  if (isEmpty(gradient)) {
    return [[0, getDefaultValue()]]
  }
  else if (isSingleValue(gradient)) {
    return [[0, normalizeValue(gradient as T)]]
  }
  else if (isMultipleValues(gradient)) {
    const step = gradient.length > 1 ? 1 / (gradient.length - 1) : 1
    return gradient.map((input, i) => [step * i, normalizeValue(input)])
  }
  else if (isMultipleValuesWithStops(gradient)) {
    return gradient.map(([u, v], _) => [u, normalizeValue(v)])
  }

  return [[0, getDefaultValue()]]
}
