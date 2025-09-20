import type { TresObject } from '@tresjs/core'
import type { SceneGraphObject, InspectorNode } from '../types'
import { calculateMemoryUsage } from './perf'
import { hash } from 'ohash'
import type { Mesh } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'
import { HighlightMesh } from './highlight'

export const iconsMap: Record<string, string> = {
  scene: 'i-carbon-web-services-container',
  perspectivecamera: 'i-carbon-video',
  mesh: 'i-carbon-cube',
  group: 'i-carbon-group-objects',
  ambientlight: 'i-carbon-light',
  directionallight: 'i-carbon-light',
  spotlight: 'i-iconoir-project-curve-3d',
  position: 'i-iconoir-axes',
  rotation: 'i-carbon-rotate-clockwise',
  scale: 'i-iconoir-ellipse-3d-three-points',
  bone: 'i-ph-bone',
  skinnedmesh: 'carbon:3d-print-mesh',
} as const

export function getObjectHash(object: TresObject) {
  return hash(object)
}

function createSceneGraphNode(object: TresObject) {
  const node: SceneGraphObject = {
    name: object.name,
    value: object,
    key: object.uuid,
    label: object.type,
    type: object.type,
    icon: iconsMap[object.type.toLowerCase()] || 'i-carbon-cube',
    defaultExpanded: object.isScene,
    memorySize: Math.round(calculateMemoryUsage(object) / 1024),
    children: [],
  }

  /* if (object.type === 'Mesh') {
    node.material = object.material
    node.geometry = object.geometry
    node.scale = {
      x: object.scale.x,
      y: object.scale.y,
      z: object.scale.z,
    }
  }

  if (object.type.includes('Light')) {
    node.color = object.color.getHexString()
    node.intensity = object.intensity
  } */
  return node
}

export function getSceneGraph(scene: TresObject) {
  function buildGraph(object: TresObject, node: SceneGraphObject) {
    object.children.forEach((child: TresObject) => {
      if (child.type === 'HighlightMesh') {
        return
      }
      const childNode = createSceneGraphNode(child)
      node.children.push(childNode)
      buildGraph(child, childNode)
    })
  }

  const root = createSceneGraphNode(scene)
  buildGraph(scene, root)

  return root
}

// inspectorGraph

/**
 * Recursively builds an inspector graph for any object, including arrays and nested objects.
 * Avoids circular references using a WeakSet.
 * Skips functions and symbols.
 * @param obj The object to inspect
 * @param label The label for the current node
 * @param path The current path to this property
 * @param seen Set of already visited objects to avoid circular refs
 * @returns InspectorNode
 */
export function getInspectorGraph(obj: unknown, label = 'root', path = 'root', seen = new WeakSet()): InspectorNode {
  // Handle primitives and null
  const valueType = typeof obj
  if (obj === null || valueType !== 'object') {
    return {
      label,
      type: valueType,
      path,
      value: obj as string | number | boolean | null,
      defaultExpanded: path === 'root',
    }
  }

  // Avoid circular references
  if (seen.has(obj as object)) {
    return {
      label,
      type: 'circular',
      path,
      value: '[Circular]',
      defaultExpanded: path === 'root',
    }
  }
  seen.add(obj as object)

  // Handle arrays
  if (Array.isArray(obj)) {
    return {
      label,
      type: 'array',
      path,
      value: `Array[${obj.length}]`,
      defaultExpanded: path === 'root',
      children: obj.map((item, idx) => getInspectorGraph(item, String(idx), `${path}[${idx}]`, seen)),
    }
  }

  // Handle objects
  const children: InspectorNode[] = []
  const objectName = (obj as object).constructor?.name || 'Object'

  // Special handling for Three.js Euler objects
  if (objectName === '_Euler') {
    const eulerObj = obj as { x: number, y: number, z: number, order: string }
    const eulerProps = ['x', 'y', 'z', 'order']
    for (const key of eulerProps) {
      const val = eulerObj[key as keyof typeof eulerObj]
      const childPath = path === 'root' ? key : `${path}.${key}`
      children.push(getInspectorGraph(val, key, childPath, seen))
    }
  }
  // Special handling for Three.js Quaternion objects
  else if (objectName === 'Quaternion') {
    const quaternionObj = obj as { x: number, y: number, z: number, w: number }
    const quaternionProps = ['x', 'y', 'z', 'w']
    for (const key of quaternionProps) {
      const val = quaternionObj[key as keyof typeof quaternionObj]
      const childPath = path === 'root' ? key : `${path}.${key}`
      children.push(getInspectorGraph(val, key, childPath, seen))
    }
  }
  // Special handling for Three.js Vector3 objects
  else if (objectName === '_Vector3') {
    const vectorObj = obj as { x: number, y: number, z: number }
    const vectorProps = ['x', 'y', 'z']
    for (const key of vectorProps) {
      const val = vectorObj[key as keyof typeof vectorObj]
      const childPath = path === 'root' ? key : `${path}.${key}`
      children.push(getInspectorGraph(val, key, childPath, seen))
    }
  }
  // Default object handling
  else {
    for (const key of Object.keys(obj as object)) {
      // Skip Vue-specific properties and internal properties
      if (key.startsWith('_') || key.startsWith('$') || key === '__v_isRef' || key === '__v_isReactive' || key === '__v_isShallow' || key === '__v_raw' || key === '__v_isReadonly') {
        continue
      }

      // Skip functions and symbols
      const val = (obj as Record<string, unknown>)[key]
      if (typeof val === 'function') continue
      const childPath = path === 'root' ? key : `${path}.${key}`
      children.push(getInspectorGraph(val, key, childPath, seen))
    }
  }
  return {
    label,
    type: 'object',
    path,
    value: objectName === 'Euler' ? 'Euler' : objectName === 'Quaternion' ? 'Quaternion' : objectName === 'Vector3' ? 'Vector3' : objectName,
    defaultExpanded: path === 'root',
    children,
  }
}

export function createHighlightMesh(object: TresObject): Mesh {
  const highlightMaterial = new MeshBasicMaterial({
    color: 0xA7E6D7, // Highlight color, e.g., yellow
    transparent: true,
    opacity: 0.2,
    depthTest: false, // So the highlight is always visible
    side: DoubleSide, // To e
  })
  // Clone the geometry of the object. You might need a more complex approach
  // if the object's geometry is not straightforward.
  const highlightMesh = new HighlightMesh(object.geometry.clone(), highlightMaterial)

  return highlightMesh
}
