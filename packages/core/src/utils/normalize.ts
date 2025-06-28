import type { ColorRepresentation } from 'three'
import { Color, Vector3 } from 'three'

export type SizeFlexibleParams =
  | number[]
  | {
    width: number
    height: number
  }

export interface Vector2PropInterface {
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface Vector3PropInterface extends Vector2PropInterface {
  z?: number
}

export type VectorFlexibleParams = Vector3 | number[] | Vector3PropInterface | number

export function normalizeVectorFlexibleParam(value: VectorFlexibleParams): Array<number> {
  if (typeof value === 'number') {
    return [value, value, value]
  }
  if (value instanceof Vector3) {
    return [value.x, value.y, value.z]
  }
  return value as Array<number>
}

export function normalizeColor(value: Color | Array<number> | string | number | ColorRepresentation) {
  if (value instanceof Color) {
    return value
  }
  if (Array.isArray(value)) {
    return new Color(...value)
  }
  return new Color(value as ColorRepresentation)
}
