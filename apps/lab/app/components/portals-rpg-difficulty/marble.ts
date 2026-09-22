// CPU twin of the marble chain in shaders/fire-vertex.glsl; edit both together.

const OCTAVES = 3

function fract(n: number) {
  return n - Math.floor(n)
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function hash13(x: number, y: number, z: number) {
  let px = fract(x * 0.1031)
  let py = fract(y * 0.1031)
  let pz = fract(z * 0.1031)
  const d = px * (pz + 31.32) + py * (py + 31.32) + pz * (px + 31.32)
  px += d
  py += d
  pz += d

  return fract((px + py) * pz)
}

function valueNoise(x: number, y: number, z: number) {
  const cx = Math.floor(x)
  const cy = Math.floor(y)
  const cz = Math.floor(z)
  const fx = x - cx
  const fy = y - cy
  const fz = z - cz
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  const uz = fz * fz * (3 - 2 * fz)

  const n000 = hash13(cx, cy, cz)
  const n100 = hash13(cx + 1, cy, cz)
  const n010 = hash13(cx, cy + 1, cz)
  const n110 = hash13(cx + 1, cy + 1, cz)
  const n001 = hash13(cx, cy, cz + 1)
  const n101 = hash13(cx + 1, cy, cz + 1)
  const n011 = hash13(cx, cy + 1, cz + 1)
  const n111 = hash13(cx + 1, cy + 1, cz + 1)

  return mix(
    mix(mix(n000, n100, ux), mix(n010, n110, ux), uy),
    mix(mix(n001, n101, ux), mix(n011, n111, ux), uy),
    uz,
  )
}

function turbulence(x: number, y: number, z: number) {
  let sum = 0
  let amp = 1
  let total = 0

  for (let i = 0; i < OCTAVES; i++) {
    sum += valueNoise(x, y, z) * amp
    total += amp
    amp *= 0.5
    x *= 2
    y *= 2
    z *= 2
  }

  return sum / total
}

export function marble(
  x: number,
  y: number,
  z: number,
  veins: number,
  size: number,
  turb: number,
) {
  const stack = veins * (x + y + z)

  return 0.5 + 0.5 * Math.sin(stack + turb * turbulence(x / size, y / size, z / size))
}
