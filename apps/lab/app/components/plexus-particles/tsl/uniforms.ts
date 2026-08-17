import { uniform, vec3 } from 'three/tsl'

// Fixed particle pool. 2^13 = 8192 — matches the reference.
export const NB_PARTICLES = 2 ** 13
// Particles emitted per frame. Baked into the spawn compute dispatch count
// (see plexus.ts). The nbToSpawn uniform below drives spawn interpolation and
// the spawnIndex advance; changing it does not change the dispatch count.
export const SPAWN_COUNT = 5

export const timeScale = uniform(1.0)
export const particleLifetime = uniform(0.5)
export const particleSize = uniform(1.0)
export const linksWidth = uniform(0.005)

export const colorOffset = uniform(0.0)
export const colorVariance = uniform(2.0)
export const colorRotationSpeed = uniform(1.0)

export const spawnIndex = uniform(0)
export const nbToSpawn = uniform(SPAWN_COUNT)
export const spawnPosition = uniform(vec3(0.0))
export const previousSpawnPosition = uniform(vec3(0.0))

export const turbFrequency = uniform(0.5)
export const turbAmplitude = uniform(0.5)
export const turbOctaves = uniform(2)
export const turbLacunarity = uniform(2.0)
export const turbGain = uniform(0.5)
export const turbFriction = uniform(0.01)
