import type { ColorRepresentation, PlaneGeometry, Side, Vector3 } from 'three'
import { BackSide } from 'three'

// Imports `three` only: the root entry reaches this file.

export interface GridMaterialType {
  /** Cell size, default: 0.5 */
  cellSize?: number
  /** Cell thickness, default: 0.5 */
  cellThickness?: number
  /** Cell color, default: black */
  cellColor?: ColorRepresentation
  /** Section size, default: 1 */
  sectionSize?: number
  /** Section thickness, default: 1 */
  sectionThickness?: number
  /** Section color, default: #0000ff */
  sectionColor?: ColorRepresentation
  /** Follow camera, default: false */
  followCamera?: boolean
  /** Display the grid infinitely, default: false */
  infiniteGrid?: boolean
  /** Fade distance, default: 100 */
  fadeDistance?: number
  /** Fade strength, default: 1 */
  fadeStrength?: number
  /** Fade from camera (1) or origin (0), or somewhere in between, default: camera */
  fadeFrom?: number
  /** Material side, default: THREE.BackSide */
  side?: Side
}

export type GridProps = GridMaterialType & {
  /** Default plane-geometry arguments */
  args?: ConstructorParameters<typeof PlaneGeometry>
}

export const gridDefaults = {
  cellColor: '#000000',
  sectionColor: '#0000ff',
  cellSize: 0.5,
  sectionSize: 1,
  followCamera: false,
  infiniteGrid: false,
  fadeDistance: 100,
  fadeStrength: 1,
  fadeFrom: 1,
  cellThickness: 0.5,
  sectionThickness: 1,
  side: BackSide,
} satisfies GridMaterialType

/** The accessors both grid materials expose, so `useGrid` works with either one. */
export interface GridMaterialUniforms extends Required<Omit<GridMaterialType, 'side'>> {
  /** Camera position projected onto the grid plane */
  readonly worldCamProjPosition: Vector3
  /** World position of the grid origin */
  readonly worldPlanePosition: Vector3
}
