import { isVector2, isVector3 } from '.'

export interface Vector3Prop { x: number, y: number, z: number }
export interface Vector2Prop { x: number, y: number }
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

export type VectorFlexibleParams = Vector3Prop | number[] | Vector3PropInterface | number

export function normalizeVectorFlexibleParam(value: VectorFlexibleParams): Array<number> {
  if (typeof value === 'number') {
    return [value, value, value]
  }
  if (isVector3(value as Vector3Prop)) {
    const { x, y, z } = value as Vector3Prop
    return [x, y, z]
  }
  if (isVector2(value as Vector2Prop)) {
    const { x, y } = value as Vector2Prop
    return [x, y]
  }
  return value as Array<number>
}
