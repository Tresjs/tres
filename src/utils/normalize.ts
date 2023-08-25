import { isEuler, isVector3 } from "."

export type Vector3Prop = { x: number, y: number, z: number }
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
    const { x, y, z} = value as Vector3Prop
    return [x, y, z]
  }
  return value as Array<number>
}

