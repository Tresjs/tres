/**
 * Serialisable description of a parsed glTF, sitting between the loader and any
 * emitter. Everything here is JSON-safe on purpose: `tres gltf --json` dumps it
 * verbatim, and the vite plugin will pass it across a worker boundary.
 *
 * The IR describes structure and naming facts only. Presentation choices —
 * rounding, group pruning, slot filtering — belong to the emitter.
 */

import type { IRNodePhysics } from './physics'

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
  /**
   * What the node's name declares about collision. A naming fact like any other here, so it
   * is read whatever the flags say; only `--physics` decides whether anything is emitted.
   */
  physics?: IRNodePhysics
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

/**
 * One `--animations` file. The rig-plus-clip-library pipeline keeps the mesh in one file
 * and the clips in others, so a model's clips are not always the model's own.
 */
export interface IRAnimationSource {
  /** The path as it was passed on the command line. The emitter turns it into a url. */
  path: string
  /** Per file: a compressed clip library beside an uncompressed model is normal. */
  draco: boolean
  /** What the file carries, in file order — including clips nothing binds. */
  clips: string[]
  /**
   * The subset whose tracks reach this model. A source with none of these is not worth
   * loading at runtime, so the emitter leaves it out entirely.
   */
  bound: string[]
}

export interface IRNameCollisionWarning {
  type: 'name-collision'
  message: string
  /** The name the node ended up with. */
  name: string
  /** The name it asked for, already taken by an earlier node. */
  originalName: string
}

/** Two files carry a clip of the same name, so only one is reachable through `actions`. */
export interface IRClipCollisionWarning {
  type: 'clip-collision'
  message: string
  /** The clip name both files use. */
  name: string
  /** The file that wins, being the last one merged. */
  source: string
  /** What it shadows: an earlier `--animations` path, or `the model` for the model's own. */
  shadows: string
}

/** A clip whose tracks target node names this model does not have: a bad retarget. */
export interface IRRetargetWarning {
  type: 'retarget-mismatch'
  message: string
  /** The clip name. */
  name: string
  /** The file it came from. */
  source: string
  /** Node names it drives that the model has none of. */
  missing: string[]
  /** True when nothing bound at all, so the clip was left out of `clips`. */
  dropped: boolean
}

/** A skinned model with nothing to play and no `--animations`: the clips are elsewhere. */
export interface IRNoClipsWarning {
  type: 'no-clips'
  message: string
}

export type IRWarning
  = | IRNameCollisionWarning
    | IRClipCollisionWarning
    | IRRetargetWarning
    | IRNoClipsWarning

export interface GLTFIR {
  root: IRNode
  /** Every named object, keyed the way `buildGraph` keys `nodes` at runtime. */
  nodes: Record<string, IRNodeEntry>
  /** Every material, keyed the way `buildGraph` keys `materials` at runtime. */
  materials: Record<string, IRMaterialEntry>
  /** Clip names the model file itself carries. */
  animations: string[]
  /** The `--animations` files, in the order they were passed. */
  animationSources: IRAnimationSource[]
  /**
   * Every clip an emitted `ActionName` can offer: the model's own plus every source's,
   * deduped in merge order, minus the ones no track of which binds to this model.
   */
  clips: string[]
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
