export const TERRAIN_SIZE = 240
export const HEIGHT_SCALE = 32
export const HEIGHTFIELD_ROWS = 256

// vegetation
export const CHUNK_GRID = 6
export const GRASS_DENSITY = 9
export const CLUTTER_DENSITY = 0.25
export const GRASS_FADE = { start: 70, end: 75 }
export const CLUTTER_FADE = { start: 70, end: 100 }
export const MIN_GRASS_NORMAL_Y = 0.7
export const MIN_CLUTTER_NORMAL_Y = 0.8

// the heightfield stops at ±TERRAIN_SIZE / 2, so hold the footman a stride inside the edge
export const WALK_BOUNDS = TERRAIN_SIZE / 2 - 4

// spawn: the footman drops in at ground level and the camera frames him from behind,
// so the first frame already looks across the terrain instead of panning down after a fall
export const SPAWN = { x: 60, z: 60 }
export const SPAWN_CLEARANCE = 0.05
export const CAMERA_OFFSET = { x: 3.1, y: 4, z: 7.4 }
export const CAMERA_CLEARANCE = 2.5
