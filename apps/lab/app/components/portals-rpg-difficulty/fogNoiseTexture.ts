import { Data3DTexture, LinearFilter, RepeatWrapping } from 'three'

// Evaluating 8 procedural noises per raymarch step dropped a 2048px portal to ~19 fps.
// Baked once into a tiling 3D texture, each step is two trilinear fetches.
// R = fBm 0..1, GBA = three single-octave noises for the domain warp, -1..1.

export interface FogNoiseParams {
  octaves: number
  roughness: number
  lacunarity: number
}

// Noise-space units per texture repeat; the shader divides its sample position by this.
export const FOG_NOISE_PERIOD = 4
const SIZE = 64

const cache = new Map<string, Data3DTexture>()

function hashGradient(ix: number, iy: number, iz: number, out: Float32Array) {
  let h = (ix * 374761393 + iy * 668265263 + iz * 1274126177) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  const a = Math.imul(h, 2246822519)
  const b = Math.imul(h ^ 0x5BD1E995, 3266489917)
  const c = Math.imul(h ^ 0x27D4EB2F, 668265263)
  out[0] = ((a >>> 0) / 4294967295) * 2 - 1
  out[1] = ((b >>> 0) / 4294967295) * 2 - 1
  out[2] = ((c >>> 0) / 4294967295) * 2 - 1
}

const g = new Float32Array(3)

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

// The lattice wraps every `period` cells, so the tile has no seam under RepeatWrapping.
function periodicGradientNoise(x: number, y: number, z: number, period: number) {
  const cx = Math.floor(x)
  const cy = Math.floor(y)
  const cz = Math.floor(z)
  const fx = x - cx
  const fy = y - cy
  const fz = z - cz
  const ux = fade(fx)
  const uy = fade(fy)
  const uz = fade(fz)

  const corner = (dx: number, dy: number, dz: number) => {
    hashGradient(
      (((cx + dx) % period) + period) % period,
      (((cy + dy) % period) + period) % period,
      (((cz + dz) % period) + period) % period,
      g,
    )
    return g[0] * (fx - dx) + g[1] * (fy - dy) + g[2] * (fz - dz)
  }

  const n000 = corner(0, 0, 0)
  const n100 = corner(1, 0, 0)
  const n010 = corner(0, 1, 0)
  const n110 = corner(1, 1, 0)
  const n001 = corner(0, 0, 1)
  const n101 = corner(1, 0, 1)
  const n011 = corner(0, 1, 1)
  const n111 = corner(1, 1, 1)

  const nx00 = n000 + (n100 - n000) * ux
  const nx10 = n010 + (n110 - n010) * ux
  const nx01 = n001 + (n101 - n001) * ux
  const nx11 = n011 + (n111 - n011) * ux
  const nxy0 = nx00 + (nx10 - nx00) * uy
  const nxy1 = nx01 + (nx11 - nx01) * uy
  return nxy0 + (nxy1 - nxy0) * uz
}

export function getFogNoiseTexture(params: FogNoiseParams) {
  const key = `${params.octaves}|${params.roughness}|${params.lacunarity}`
  const cached = cache.get(key)
  if (cached) { return cached }

  const data = new Uint8Array(SIZE * SIZE * SIZE * 4)
  const step = FOG_NOISE_PERIOD / SIZE
  let i = 0
  for (let z = 0; z < SIZE; z++) {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const px = x * step
        const py = y * step
        const pz = z * step

        // Unnormalised sum as in mx_fractal_noise_float. A non-integer lacunarity
        // rounds the period and gets a faint seam.
        let n = 0
        let amplitude = 1
        let frequency = 1
        for (let o = 0; o < params.octaves; o++) {
          const period = Math.max(1, Math.round(FOG_NOISE_PERIOD * frequency))
          n += amplitude * periodicGradientNoise(px * frequency, py * frequency, pz * frequency, period)
          amplitude *= params.roughness
          frequency *= params.lacunarity
        }

        const wx = periodicGradientNoise(px + 13.5, py + 7.1, pz, FOG_NOISE_PERIOD)
        const wy = periodicGradientNoise(px, py + 13.5, pz + 7.1, FOG_NOISE_PERIOD)
        const wz = periodicGradientNoise(px + 7.1, py, pz + 13.5, FOG_NOISE_PERIOD)

        data[i++] = Math.round(Math.min(1, Math.max(0, n * 0.5 + 0.5)) * 255)
        data[i++] = Math.round((wx * 0.5 + 0.5) * 255)
        data[i++] = Math.round((wy * 0.5 + 0.5) * 255)
        data[i++] = Math.round((wz * 0.5 + 0.5) * 255)
      }
    }
  }

  const texture = new Data3DTexture(data, SIZE, SIZE, SIZE)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.wrapR = RepeatWrapping
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.unpackAlignment = 1
  texture.needsUpdate = true
  cache.set(key, texture)
  return texture
}
