import type { Mesh, Scene } from 'three'
import { Color } from 'three'
import type { TresObject } from '../types'
import { bytesToKB, calculateMemoryUsage } from '../utils/perf'
import { isLight } from '../utils/is'
import type { SceneGraphObject } from './types'
import { isRef } from 'vue'
import type { TresContext } from '../composables/useTresContextProvider'
import { INSPECTOR_ID } from './plugin'
import { createHighlightMesh } from '../utils'
import { getObjectByUuid } from '../utils/three'

/**
 * Creates a node representation of a Three.js object for the inspector tree
 * @param object - The Three.js object to create a node for
 * @returns A SceneGraphObject representing the Three.js object with relevant metadata
 */
export const createNode = (object: TresObject): SceneGraphObject => {
  const node: SceneGraphObject = {
    id: `scene-${object.uuid}`,
    label: object.type,
    children: [],
    tags: [],
  }
  if (object.name !== '') {
    node.tags.push({
      label: object.name,
      textColor: 0x57BF65,
      backgroundColor: 0xF0FCF3,
    })
  }
  const memory = calculateMemoryUsage(object)
  if (memory > 0) {
    node.tags.push({
      label: `${bytesToKB(memory)} KB`,
      textColor: 0xEFAC35,
      backgroundColor: 0xFFF9DC,
      tooltip: 'Memory usage',
    })
  }

  if (object.type.includes('Light')) {
    if (isLight(object)) {
      node.tags.push({
        label: `${object.intensity}`,
        textColor: 0x9499A6,
        backgroundColor: 0xF8F9FA,
        tooltip: 'Intensity',
      })
    }
    node.tags.push({
      label: `#${new Color(object.color).getHexString()}`,
      textColor: 0x9499A6,
      backgroundColor: 0xF8F9FA,
      tooltip: 'Color',
    })
  }

  if (object.type.includes('Camera')) {
    node.tags.push({
      label: `${object.fov}°`,
      textColor: 0x9499A6,
      backgroundColor: 0xF8F9FA,
      tooltip: 'Field of view',
    })
    node.tags.push({

      label: `x: ${Math.round(object.position.x)} y: ${Math.round(object.position.y)} z: ${Math.round(object.position.z)}`,
      textColor: 0x9499A6,
      backgroundColor: 0xF8F9FA,
      tooltip: 'Position',
    })
  }
  return node
}

/**
 * Creates a context node for the inspector tree
 * @param key - The key identifier for the context node
 * @param uuid - The unique identifier for the context
 * @param parentKey - Optional parent key for nested context nodes
 * @returns A SceneGraphObject representing the context node
 */
export function createContextNode(key: string, uuid: string, parentKey = ''): SceneGraphObject {
  const chainedKey = parentKey ? `${parentKey}.${key}` : key
  return {
    id: `context-${uuid}-${chainedKey}`,
    label: key,
    children: [],
    tags: [],
  }
}

/**
 * Recursively builds a graph representation of Three.js objects for the inspector
 * @param object - The root Three.js object to build the graph from
 * @param node - The current node in the graph being built
 * @param filter - Optional filter string to filter objects by type or name
 */
export function buildGraph(object: TresObject, node: SceneGraphObject, filter: string = '') {
  object.children.forEach((child: TresObject) => {
    if (child.type === 'HightlightMesh') { return }
    if (filter && !child.type.includes(filter) && !child.name.includes(filter)) { return }

    const childNode = createNode(child)
    node.children.push(childNode)
    buildGraph(child, childNode, filter)
  })
}

/**
 * Recursively builds a graph representation of context objects for the inspector
 * @param object - The root object to build the context graph from
 * @param node - The current node in the graph being built
 * @param visited - WeakSet to track visited objects and prevent circular references
 * @param depth - Current depth in the object tree
 * @param maxDepth - Maximum depth to traverse
 * @param contextUuid - Optional UUID for the context
 * @param parentKey - Optional parent key for nested objects
 */
export function buildContextGraph(
  object: any,
  node: SceneGraphObject,
  visited = new WeakSet(),
  depth = 0,
  maxDepth = 4,
  contextUuid?: string,
  parentKey = '',
) {
  // Prevent infinite recursion
  if (depth >= maxDepth || !object || visited.has(object)) {
    return
  }

  // Generate UUID only on the first call (for TresContext)
  const uuid = depth === 0 ? (object?.scene?.value?.uuid || Math.random().toString(36).slice(2, 11)) : contextUuid

  visited.add(object)

  Object.entries(object).forEach(([key, value]) => {
    // Skip internal Vue properties and functions
    if (key.startsWith('_') || typeof value === 'function') {
      return
    }

    const chainedKey = parentKey ? `${parentKey}.${key}` : key
    const childNode = createContextNode(key, uuid!, parentKey)

    if (key === 'scene') {
      return
    }

    // Handle Vue refs
    if (isRef(value)) {
      childNode.tags.push({
        label: `Ref<${typeof value.value}>`,
        textColor: 0x42B883,
        backgroundColor: 0xF0FCF3,
      })
      // If ref value is an object, continue recursion with its value
      if (value.value && typeof value.value === 'object') {
        buildContextGraph(value.value, childNode, visited, depth + 1, maxDepth, uuid, chainedKey)
      }
      else {
        // For primitive ref values, show them in the label
        childNode.label = `${key}: ${JSON.stringify(value.value)}`
      }
    }
    // Handle regular objects (but avoid circular references)
    else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Check if object has enumerable properties
      const hasProperties = Object.keys(value).length > 0
      if (hasProperties) {
        if (visited.has(value)) {
          childNode.tags.push({
            label: 'Circular',
            textColor: 0xFF0000,
            backgroundColor: 0xFFF0F0,
          })
        }
        else {
          buildContextGraph(value, childNode, visited, depth + 1, maxDepth, uuid, chainedKey)
        }
      }
      else {
        childNode.label = `${key}: {}`
      }
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      childNode.label = `${key}: Array(${value.length})`
      childNode.tags.push({
        label: `length: ${value.length}`,
        textColor: 0x9499A6,
        backgroundColor: 0xF8F9FA,
      })
    }
    // Handle primitive values
    else {
      childNode.label = `${key}: ${JSON.stringify(value)}`
    }

    node.children.push(childNode)
  })
}

/**
 * Handler for inspector tree updates
 * @param tres - The TresContext instance
 * @returns A function that handles inspector tree payload updates
 */
export const inspectorTreeHandler = (tres: TresContext) => (payload: any) => {
  if (payload.inspectorId === INSPECTOR_ID) {
    // Scene Graph
    const root = createNode(tres.scene.value as unknown as TresObject)
    buildGraph(tres.scene.value as unknown as TresObject, root, payload.filter)

    // Context Graph
    const rootContext = {
      id: 'context-root',
      label: 'Context',
      children: [],
      tags: [],
    }
    buildContextGraph(tres, rootContext)
    payload.rootNodes = [root, rootContext]
  }
}

/**
 * Handler for inspector state updates
 * @param tres - The TresContext instance
 * @param options - Options for the handler
 * @param options.highlightMesh - The currently highlighted mesh
 * @param options.prevInstance - The previously selected instance
 * @returns A function that handles inspector state payload updates
 */
export const inspectorStateHandler = (tres: TresContext, { highlightMesh, prevInstance }: { highlightMesh: Mesh | null, prevInstance: TresObject | null }) => (payload: any) => {
  if (payload.inspectorId === INSPECTOR_ID) {
    if (payload.nodeId.includes('scene')) {
      // Extract UUID from scene-uuid format
      const match = payload.nodeId.match(/^scene-(.+)$/)
      const uuid = match ? match[1] : null
      if (!uuid) { return }

      const [instance] = tres.scene.value.getObjectsByProperty('uuid', uuid) as TresObject[]
      if (!instance) { return }

      if (prevInstance && highlightMesh && highlightMesh.parent) {
        prevInstance.remove(highlightMesh)
      }

      if (instance.isMesh) {
        const newHighlightMesh = createHighlightMesh(instance)
        instance.add(newHighlightMesh)

        highlightMesh = newHighlightMesh
        prevInstance = instance
      }

      payload.state = {
        object: Object.entries(instance)
          .map(([key, value]) => {
            if (key === 'children') {
              return { key, value: value.filter((child: { type: string }) => child.type !== 'HightlightMesh') }
            }
            return { key, value, editable: true }
          })
          .filter(({ key }) => {
            return key !== 'parent'
          }),
      }

      if (instance.isScene) {
        const sceneState = {
          ...payload.state,
          state: [
            {
              key: 'Scene Info',
              value: {
                objects: instance.children.length,
                memory: calculateMemoryUsage(instance),
                calls: tres.renderer.instance.info.render.calls,
                triangles: tres.renderer.instance.info.render.triangles,
                points: tres.renderer.instance.info.render.points,
                lines: tres.renderer.instance.info.render.lines,
              },
            },
          ],
        }

        if ('programs' in tres.renderer.instance.info) {
          sceneState.state.push({
            key: 'Programs',
            value: tres.renderer.instance.info.programs?.map(program => ({
              ...program,
              programName: program.name,
            })),
          })
        }
        payload.state = sceneState
      }
    }
    else if (payload.nodeId.includes('context')) {
      // Format is: context-uuid-chainedKey
      // Use regex to match: 'context-' followed by UUID (which may contain dashes) followed by '-' and the chainedKey
      const match = payload.nodeId.match(/^context-([^-]+(?:-[^-]+)*)-(.+)$/)
      const chainedKey = match ? match[2] : 'context'

      if (!chainedKey || chainedKey === 'context') {
        // Root context node
        payload.state = {
          object: Object.entries(tres)
            .filter(([key]) => !key.startsWith('_') && key !== 'parent')
            .map(([key, value]) => ({
              key,
              value: isRef(value) ? value.value : value,
              editable: false,
            })),
        }
        return
      }

      // Traverse the object path
      const parts = chainedKey.split('.')
      let value = tres as Record<string, any>
      for (const part of parts) {
        if (!value || typeof value !== 'object') { break }
        value = isRef(value[part]) ? value[part].value : value[part]
      }

      if (value !== undefined) {
        payload.state = {
          object: Object.entries(value)
            .filter(([key]) => !key.startsWith('_') && key !== 'parent')
            .map(([key, val]) => {
              if (isRef(val)) {
                return {
                  key,
                  value: val.value,
                  editable: false,
                }
              }
              if (typeof val === 'function') {
                return {
                  key,
                  value: 'ƒ()',
                  editable: false,
                }
              }
              if (val && typeof val === 'object') {
                return {
                  key,
                  value: Array.isArray(val) ? `Array(${val.length})` : 'Object',
                  editable: false,
                }
              }
              return {
                key,
                value: val,
                editable: false,
              }
            }),
        }
      }
    }
  }
}

const editSceneObject = (scene: Scene, objectUuid: string, propertyPath: string[], value: any) => {
  // Find the target object
  const targetObject = getObjectByUuid(scene, objectUuid)
  if (!targetObject) {
    console.warn('Object with UUID not found in the scene.')
    return
  }

  // Traverse the property path to get to the desired property
  let currentProperty: any = targetObject
  for (let i = 0; i < propertyPath.length - 1; i++) {
    if (currentProperty[propertyPath[i]] !== undefined) {
      currentProperty = currentProperty[propertyPath[i]]
    }
    else {
      console.warn(`Property path is not valid: ${propertyPath.join('.')}`)
      return
    }
  }

  // Set the new value
  const lastProperty = propertyPath[propertyPath.length - 1]
  if (currentProperty[lastProperty] !== undefined) {
    currentProperty[lastProperty] = value
  }
  else {
    console.warn(`Property path is not valid: ${propertyPath.join('.')}`)
  }
}

/**
 * Handler for inspector state edits
 * @param tres - The TresContext instance
 * @returns A function that handles inspector state edit payload updates
 */
export const inspectorEditStateHandler = (tres: TresContext) => (payload: any) => {
  if (payload.inspectorId === INSPECTOR_ID) {
    if (payload.nodeId.includes('scene')) {
      // Extract UUID from scene-uuid format
      const match = payload.nodeId.match(/^scene-(.+)$/)
      const uuid = match ? match[1] : null
      if (!uuid) { return }

      // Handle scene object editing
      editSceneObject(tres.scene.value, uuid, payload.path, payload.state.value)
    }
  }
}
