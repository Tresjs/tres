/**
 * Represents a tag that can be displayed in the inspector UI
 * @interface Tags
 */
export interface Tags {
  /** The text to display in the tag */
  label: string
  /** The color of the text in hexadecimal format (e.g., 0xFFFFFF) */
  textColor: number
  /** The background color of the tag in hexadecimal format (e.g., 0x000000) */
  backgroundColor: number
  /** Optional tooltip text to show on hover */
  tooltip?: string
}

/**
 * Represents a node in the scene graph that can be displayed in the inspector
 * @interface SceneGraphObject
 */
export interface SceneGraphObject {
  /** Unique identifier for the node */
  id: string
  /** Display name of the node */
  label: string
  /** Array of child nodes */
  children: SceneGraphObject[]
  /** Array of tags associated with the node */
  tags: Tags[]
}

/**
 * Represents memory usage statistics for Three.js resources
 * @interface MemoryStats
 */
export interface MemoryStats {
  /** Map of geometry names to their memory usage in bytes */
  geometries: Map<string, number>
  /** Map of material names to their memory usage in bytes */
  materials: Map<string, number>
  /** Map of texture names to their memory usage in bytes */
  textures: Map<string, number>
}

/**
 * Represents a property in the inspector state
 * @interface InspectorStateProperty
 */
export interface InspectorStateProperty {
  /** The name of the property */
  key: string
  /** The value of the property */
  value: unknown
  /** Whether the property can be edited in the inspector */
  editable: boolean
}

/**
 * Represents the state of an inspector panel
 * @interface InspectorState
 */
export interface InspectorState {
  /** Array of properties to display in the inspector */
  object: InspectorStateProperty[]
}

/**
 * Represents the internal state of the devtools
 * @interface DevtoolsState
 */
export interface DevtoolsState {
  /** The current scene graph representation */
  sceneGraph: SceneGraphObject | null
  /** Timestamp of the last update */
  lastUpdate: number
  /** Minimum time between updates in milliseconds */
  updateThreshold: number
  /** Current memory usage statistics */
  memoryStats: MemoryStats
}

/**
 * Represents a payload sent to or received from the devtools
 * @interface DevtoolsPayload
 */
export interface DevtoolsPayload {
  /** The ID of the inspector panel */
  inspectorId: string
  /** The ID of the node being inspected */
  nodeId: string
  /** Optional filter string for searching */
  filter?: string
  /** Optional state to update */
  state?: InspectorState
  /** Optional path to the property being edited */
  path?: string[]
}
