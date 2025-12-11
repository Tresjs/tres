import type { Euler, Texture, Vector3 } from 'three'

export interface DecalJsonEntry {
  id: string
  position: number[]
  orientation: number[]
  size: number[]
  map: string
  zIndex: number
}

export interface DecalData {
  id?: string
  position: Vector3
  orientation: Euler
  size: Vector3
  map?: Texture | null
  zIndex?: number
  object?: any
  point?: Vector3
  face?: any
}

export interface DecalProps {
  debug?: boolean
  depthTest?: boolean
  map?: Texture | Texture[] | null
  mesh?: any
  polygonOffsetFactor?: number
  position?: number[]
  orientation?: number[]
  size?: number[]
  normal?: number[]
  order?: number
  data?: DecalJsonEntry[]
}
