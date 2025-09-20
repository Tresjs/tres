import type { Scene, WebGLRenderer } from 'three'

export interface SceneGraphObject {
  key: string
  name: string
  label: string
  type: string
  icon: string
  defaultExpanded: boolean
  memorySize: number
  children: SceneGraphObject[]
  onSelect: () => void
  value?: unknown
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
  getUniforms: () => Record<string, unknown>
  getAttributes: () => Record<string, unknown>
  usedTimes: number
  program: WebGLProgram
  uniforms: Record<string, { value: unknown }>
  attributes: Record<string, { value: unknown }>
  isProgram: true
}

/**
 * Node type for the property inspector graph.
 */
export interface InspectorNode {
  /** Property key or array index */
  label: string
  /** Type of the value (string, number, object, array, boolean, null, undefined) */
  type: string
  /** Primitive value or summary for objects/arrays */
  value?: string | number | boolean | null
  /** Full path to this property (e.g., "position.x", "scale.y", "rotation.z") */
  path: string
  /** Whether this node should be expanded by default */
  defaultExpanded?: boolean
  /** Children nodes for objects/arrays */
  children?: InspectorNode[]
}
