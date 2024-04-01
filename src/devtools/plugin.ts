import { get } from './../utils/index';
import type {
  App as DevtoolsApp } from '@vue/devtools-api'
import {
  setupDevtoolsPlugin,
} from '@vue/devtools-api'
import { reactive } from 'vue'
import type { Mesh, Object3D } from 'three'
import { createHighlightMesh, editSceneObject } from '../utils'
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
    node.tags.push({
      label: `${object.intensity}`,
      textColor: 0x9499A6,
      backgroundColor: 0xF8F9FA,
      tooltip: 'Intensity',
    })
    node.tags.push({
      label: `#${object.color.getHexString()}`,
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
      // eslint-disable-next-line max-len
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

function buildGraph(object: TresObject, node: SceneGraphObject) {
  object.children.forEach((child: TresObject) => {
    if (child.type === 'HightlightMesh') return
    const childNode = createNode(child)
    node.children.push(childNode)
    buildGraph(child, childNode)
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
          // eslint-disable-next-line max-len
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
          const root = createNode(tres.scene.value)
          buildGraph(tres.scene.value, root)
          state.sceneGraph = root
          payload.rootNodes = [root]
          /*  payload.rootNodes = [
            {
              id: 'root',
              label: 'Root ',
              children: [
                {
                  id: 'child',
                  label: `Child ${payload.filter}`,
                  tags: [
                    {
                      label: 'active',
                      textColor: 0x000000,
                      backgroundColor: 0xFF984F,
                    },
                    {
                      label: 'test',
                      textColor: 0xffffff,
                      backgroundColor: 0x000000,
                    },
                  ],
                },
              ],
            },
          ] */
        }
      })
      let highlightMesh: Mesh | null = null
      let prevInstance: Object3D | null = null
      
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId === INSPECTOR_ID) {
          // Your logic here
          const [instance] = tres.scene.value.getObjectsByProperty('uuid', payload.nodeId)
          if (!instance) return 
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
            object: [
              {
                key: 'uuid',
                editable: true,
                value: instance.uuid,
              },
              {
                key: 'name',
                editable: true,
                value: instance.name,
              },
              {
                key: 'type',
                editable: true,
                value: instance.type,
              },
              {
                key: 'position',
                editable: true,
                value: instance.position,
              },
              {
                key: 'rotation',
                editable: true,
                value: instance.rotation,
              },
              {
                key: 'scale',
                editable: true,
                value: instance.scale,
              },
              {
                key: 'geometry',
                value: instance.geometry,
              },
              {
                key: 'material',
                value: instance.material,
              },
              {
                key: 'color',
                editable: true,
                value: instance.color,
              },
              {
                key: 'intensity',
                editable: true,
                value: instance.intensity,
              },
              {
                key: 'castShadow',
                editable: true,
                value: instance.castShadow,
              },
              {
                key: 'receiveShadow',
                editable: true,
                value: instance.receiveShadow,
              },
              {
                key: 'frustumCulled',
                editable: true,
                value: instance.frustumCulled,
              },
              {
                key: 'matrixAutoUpdate',
                editable: true,
                value: instance.matrixAutoUpdate,
              },
              {
                key: 'matrixWorldNeedsUpdate',
                editable: true,
                value: instance.matrixWorldNeedsUpdate,
              },
              {
                key: 'matrixWorld',
                value: instance.matrixWorld,
              },
                
              {
                key: 'visible',
                editable: true,
                value: instance.visible,
              },
            ],
          }

          if(instance.isScene) {
            payload.state.programs = tres.renderer.value.info.programs?.map((program) => {
              return {
                key: program.name || program.type,
                value: {
                  ...program,
                  vertexShader: program.vertexShader,
                  attributes: program.getAttributes(),
                  uniforms: program.getUniforms(),
                },
              }
            })
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