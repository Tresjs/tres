import type {
  App as DevtoolsApp,
} from '@vue/devtools-api'
import {
  setupDevtoolsPlugin,
} from '@vue/devtools-api'
import { reactive } from 'vue'
import { Color, type Mesh } from 'three'
import { createHighlightMesh, editSceneObject } from '../utils'
import * as is from '../utils/is'
import { bytesToKB, calculateMemoryUsage } from '../utils/perf'
import type { TresContext } from '../composables'
import type { TresObject } from './../types'
import { toastMessage } from './utils'

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

const createNode = (object: TresObject): SceneGraphObject => {
  const node: SceneGraphObject = {
    id: object.uuid,
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
    if (is.light(object)) {
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
  /* if (object.position) {
    node.tags.push({
      label: `x: ${object.position.x} y: ${object.position.y} z: ${object.position.z}`,
      textColor: 0x9499A6,
      backgroundColor: 0xF8F9FA,
      tooltip: 'Position',
    })
  } */
  return node
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

const componentStateTypes: string[] = []
const INSPECTOR_ID = 'tres:inspector'

const state = reactive({
  sceneGraph: null as SceneGraphObject | null,
})
export function registerTresDevtools(app: DevtoolsApp, tres: TresContext) {
  setupDevtoolsPlugin(
    {
      id: 'dev.esm.tres',
      label: 'TresJS 🪐',
      logo: 'https://raw.githubusercontent.com/Tresjs/tres/main/public/favicon.svg',
      packageName: 'tresjs',
      homepage: 'https://tresjs.org',
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
          // Your logic here
          const root = createNode(tres.scene.value as unknown as TresObject)
          buildGraph(tres.scene.value as unknown as TresObject, root, payload.filter)
          state.sceneGraph = root
          payload.rootNodes = [root]
        }
      })
      let highlightMesh: Mesh | null = null
      let prevInstance: TresObject | null = null

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId === INSPECTOR_ID) {
          // Your logic here
          const [instance] = tres.scene.value.getObjectsByProperty('uuid', payload.nodeId) as TresObject[]
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
                  return { key, value: value.filter(child => child.type !== 'HightlightMesh') }
                }
                return { key, value, editable: true }
              })
              .filter(({ key }) => {
                return key !== 'parent'
              }),
          }

          if (instance.isScene) {
            payload.state.info = {
              memory: calculateMemoryUsage(instance),
              objects: instance.children.length,
              calls: tres.renderer.value.info.render.calls,
              triangles: tres.renderer.value.info.render.triangles,
              points: tres.renderer.value.info.render.points,
              lines: tres.renderer.value.info.render.lines,
            }
            payload.state.programs = tres.renderer.value.info.programs?.map(program => ({
              key: program.name,
              value: {
                ...program,
                vertexShader: program.vertexShader,
                attributes: program.getAttributes(),
                uniforms: program.getUniforms(),
              },
            })) || []
          }
        }
      })

      api.on.editInspectorState((payload) => {
        if (payload.inspectorId === INSPECTOR_ID) {
          editSceneObject(tres.scene.value, payload.nodeId, payload.path, payload.state.value)
        }
      })
    },
  )
}
