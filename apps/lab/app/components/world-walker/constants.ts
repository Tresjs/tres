export const TERRAIN_SIZE = 240
export const HEIGHT_SCALE = 32
export const HEIGHTFIELD_ROWS = 256
// one sample per heightfield corner: the collider, the visible mesh and every CPU sampler
// share this grid so they all describe the same surface
export const TERRAIN_RESOLUTION = HEIGHTFIELD_ROWS + 1

// vegetation
export const CHUNK_GRID = 6
export const GRASS_DENSITY = 9
export const CLUTTER_DENSITY = 0.25
export const GRASS_FADE = { start: 70, end: 75 }
export const CLUTTER_FADE = { start: 70, end: 100 }
export const MIN_GRASS_NORMAL_Y = 0.7
export const MIN_CLUTTER_NORMAL_Y = 0.8

// vegetation is DoubleSide and the terrain is not, so a camera under the surface sees
// a field of cards floating over invisible ground — dissolve those plants out
export const UNDERGROUND_MARGIN = 1 // how deep the camera sinks before the cull is at full strength
export const UNDER_GROUND_FADE = 0.5 // world units of dissolve band below a plant's ground plane

// lighting, measured off the `dawn` preset HDR (kiara_1_dawn) the Environment loads, so the
// grass shader and the image-based lighting on the terrain describe the same sky. That sun
// sits 4.3 degrees above the horizon and carries under 1% of the ground irradiance — the
// dawn sky is hazy, which is why the ambient term does nearly all the work
export const SUN_DIR = { x: 0.658, y: 0.075, z: 0.749 }
export const SUN_COLOR = 0xFFB585
export const SUN_INTENSITY = 1
export const AMBIENT_COLOR = 0xC8BAFF
export const AMBIENT_INTENSITY = 1.5
// the horizon band of that same HDR: fog now fades into the sky it meets instead of across it
export const FOG_COLOR = 0x755967

// plants render on their own layer so the ContactShadows depth pass skips them — that pass
// swaps in MeshDepthMaterial, which drops the instancing and would pile every plant of a
// chunk onto one quad at the world origin
export const VEGETATION_LAYER = 1

// the heightfield stops at ±TERRAIN_SIZE / 2, so hold the footman a stride inside the edge
export const WALK_BOUNDS = TERRAIN_SIZE / 2 - 4

// spawn: the footman drops in at ground level and the camera frames him from behind,
// so the first frame already looks across the terrain instead of panning down after a fall
export const SPAWN = { x: 60, z: 60 }
export const SPAWN_CLEARANCE = 0.05
export const CAMERA_OFFSET = { x: 3.1, y: 4, z: 7.4 }
export const CAMERA_CLEARANCE = 2.5
