import type { ComputedRef } from 'vue'
import { computed, nextTick, reactive, ref, toRefs } from 'vue'
import type { DevtoolsContextPayload, DevtoolsPerformancePayload, DevtoolsEvent, TresObject } from '@tresjs/core'
import type { Mesh, Object3D } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'
import { editSceneObject } from '@tresjs/core'
import type { GraphObject } from '../types'
import { HightlightMesh } from '../utils/highlightedMesh'

interface DevtoolsState {
  connected: boolean
  scene: Object3D
  selectedObject: Object3D | null
  prevInstance: Object3D | null
  highlightMesh: Mesh | null
  invalidate: (frames?: number) => void
}
interface DevtoolsHookReturn {
  state: DevtoolsState
  graph: ComputedRef<GraphObject>
  highlightObject: (object: TresObject) => void
  unhighlightObject: () => void
  selectObject: (object: TresObject) => void
  editSceneObjectByPath: (path: string, value: any) => void
}

const state = reactive<DevtoolsState>({
  connected: false,
  scene: {} as Object3D,
  selectedObject: null as Object3D | null,
  prevInstance: null as Object3D | null,
  highlightMesh: null as Mesh | null,
  invalidate: () => {},
})

function handlePerformanceEvent(payload: DevtoolsPerformancePayload) {

}

function handleContextEvent(payload: DevtoolsContextPayload) {
  payload.scene.traverse((children) => {
    if (payload.scene.__vnode) delete children.__vnode
    delete children.userData.tres__context
    delete children.userData.tres__root
  })
  const { _vnode, ...rest } = payload.scene
  state.scene = { 
    ...rest, 
    getObjectByProperty: payload.scene.getObjectByProperty, 
    traverse: payload.scene.traverse, 
  }
  if (state.selectedObject) {
    selectObject(state.selectedObject)
  }

  // On-demand rendering
  state.invalidate = payload.invalidate
}

const icons: Record<string, string> = {
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
}

function createNode(object: TresObject) {
  const node: GraphObject = {
    uuid: object.uuid,
    name: object.name,
    type: object.type,
    icon: icons[object.type.toLowerCase()] || 'i-carbon-cube',
    position: {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
    },
    rotation: {
      x: object.rotation.x,
      y: object.rotation.y,
      z: object.rotation.z,
    },
    children: [],
  }

  if (object.type === 'Mesh') {
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
  }
  return node
}

const graph = computed(() => {
  const traverse = (object: TresObject, node: GraphObject) => {

    object.children.forEach((child) => {
      const childNode = createNode(child)
      if (child.type !== 'HightlightMesh') {
        node.children.push(childNode)
      }
      traverse(child, childNode)
    })
  }
  const root = createNode(state.scene)
  traverse(state.scene, root)

  return root
})

function createHighlightMesh(object: Object3D): Mesh {
  const highlightMaterial = new MeshBasicMaterial({
    color: 0xa7e6d7, // Highlight color
    transparent: true,
    opacity: 0.2,
    depthTest: false, // So the highlight is always visible
    side: DoubleSide, // To e
  })
  // Clone the geometry of the object. You might need a more complex approach 
  // if the object's geometry is not straightforward.
  const highlightMesh = new HightlightMesh(state.invalidate, object.geometry.clone(), highlightMaterial)

  return highlightMesh
}

function highlightObject(object: TresObject) {
  const instance = state.scene.getObjectByProperty('uuid', object.uuid)
  unhighlightObject()
  
  if (instance && instance.isMesh) {
    const newHighlightMesh = createHighlightMesh(instance)
    instance.add(newHighlightMesh)

    state.highlightMesh = newHighlightMesh
    state.prevInstance = instance
  }
}

function unhighlightObject() {
  if (state.prevInstance && state.highlightMesh && state.highlightMesh.parent) {
    state.prevInstance.remove(state.highlightMesh)
  }
}

function selectObject(object: TresObject) {
  const instance = state.scene.getObjectByProperty('uuid', object.uuid)
  state.selectedObject = {}
  state.selectedObject = { ...instance }
}

function editSceneObjectByPath(path: string, value: any) {
  editSceneObject(state.scene, state.selectedObject.uuid, path.split('.'), value)
}

export function useDevtoolsHook(): DevtoolsHookReturn {
  function cb(event: DevtoolsEvent) {
    state.connected = true

    if (event.type === 'performance') {
      handlePerformanceEvent(event.payload)
    }
    else if (event.type === 'context') {
      handleContextEvent(event.payload)
    }

  }
  // Init devtools hook
  const tresGlobalHook = {
    cb,
  }

  if (!window.parent.parent.__TRES__DEVTOOLS__) {
    window.parent.parent.__TRES__DEVTOOLS__ = tresGlobalHook
  }

  return {
    state,
    graph,
    ...toRefs(state),
    highlightObject,
    unhighlightObject,
    selectObject,
    editSceneObjectByPath,
  }
} 