import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import type { Vector3 } from 'three'
import { BufferAttribute, BufferGeometry } from 'three'
import type { HeightSampler } from './heightmap'
import { CHUNK_GRID, TERRAIN_SIZE } from './constants'

const CELL_SIZE = 2.5
const HALF = TERRAIN_SIZE / 2

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
  geometry: BufferGeometry
  center: Vector3
  radius: number
}

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

function buildChunkGeometry(
  sampler: HeightSampler,
  options: LayerOptions,
  originX: number,
  originZ: number,
  chunkSize: number,
) {
  const { seed, regions, density, baseWidth, baseHeight, minNormalY, stiffnessMin, stiffnessMax } = options
  const rand = alea(`${seed}:${originX}:${originZ}`)

  const positions: number[] = []
  const corners: number[] = []
  const uvs: number[] = []
  const normals: number[] = []
  const tints: number[] = []
  const data: number[] = []
  const indices: number[] = []

  const cells = Math.round(chunkSize / CELL_SIZE)
  const plantsPerCell = Math.max(1, Math.round(density * CELL_SIZE * CELL_SIZE))

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
        const tint = [
          (HEALTHY_TINT[0]! + (DRY_TINT[0]! - HEALTHY_TINT[0]!) * t) * brightness,
          (HEALTHY_TINT[1]! + (DRY_TINT[1]! - HEALTHY_TINT[1]!) * t) * brightness,
          (HEALTHY_TINT[2]! + (DRY_TINT[2]! - HEALTHY_TINT[2]!) * t) * brightness,
        ]

        const region = pickRegion(regions, rand)
        const flip = rand() > 0.5
        const u0 = flip ? region.u1 : region.u0
        const u1 = flip ? region.u0 : region.u1

        const width = baseWidth * (0.8 + rand() * 0.4)
        const height = baseHeight * (0.8 + rand() * 0.4)
        const stiffness = stiffnessMin + rand() * (stiffnessMax - stiffnessMin)
        const phase = rand() * Math.PI * 2

        const base = positions.length / 3
        for (const [cu, cv] of [
          [-0.5, 0],
          [0.5, 0],
          [-0.5, 1],
          [0.5, 1],
        ] as const) {
          positions.push(x, y, z)
          corners.push(cu, cv)
          uvs.push(cu < 0 ? u0 : u1, cv === 0 ? region.v0 : region.v1)
          normals.push(normal.x, normal.y, normal.z)
          tints.push(...tint)
          data.push(width, height, stiffness, phase)
        }
        indices.push(base, base + 1, base + 2, base + 2, base + 1, base + 3)
      }
    }
  }

  if (!indices.length) return null

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('aCorner', new BufferAttribute(new Float32Array(corners), 2))
  geometry.setAttribute('aUv', new BufferAttribute(new Float32Array(uvs), 2))
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
  geometry.setAttribute('aTint', new BufferAttribute(new Float32Array(tints), 3))
  geometry.setAttribute('aData', new BufferAttribute(new Float32Array(data), 4))
  geometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1))
  geometry.computeBoundingSphere()
  return geometry
}

export function buildLayerChunks(sampler: HeightSampler, options: LayerOptions): VegetationChunk[] {
  const chunkSize = TERRAIN_SIZE / CHUNK_GRID
  const chunks: VegetationChunk[] = []

  for (let gx = 0; gx < CHUNK_GRID; gx++) {
    for (let gz = 0; gz < CHUNK_GRID; gz++) {
      const originX = -HALF + gx * chunkSize
      const originZ = -HALF + gz * chunkSize
      const geometry = buildChunkGeometry(sampler, options, originX, originZ, chunkSize)
      if (!geometry) continue
      chunks.push({
        geometry,
        center: geometry.boundingSphere!.center.clone(),
        radius: geometry.boundingSphere!.radius,
      })
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
