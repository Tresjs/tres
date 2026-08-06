import type { Material, Mesh, Object3D } from 'three'
import type { GLTFIR, IRInstanceBucket, IRMaterialEntry, IRNode, IRNodeEntry, IRTransform, IRWarning, Vector3Tuple } from './ir'
import type { LoadedGLTF } from './load'
import { PropertyBinding } from 'three'

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

  const transform = toTransform(object)
  if (transform) {
    node.transform = transform
  }

  const [material] = materialsOf(object)
  if (material?.name) {
    node.material = material.name
  }

  const mesh = object as Mesh
  if (mesh.geometry) {
    node.geometry = true
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

export function buildIR({ scene, animations, draco }: LoadedGLTF): GLTFIR {
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

  return {
    root: toNode(scene),
    nodes,
    materials,
    animations: animations.map(clip => clip.name),
    draco,
    instances: toInstanceBuckets(scene),
    warnings,
  }
}
