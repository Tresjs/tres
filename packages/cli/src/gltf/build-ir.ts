import type { AnimationClip, Material, Mesh, Object3D } from 'three'
import type { GLTFIR, IRAnimationSource, IRInstanceBucket, IRMaterialEntry, IRNode, IRNodeEntry, IRTransform, IRWarning, Vector3Tuple } from './ir'
import type { LoadedGLTF } from './load'
import { basename } from 'node:path'
import { PropertyBinding } from 'three'
import { parsePhysics } from './physics'

/** Same test gltfjsx uses: can this key be written as `nodes.Foo`? */
const VAR_NAME = /^[$A-Z_][\w$]*$/i

/** Quaternion-to-Euler conversion leaves dust well below this. */
const EPSILON = 1e-6

function isVarName(key: string): boolean {
  return VAR_NAME.test(key)
}

function materialsOf(object: Object3D): Material[] {
  const material = (object as Mesh).material
  if (!material) {
    return []
  }
  return Array.isArray(material) ? material : [material]
}

function channel(values: Vector3Tuple, identity: number): Vector3Tuple | undefined {
  return values.some(value => Math.abs(value - identity) > EPSILON) ? values : undefined
}

function toTransform(object: Object3D): IRTransform | undefined {
  const transform: IRTransform = {}

  const position = channel(object.position.toArray(), 0)
  if (position) {
    transform.position = position
  }
  const rotation = channel([object.rotation.x, object.rotation.y, object.rotation.z], 0)
  if (rotation) {
    transform.rotation = rotation
  }
  const scale = channel(object.scale.toArray(), 1)
  if (scale) {
    transform.scale = scale
  }

  return Object.keys(transform).length > 0 ? transform : undefined
}

/**
 * `RigidBody` derives its colliders from the geometry of its own direct children, so a suffix
 * on a group produces a body with nothing to collide with — and the shape the artist asked for
 * degrades into a bounding box at best. Say so instead, and name the fix.
 */
function noGeometry(object: Object3D): string {
  // glTF has no Group: the loader hands back bare Object3D for every branch node.
  const kind = object.type === 'Object3D' ? 'group' : object.type
  return `a ${kind} carries no geometry for rapier to derive a collider from, and a body reads only `
    + `its own direct children — put the suffix on the meshes inside it instead`
}

function toNode(object: Object3D): IRNode {
  const node: IRNode = {
    name: object.name,
    type: object.type,
    // glTF has no Group, so the loader hands back bare Object3D for every branch node.
    // The two are interchangeable at runtime and TresGroup reads better.
    tag: object.type === 'Object3D' ? 'TresGroup' : `Tres${object.type}`,
    children: object.children.map(toNode),
  }

  // The loader stashes the pre-sanitization name here whenever the glTF node had one.
  const authored = object.userData.name
  if (typeof authored === 'string' && authored !== object.name) {
    node.originalName = authored
  }

  const mesh = object as Mesh
  if (mesh.geometry) {
    node.geometry = true
  }

  // Read off the authored name where there is one: sanitization eats the dot in `-rigid.001`,
  // and the suffix has to be readable either way.
  const physics = parsePhysics(node.originalName ?? object.name)
  if (physics) {
    node.physics = physics.kind === 'collider' && !node.geometry
      ? { kind: 'misread', suffix: physics.suffix, reason: noGeometry(object) }
      : physics
  }

  const transform = toTransform(object)
  if (transform) {
    node.transform = transform
  }

  const [material] = materialsOf(object)
  if (material?.name) {
    node.material = material.name
  }

  if (mesh.morphTargetDictionary) {
    node.morphTargets = true
  }

  const { name: _stashedName, ...userData } = object.userData
  if (Object.keys(userData).length > 0) {
    node.userData = userData
  }

  return node
}

/**
 * A node only lands here when the loader had to append `_N` because an earlier node
 * already claimed the sanitized name. Silent otherwise: `hand.l` → `handl` is a
 * rename, not a clash.
 */
function toCollisionWarning(object: Object3D): IRWarning | undefined {
  const authored = object.userData.name
  if (typeof authored !== 'string') {
    return undefined
  }

  const sanitized = PropertyBinding.sanitizeNodeName(authored)
  if (sanitized === object.name) {
    return undefined
  }

  return {
    type: 'name-collision',
    name: object.name,
    originalName: sanitized,
    message: `"${authored}" sanitizes to "${sanitized}", which is already taken — it is reachable as "${object.name}".`,
  }
}

/**
 * The nodes one clip drives. A track name is `<node>.<property>`, and the mixer resolves that
 * node name against the rendered tree — so a node named here has to keep its name in the
 * output or its track binds to nothing.
 */
function targetsOf(clip: AnimationClip): string[] {
  const names = new Set<string>()

  for (const track of clip.tracks) {
    try {
      const { nodeName } = PropertyBinding.parseTrackName(track.name)
      if (nodeName) {
        names.add(nodeName)
      }
    }
    catch {
      // `parseTrackName` throws on a name it cannot read, which is a name three would
      // never bind either. Nothing to keep, and no reason to fail the whole generate.
    }
  }

  return [...names]
}

function toAnimatedNodes(animations: AnimationClip[]): string[] {
  return [...new Set(animations.flatMap(targetsOf))]
}

function toInstanceBuckets(scene: Object3D): IRInstanceBucket[] {
  const buckets = new Map<string, IRInstanceBucket>()

  scene.traverse((object) => {
    const mesh = object as Mesh
    if (!mesh.isMesh || !mesh.name) {
      return
    }
    const [material] = materialsOf(mesh)
    if (!material?.name) {
      return
    }

    const key = `${mesh.geometry.uuid}|${material.name}`
    const bucket = buckets.get(key) ?? { material: material.name, nodes: [] }
    bucket.nodes.push(mesh.name)
    buckets.set(key, bucket)
  })

  return [...buckets.values()]
}

/** One `--animations` file, already parsed. Only its clips are ever read. */
export interface AnimationSourceInput {
  /** The path as it was passed on the command line. */
  path: string
  gltf: LoadedGLTF
}

/** How a warning refers to the clips that came out of the model file itself. */
const MODEL_LABEL = 'the model'

/**
 * What a warning calls a source. The full path stays on the warning itself for anything
 * reading `--json`; a message that repeats `public/models/animations/Rig_Medium/…` three
 * times is one nobody finishes reading. `MODEL_LABEL` passes through unchanged, having no
 * separator in it.
 */
function label(path: string): string {
  return basename(path)
}

/** Enough of a list to recognise the rig, not the whole skeleton. */
function preview(names: string[], limit = 3): string {
  return names.length > limit
    ? `${names.slice(0, limit).join(', ')} and ${names.length - limit} more`
    : names.join(', ')
}

interface MergedClips {
  sources: IRAnimationSource[]
  clips: string[]
  /** The clip objects behind `clips`, for working out which node names have to survive. */
  playable: AnimationClip[]
  warnings: IRWarning[]
}

/**
 * Merge the model's own clips with every `--animations` file, model first, and check each
 * external clip against the rig it is about to be retargeted onto.
 *
 * A mixer keys `actions` by clip name walking the array, so a later file's clip shadows an
 * earlier one of the same name. That is what merging is for, but the shadowed clip becomes
 * unreachable, which is worth one line. A clip no track of which binds is worse: it is
 * silent at runtime, so it never reaches `ActionName` at all.
 */
function mergeClips(
  own: AnimationClip[],
  inputs: AnimationSourceInput[],
  nodeNames: Set<string>,
): MergedClips {
  const warnings: IRWarning[] = []
  const clips: string[] = []
  const playable: AnimationClip[] = []
  /** Clip name → the file it is currently reachable from. */
  const owner = new Map<string, string>()

  function merge(clip: AnimationClip, source: string): void {
    const shadowed = owner.get(clip.name)
    if (shadowed !== undefined) {
      const winner = label(source)
      warnings.push({
        type: 'clip-collision',
        name: clip.name,
        source,
        shadows: shadowed,
        message: `Both ${label(shadowed)} and ${winner} carry "${clip.name}". ${winner} is merged last, so its clip is the one that plays.`,
      })
    }
    else {
      clips.push(clip.name)
    }

    owner.set(clip.name, source)
    playable.push(clip)
  }

  for (const clip of own) {
    merge(clip, MODEL_LABEL)
  }

  const sources = inputs.map(({ path, gltf }): IRAnimationSource => {
    const bound: string[] = []

    for (const clip of gltf.animations) {
      const targets = targetsOf(clip)
      const missing = targets.filter(target => !nodeNames.has(target))
      const dropped = targets.length > 0 && missing.length === targets.length

      if (missing.length > 0) {
        warnings.push({
          type: 'retarget-mismatch',
          name: clip.name,
          source: path,
          missing,
          dropped,
          message: dropped
            ? `"${clip.name}" in ${label(path)} drives ${preview(missing)}, and this model has no node by any of those names — nothing would play, so it is left out of ActionName.`
            : `"${clip.name}" in ${label(path)} drives ${preview(missing)}, which this model has no node for. Those tracks bind to nothing.`,
        })
      }

      if (!dropped) {
        bound.push(clip.name)
        merge(clip, path)
      }
    }

    return { path, draco: gltf.draco, clips: gltf.animations.map(clip => clip.name), bound }
  })

  return { sources, clips, playable, warnings }
}

export function buildIR(
  { scene, animations, draco }: LoadedGLTF,
  sources: AnimationSourceInput[] = [],
): GLTFIR {
  const nodes: Record<string, IRNodeEntry> = {}
  const materials: Record<string, IRMaterialEntry> = {}
  const warnings: IRWarning[] = []

  scene.traverse((object) => {
    if (object.name) {
      nodes[object.name] = { type: object.type, isVarName: isVarName(object.name) }
    }

    const warning = toCollisionWarning(object)
    if (warning) {
      warnings.push(warning)
    }

    for (const material of materialsOf(object)) {
      if (material.name && !materials[material.name]) {
        materials[material.name] = { type: material.type, isVarName: isVarName(material.name) }
      }
    }
  })

  const merged = mergeClips(animations, sources, new Set(Object.keys(nodes)))
  warnings.push(...merged.warnings)

  // A rig with nothing to play is the case this flag exists for, and nothing else in the
  // output hints that the clips are simply in another file.
  const skinned = Object.values(nodes).some(entry => entry.type === 'SkinnedMesh')
  if (skinned && animations.length === 0 && sources.length === 0) {
    warnings.push({
      type: 'no-clips',
      message: `This model is skinned but carries no animation clips. Pass --animations <path> to wire in clips exported to separate files.`,
    })
  }

  return {
    root: toNode(scene),
    nodes,
    materials,
    animations: animations.map(clip => clip.name),
    animationSources: merged.sources,
    clips: merged.clips,
    animated: toAnimatedNodes(merged.playable),
    draco,
    instances: toInstanceBuckets(scene),
    warnings,
  }
}
