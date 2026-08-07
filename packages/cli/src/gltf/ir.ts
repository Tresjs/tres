/**
 * Serialisable description of a parsed glTF, sitting between the loader and any
 * emitter. Everything here is JSON-safe on purpose: `tres gltf --json` dumps it
 * verbatim, and the vite plugin will pass it across a worker boundary.
 *
 * The IR describes structure and naming facts only. Presentation choices —
 * rounding, group pruning, slot filtering — belong to the emitter.
 */

export interface IRKey {
  /** Usable as `nodes.Foo`; otherwise the emitter must write `nodes['Foo']`. */
  isVarName: boolean
}

export interface IRNodeEntry extends IRKey {
  type: string
}

export interface IRMaterialEntry extends IRKey {
  /** three class name, e.g. `MeshStandardMaterial`. */
  type: string
}

export type Vector3Tuple = [number, number, number]

export interface IRTransform {
  position?: Vector3Tuple
  /** Euler angles in radians, XYZ order. */
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export interface IRNode {
  /** Key into `nodes`, exactly as the loader named it: sanitized and uniquified. */
  name: string
  /** The authored name, present only when the loader had to change it. */
  originalName?: string
  /** three class name. */
  type: string
  /** Element name in a Tres template, e.g. `TresMesh`. */
  tag: string
  /** Only the channels that differ from identity. Values are raw; rounding is the emitter's call. */
  transform?: IRTransform
  /** Key into `materials`, for meshes. */
  material?: string
  /** True when the object owns a geometry, i.e. the emitter must bind one. */
  geometry?: true
  /** True when the mesh has morph targets, which need their own two props. */
  morphTargets?: true
  /** glTF `extras`, minus the name the loader stashes there. */
  userData?: Record<string, unknown>
  children: IRNode[]
}

/**
 * Every mesh that shares one geometry+material pair, in traversal order. Singletons are
 * included: `--instanceall` batches them too, and deciding which buckets are worth
 * collapsing is the emitter's call, not a fact about the model.
 */
export interface IRInstanceBucket {
  material: string
  nodes: string[]
}

export interface IRWarning {
  type: 'name-collision'
  message: string
  /** The name the node ended up with. */
  name: string
  /** The name it asked for, already taken by an earlier node. */
  originalName: string
}

export interface GLTFIR {
  root: IRNode
  /** Every named object, keyed the way `buildGraph` keys `nodes` at runtime. */
  nodes: Record<string, IRNodeEntry>
  /** Every material, keyed the way `buildGraph` keys `materials` at runtime. */
  materials: Record<string, IRMaterialEntry>
  animations: string[]
  /**
   * Names of the nodes the clips' tracks target. A mixer resolves a track against a node
   * name in the rendered tree, so these are the names the emitter cannot drop.
   */
  animated: string[]
  /** Whether the runtime loader must enable the draco decoder. */
  draco: boolean
  instances: IRInstanceBucket[]
  warnings: IRWarning[]
}
