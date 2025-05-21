import type { TresContext } from '../composables'
import type { TresObject } from './../types'
import {
  setupDevtoolsPlugin,
} from '@vue/devtools-api'
import { Color, type Mesh } from 'three'
import { isRef, reactive } from 'vue'
import { createHighlightMesh, editSceneObject } from '../utils'
import { bytesToKB, calculateMemoryUsage } from '../utils/perf'
import { toastMessage } from './utils'

import { isLight } from '../utils/is'
import { setupTresDevtools } from './setupDevtools'

export interface Tags {
  label: string
  textColor: number
  backgroundColor: number
  tooltip?: string
}

export interface SceneGraphObject {
  id: string
  label: string
  children: SceneGraphObject[]
  tags: Tags[]
}

const componentStateTypes: string[] = []
const INSPECTOR_ID = 'tres:inspector'

const state = reactive({
  sceneGraph: null as SceneGraphObject | null,
})

const createNode = (object: TresObject): SceneGraphObject => {
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

function createContextNode(key: string, uuid: string, parentKey = ''): SceneGraphObject {
  const chainedKey = parentKey ? `${parentKey}.${key}` : key
  return {
    id: `context-${uuid}-${chainedKey}`,
    label: key,
    children: [],
    tags: [],
  }
}

function buildGraph(object: TresObject, node: SceneGraphObject, filter: string = '') {
  object.children.forEach((child: TresObject) => {
    if (child.type === 'HightlightMesh') { return }
    if (filter && !child.type.includes(filter) && !child.name.includes(filter)) { return }

    const childNode = createNode(child)
    node.children.push(childNode)
    buildGraph(child, childNode, filter)
  })
}

function buildContextGraph(
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
  const uuid = depth === 0 ? (object.uuid || Math.random().toString(36).slice(2, 11)) : contextUuid

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

export function registerTresDevtools(app: any, tres: TresContext) {
  setupTresDevtools(tres)
  setupDevtoolsPlugin(
    {
      id: 'dev.esm.tres',
      label: 'TresJS 🪐',
      logo: 'https://raw.githubusercontent.com/Tresjs/tres/main/public/favicon.svg',
      packageName: 'tresjs',
      homepage: 'https://docs.tresjs.org',
      componentStateTypes,
      app,
    },
    (api) => {
      if (typeof api.now !== 'function') {
        toastMessage(
          'You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.',
        )
      }

      api.addInspector({
        id: INSPECTOR_ID,
        label: 'TresJS 🪐',
        icon: 'account_tree',
        treeFilterPlaceholder: 'Search instances',
      })

      setInterval(() => {
        api.sendInspectorTree(INSPECTOR_ID)
      }, 1000)

      setInterval(() => {
        api.notifyComponentUpdate()
      }, 5000)

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId === INSPECTOR_ID) {
          // Scene Graph
          const root = createNode(tres.scene.value as unknown as TresObject)
          buildGraph(tres.scene.value as unknown as TresObject, root, payload.filter)
          state.sceneGraph = root
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
      })
      let highlightMesh: Mesh | null = null
      let prevInstance: TresObject | null = null

      api.on.getInspectorState((payload) => {
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
              payload.state = {
                ...payload.state,
                state: [
                  {
                    key: 'Scene Info',
                    value: {
                      objects: instance.children.length,
                      memory: calculateMemoryUsage(instance),
                      calls: tres.renderer.instance.value.info.render.calls,
                      triangles: tres.renderer.instance.value.info.render.triangles,
                      points: tres.renderer.instance.value.info.render.points,
                      lines: tres.renderer.instance.value.info.render.lines,
                    },
                  },
                  {
                    key: 'Programs',
                    value: tres.renderer.instance.value.info.programs?.map(program => ({
                      ...program,
                      programName: program.name,
                    })) || [],
                  },
                ],
              }
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
      })

      api.on.editInspectorState((payload) => {
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
      })
    },
  )
}
