import { Vector3 } from 'three'
import { HEIGHT_SCALE, TERRAIN_RESOLUTION, TERRAIN_SIZE } from './constants'

export interface HeightSampler {
  resolution: number
  // row-major and un-scaled (0..1): the collider matrix is built straight from this
  heights: Float32Array
  heightAt: (x: number, z: number) => number
  normalAt: (x: number, z: number, target?: Vector3) => Vector3
}

const images = new Map<string, Promise<HTMLImageElement>>()

// plain onload instead of img.decode(): decode() can reject with EncodingError
// when another component decodes the same resource concurrently
export function loadHeightImage(src = '/textures/world-walker/height.jpg') {
  const cached = images.get(src)
  if (cached) { return cached }

  const pending = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  }).catch((error) => {
    images.delete(src)
    throw error
  })

  images.set(src, pending)
  return pending
}

// red channel of the height map, downsampled to `resolution` and normalized to 0..1 (row-major)
export function readHeightData(img: HTMLImageElement, resolution: number) {
  const canvas = document.createElement('canvas')
  canvas.width = resolution
  canvas.height = resolution
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, resolution, resolution)
  const { data } = ctx.getImageData(0, 0, resolution, resolution)

  const heights = new Float32Array(resolution * resolution)
  for (let i = 0; i < heights.length; i++) {
    heights[i] = data[i * 4]! / 255
  }
  return heights
}

// CPU-side sampler matching the displaced plane: image row 0 ↔ world z = -half, col 0 ↔ x = -half
export function createHeightSampler(img: HTMLImageElement, resolution = TERRAIN_RESOLUTION): HeightSampler {
  const heights = readHeightData(img, resolution)

  const half = TERRAIN_SIZE / 2
  const last = resolution - 1

  const texel = (col: number, row: number) => heights[row * resolution + col]!

  const heightAt = (x: number, z: number) => {
    const col = Math.min(Math.max(((x + half) / TERRAIN_SIZE) * last, 0), last)
    const row = Math.min(Math.max(((z + half) / TERRAIN_SIZE) * last, 0), last)
    const c0 = Math.floor(col)
    const r0 = Math.floor(row)
    const c1 = Math.min(c0 + 1, last)
    const r1 = Math.min(r0 + 1, last)
    const fc = col - c0
    const fr = row - r0

    const top = texel(c0, r0) * (1 - fc) + texel(c1, r0) * fc
    const bottom = texel(c0, r1) * (1 - fc) + texel(c1, r1) * fc
    return (top * (1 - fr) + bottom * fr) * HEIGHT_SCALE
  }

  const eps = TERRAIN_SIZE / 256
  // `target` lets hot loops hand in a scratch vector instead of allocating one per sample
  const normalAt = (x: number, z: number, target = new Vector3()) => {
    const nx = heightAt(x - eps, z) - heightAt(x + eps, z)
    const nz = heightAt(x, z - eps) - heightAt(x, z + eps)
    return target.set(nx, 2 * eps, nz).normalize()
  }

  return { resolution, heights, heightAt, normalAt }
}

const samplers = new Map<string, Promise<HeightSampler>>()

// every consumer of the terrain surface — collider, mesh, footman, vegetation — has to
// read the same grid or they describe different worlds, so hand out one sampler per
// resolution instead of letting each caller build its own
export function getHeightSampler(resolution = TERRAIN_RESOLUTION, src?: string) {
  const key = `${src ?? 'default'}:${resolution}`
  const cached = samplers.get(key)
  if (cached) { return cached }

  const pending = loadHeightImage(src).then(img => createHeightSampler(img, resolution)).catch((error) => {
    samplers.delete(key)
    throw error
  })

  samplers.set(key, pending)
  return pending
}
