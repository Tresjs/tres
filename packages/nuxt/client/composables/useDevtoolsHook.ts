import type { TresObject, DevtoolsMessage } from '@tresjs/core'
import type { Scene } from 'three'
import type { SceneGraphObject } from '../types'
import { reactive, shallowReactive } from '#imports'
import { createSharedComposable } from '@vueuse/core'
import type { UnwrapNestedRefs } from 'vue'
import { getSceneGraph } from '../utils/graph'

// Define message data types for different message types
export interface ContextMessageData {
  scene: {
    value: Scene
  }
  renderer: {
    instance: {
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
  }
}

export interface PerformanceMessageData {
  fps: FPSState
  memory: MemoryState
}

// Union type for all possible message types
export type DevtoolsMessageData = ContextMessageData | PerformanceMessageData

export interface FPSState {
  value: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

export interface MemoryState {
  currentMem: number
  averageMem: number
  maxMemory: number
  allocatedMem: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

export interface RendererType {
  fps: UnwrapNestedRefs<FPSState>
  memory: UnwrapNestedRefs<MemoryState>
  renderer: UnwrapNestedRefs<RendererState>
}

export interface RendererState {
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

export interface DevtoolsHookReturn {
  scene: {
    objects: number
    graph: SceneGraphObject | null
    value: Scene | undefined
    selected: TresObject | undefined
    /* assets: AssetInfo[] */
  }
  fps: FPSState
  memory: MemoryState
  renderer: RendererState
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

export interface DevtoolsState {
  scene: {
    objects: number
    graph: SceneGraphObject | null
    value: Scene | undefined
    selected: TresObject | undefined
    /* assets: AssetInfo[] */
  }
  fps: FPSState
  memory: MemoryState
  renderer: RendererState
}

function _useDevtoolsHook(): DevtoolsHookReturn {
  const state: DevtoolsState = {
    scene: shallowReactive({
      objects: 0,
      graph: null,
      value: undefined,
      selected: undefined,
      assets: [],
    }),
    fps: shallowReactive({
      value: 0,
      accumulator: [],
      lastLoggedTime: Date.now(),
      logInterval: 1000,
    }),
    memory: shallowReactive({
      currentMem: 0,
      averageMem: 0,
      maxMemory: 0,
      allocatedMem: 0,
      accumulator: [],
      lastLoggedTime: Date.now(),
      logInterval: 1000,
    }),
    renderer: reactive({
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

  let lastSceneUuid: string | null = null

  // Initialize DevtoolsMessenger if not exists
  if (typeof window !== 'undefined' && window.parent.parent.__TRES__DEVTOOLS__) {
    // Subscribe to different message types
    window.parent.parent.__TRES__DEVTOOLS__.subscribe((message: DevtoolsMessage<DevtoolsMessageData>) => {
      /* if (message.type === 'asset-load') {
        const messageData = message.data as AssetLoadData
        const formattedAsset = formatAsset(messageData)
        state.scene.assets.push(formattedAsset)
      } */

      if (message.type === 'context') {
        const context = message.data as ContextMessageData
        if (context.scene.value.children.length > 0) {
          // Use scene UUID for lightweight change detection
          const currentSceneUuid = context.scene.value.uuid
          if (currentSceneUuid !== lastSceneUuid) {
            state.scene.value = context.scene.value
            state.scene.objects = countObjectsInScene(context.scene.value)
            state.scene.graph = getSceneGraph(context.scene.value as unknown as TresObject)
            lastSceneUuid = currentSceneUuid
          }
        }
        else {
          state.scene.value = undefined
          state.scene.graph = null
          /* state.scene.assets = [] */
          lastSceneUuid = null
        }

        // Update renderer info from context
        if (context.renderer?.instance?.info) {
          Object.assign(state.renderer.info.render, context.renderer.instance.info.render)
          Object.assign(state.renderer.info.memory, context.renderer.instance.info.memory)
          state.renderer.info.programs = [...(context.renderer.instance.info.programs || [])]
        }
      }
      else if (message.type === 'performance') {
        const performance = message.data as PerformanceMessageData
        Object.assign(state.fps, performance.fps)
        state.fps.accumulator = [...performance.fps.accumulator]
        Object.assign(state.memory, performance.memory)
        state.memory.accumulator = [...performance.memory.accumulator]
      }
    })
  }

  return state
}

export const useDevtoolsHook = createSharedComposable(_useDevtoolsHook)
