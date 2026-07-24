import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import {
  BufferAttribute,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Sphere,
  Vector3,
} from 'three'
import type { HeightSampler } from './heightmap'
import { CHUNK_GRID, TERRAIN_SIZE } from './constants'

const CELL_SIZE = 2.5
const HALF = TERRAIN_SIZE / 2

// the one quad every plant instances: x is the horizontal corner, y is 0 at the root and 1 at the tip
const QUAD_CORNERS = [-0.5, 0, 0, 0.5, 0, 0, -0.5, 1, 0, 0.5, 1, 0]
const QUAD_INDICES = [0, 1, 2, 2, 1, 3]

// billboards expand and sway in the vertex shader, so pad the culling sphere past the roots
const SWAY_MARGIN = 0.5

const tintNoise = createNoise2D(alea('world-walker-tint'))

// atlas quadrants (2x2), inset to avoid mip bleeding between variations
const GRASS_REGIONS = [
  { u0: 0.01, v0: 0.51, u1: 0.49, v1: 0.99, weight: 0.85 },
  { u0: 0.51, v0: 0.51, u1: 0.99, v1: 0.99, weight: 0.15 },
]
const BUSH_REGIONS = [
  { u0: 0.01, v0: 0.01, u1: 0.49, v1: 0.49, weight: 0.6 },
  { u0: 0.51, v0: 0.01, u1: 0.99, v1: 0.49, weight: 0.4 },
]

type Region = (typeof GRASS_REGIONS)[number]

interface LayerOptions {
  seed: string
  regions: Region[]
  density: number
  baseWidth: number
  baseHeight: number
  minNormalY: number
  stiffnessMin: number
  stiffnessMax: number
}

export interface VegetationChunk {
  geometry: InstancedBufferGeometry
  center: Vector3
  radius: number
}

// scratch vector for the chunk bounds, reused across every plant
const tmp = new Vector3()

function pickRegion(regions: Region[], rand: () => number) {
  const r = rand()
  let acc = 0
  for (const region of regions) {
    acc += region.weight
    if (r <= acc) return region
  }
  return regions[regions.length - 1]!
}

const HEALTHY_TINT = [1.0, 1.0, 1.0]
const DRY_TINT = [1.05, 0.9, 0.55]

// one instance per plant: the quad itself lives in the shared base geometry, everything
// that used to be duplicated across the four corners is now a per-instance attribute
function buildChunkGeometry(
  sampler: HeightSampler,
  options: LayerOptions,
  originX: number,
  originZ: number,
  chunkSize: number,
): VegetationChunk | null {
  const { seed, regions, density, baseWidth, baseHeight, minNormalY, stiffnessMin, stiffnessMax } = options
  const rand = alea(`${seed}:${originX}:${originZ}`)

  const roots: number[] = []
  const normals: number[] = []
  const tints: number[] = []
  const data: number[] = []
  const uvRects: number[] = []

  const cells = Math.round(chunkSize / CELL_SIZE)
  const plantsPerCell = Math.max(1, Math.round(density * CELL_SIZE * CELL_SIZE))

  const min = new Vector3(Infinity, Infinity, Infinity)
  const max = new Vector3(-Infinity, -Infinity, -Infinity)
  let maxExtent = 0

  for (let cx = 0; cx < cells; cx++) {
    for (let cz = 0; cz < cells; cz++) {
      for (let p = 0; p < plantsPerCell; p++) {
        const x = originX + cx * CELL_SIZE + rand() * CELL_SIZE
        const z = originZ + cz * CELL_SIZE + rand() * CELL_SIZE
        const normal = sampler.normalAt(x, z)
        if (normal.y < minNormalY) continue

        const y = sampler.heightAt(x, z)

        const t = tintNoise(x * 0.03, z * 0.03) * 0.5 + 0.5
        const brightness = 0.9 + rand() * 0.2

        const region = pickRegion(regions, rand)
        const flip = rand() > 0.5

        const width = baseWidth * (0.8 + rand() * 0.4)
        const height = baseHeight * (0.8 + rand() * 0.4)
        const stiffness = stiffnessMin + rand() * (stiffnessMax - stiffnessMin)
        const phase = rand() * Math.PI * 2

        roots.push(x, y, z)
        normals.push(normal.x, normal.y, normal.z)
        tints.push(
          (HEALTHY_TINT[0]! + (DRY_TINT[0]! - HEALTHY_TINT[0]!) * t) * brightness,
          (HEALTHY_TINT[1]! + (DRY_TINT[1]! - HEALTHY_TINT[1]!) * t) * brightness,
          (HEALTHY_TINT[2]! + (DRY_TINT[2]! - HEALTHY_TINT[2]!) * t) * brightness,
        )
        data.push(width, height, stiffness, phase)
        // the horizontal flip is baked in by swapping the atlas u bounds
        uvRects.push(flip ? region.u1 : region.u0, flip ? region.u0 : region.u1, region.v0, region.v1)

        min.min(tmp.set(x, y, z))
        max.max(tmp)
        maxExtent = Math.max(maxExtent, width * 0.5, height)
      }
    }
  }

  const count = roots.length / 3
  if (!count) return null

  const geometry = new InstancedBufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(QUAD_CORNERS), 3))
  geometry.setIndex(QUAD_INDICES)
  geometry.setAttribute('iRoot', new InstancedBufferAttribute(new Float32Array(roots), 3))
  geometry.setAttribute('iNormal', new InstancedBufferAttribute(new Float32Array(normals), 3))
  geometry.setAttribute('iTint', new InstancedBufferAttribute(new Float32Array(tints), 3))
  geometry.setAttribute('iData', new InstancedBufferAttribute(new Float32Array(data), 4))
  geometry.setAttribute('iUvRect', new InstancedBufferAttribute(new Float32Array(uvRects), 4))
  geometry.instanceCount = count

  // three derives the bounding sphere from `position` alone, which here is just the unit quad —
  // so build it from the roots and pad it by the billboard extent the vertex shader adds
  const center = min.clone().add(max).multiplyScalar(0.5)
  const radius = max.distanceTo(min) * 0.5 + maxExtent + SWAY_MARGIN
  geometry.boundingSphere = new Sphere(center, radius)

  return { geometry, center, radius }
}

export function buildLayerChunks(sampler: HeightSampler, options: LayerOptions): VegetationChunk[] {
  const chunkSize = TERRAIN_SIZE / CHUNK_GRID
  const chunks: VegetationChunk[] = []

  for (let gx = 0; gx < CHUNK_GRID; gx++) {
    for (let gz = 0; gz < CHUNK_GRID; gz++) {
      const originX = -HALF + gx * chunkSize
      const originZ = -HALF + gz * chunkSize
      const chunk = buildChunkGeometry(sampler, options, originX, originZ, chunkSize)
      if (chunk) chunks.push(chunk)
    }
  }

  return chunks
}

export function buildGrassChunks(sampler: HeightSampler, density: number, minNormalY: number) {
  return buildLayerChunks(sampler, {
    seed: 'world-walker-grass',
    regions: GRASS_REGIONS,
    density,
    baseWidth: 0.9,
    baseHeight: 0.8,
    minNormalY,
    stiffnessMin: 0.15,
    stiffnessMax: 1,
  })
}

export function buildClutterChunks(sampler: HeightSampler, density: number, minNormalY: number) {
  return buildLayerChunks(sampler, {
    seed: 'world-walker-clutter',
    regions: BUSH_REGIONS,
    density,
    baseWidth: 2,
    baseHeight: 1.8,
    minNormalY,
    stiffnessMin: 0.05,
    stiffnessMax: 0.2,
  })
}
