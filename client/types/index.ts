import type { BufferGeometry, Material, Scene, WebGLRenderer } from 'three'

export interface SceneGraphObject {
  name: string
  type: string
  icon: string
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
  scale?: {
    x: number
    y: number
    z: number
  }
  color?: string
  intensity?: number
  material?: Material
  geometry?: BufferGeometry
  children: SceneGraphObject[]
  [key: string]: any
}

export interface MemoryUsageData {
  currentMem: number
  averageMem: number
  allocatedMem: number
  maxMemory: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

export interface FpsData {
  value: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

// Define the structure of the performance data
export interface PerfData {
  fps: FpsData
  memory: MemoryUsageData // Adjust 'any' to a more specific type as needed
  gl: WebGLRenderer | undefined
  scene: Scene | undefined
}

export interface ProgramObject {
  type: string
  name: string
  id: number
  vertexShader: string
  fragmentShader: string
  uniforms: Record<string, unknown>
  attributes: Record<string, unknown>
  program: WebGLProgram
  usedTimes: number
}
