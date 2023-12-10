import type { TresContext, TresObject } from '@tresjs/core'
import type { Scene, WebGLRenderer } from 'three'
import type { SceneGraphObject } from '../types'

interface FPSState {
  value: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

interface MemoryState {
  currentMem: number
  averageMem: number
  maxMemory: number
  allocatedMem: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

interface RendererState {
  info: {
    render: {
      frame: number
      calls: number
      triangles: number
      points: number
      lines: number
    }
    memory: {
      geometries: number
      textures: number
    }
    programs: WebGLProgram[]
  }
}

interface DevtoolsHookReturn {
  scene: {
    objects: number
    graph: Record<string, unknown>
    value: Scene | undefined
  }
  fps: FPSState
  memory: MemoryState
  renderer: RendererState
}

const scene = reactive<{
  objects: number
  graph: Record<string, unknown>
  value: Scene | undefined
}>({
  objects: 0,
  graph: {},
  value: undefined,
})

const gl = {
  fps: reactive<FPSState>({
    value: 0,
    accumulator: [],
    lastLoggedTime: Date.now(),
    logInterval: 1000,
  }),
  memory: reactive<MemoryState>({
    currentMem: 0,
    averageMem: 0,
    maxMemory: 0,
    allocatedMem: 0,
    accumulator: [],
    lastLoggedTime: Date.now(),
    logInterval: 1000,
  }),
  renderer: reactive<RendererState>({
    info: {
      render: {
        frame: 0,
        calls: 0,
        triangles: 0,
        points: 0,
        lines: 0,
      },
      memory: {
        geometries: 0,
        textures: 0,
      },
      programs: [],
    },
  }),
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
  const node: SceneGraphObject = {
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

function getSceneGraph(scene: TresObject) {
  
  function buildGraph(object: TresObject, node: SceneGraphObject) {
    object.children.forEach((child: TresObject) => {
      const childNode = createNode(child)
      node.children.push(childNode)
      buildGraph(child, childNode)
    })
  }

  const root = createNode(scene)
  buildGraph(scene, root)

  return root
}

function countObjectsInScene(scene: Scene) {
  let count = 0

  scene.traverse((object) => {
    // Check if the object is a 3D object
    if (object.isObject3D) {
      count++
    }
  })

  return count
}

export function useDevtoolsHook(): DevtoolsHookReturn {
  // Connect with Core
  const tresGlobalHook = {
    cb(context: TresContext) {
      scene.value = context.scene.value
      scene.objects = countObjectsInScene(context.scene.value)
      Object.assign(gl.renderer.info.render, context.renderer.value.info.render)
      Object.assign(gl.renderer.info.memory, context.renderer.value.info.memory)
      gl.renderer.info.programs = [...context.renderer.value.info.programs as WebGLProgram[]]
      Object.assign(gl.fps, context.perf.fps)
      gl.fps.accumulator = [...context.perf.fps.accumulator]
      Object.assign(gl.memory, context.perf.memory)
      gl.memory.accumulator = [...context.perf.memory.accumulator]
      scene.graph = getSceneGraph(context.scene.value as unknown as TresObject)
      /* 
      console.log('Devtools hook updated', context.renderer.value.info.render.triangles) */
    },
  }

  window.parent.parent.__TRES__DEVTOOLS__ = tresGlobalHook

  return {
    scene,
    fps: gl.fps,
    memory: gl.memory,
    renderer: gl.renderer,
  }
}