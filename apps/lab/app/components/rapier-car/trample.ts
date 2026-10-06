import { CanvasTexture, ClampToEdgeWrapping } from 'three'

export interface TrampleSettings {
  /** world extent covered by the map (width = depth), centered on origin */
  size?: number
  /** texels per side */
  resolution?: number
  /** trample fraction removed per second (spring-back speed) */
  recovery?: number
  /** default stamp radius in world units */
  stampRadius?: number
}

export interface TrampleMap {
  texture: CanvasTexture
  size: number
  originX: number
  originZ: number
  stamp: (x: number, z: number, strength?: number, radius?: number) => void
  update: (delta: number) => void
  dispose: () => void
}

// CanvasTexture flips Y (v=1 at canvas row 0), so +z maps to decreasing pixel y.
// Mirrors the shader-side UV: (worldXZ - origin) / size + 0.5
function worldToPixel(x: number, z: number, originX: number, originZ: number, size: number, resolution: number) {
  const u = (x - originX) / size + 0.5
  const v = (z - originZ) / size + 0.5
  return { x: u * resolution, y: (1 - v) * resolution }
}

// Fades below this alpha stall on 8-bit rounding, so accumulate until it's worth applying
const MIN_FADE_ALPHA = 6 / 255

export function createTrampleMap(settings: TrampleSettings = {}): TrampleMap {
  const { size = 100, resolution = 512, recovery = 0.35, stampRadius = 1.6 } = settings

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = resolution
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('[trample] 2d canvas context unavailable') }
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, resolution, resolution)

  const texture = new CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = ClampToEdgeWrapping

  const originX = 0
  const originZ = 0
  const pxPerUnit = resolution / size
  let fadeCarry = 0
  // Seconds since the last stamp; once the trail has fully recovered we stop
  // touching the canvas so a parked car costs zero texture uploads
  let idle = Infinity
  // ~exp(-recovery·t) decay: seconds for a full stamp to fade below the 8-bit floor
  const fullRecovery = recovery > 0 ? -Math.log(MIN_FADE_ALPHA) / recovery + 2 : Infinity

  function stamp(x: number, z: number, strength = 1, radius = stampRadius) {
    const p = worldToPixel(x, z, originX, originZ, size, resolution)
    const r = radius * pxPerUnit
    const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
    gradient.addColorStop(0, `rgba(255,255,255,${strength})`)
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx!.fillStyle = gradient
    ctx!.fillRect(p.x - r, p.y - r, r * 2, r * 2)
    idle = 0
    texture.needsUpdate = true
  }

  // Multiplicative-ish fade toward black; carries sub-threshold amounts to beat 8-bit rounding
  function update(delta: number) {
    idle += delta
    if (idle > fullRecovery) { return }
    fadeCarry += recovery * delta
    if (fadeCarry < MIN_FADE_ALPHA) { return }
    ctx!.fillStyle = `rgba(0, 0, 0, ${Math.min(1, fadeCarry)})`
    ctx!.fillRect(0, 0, resolution, resolution)
    fadeCarry = 0
    texture.needsUpdate = true
  }

  return {
    texture,
    size,
    originX,
    originZ,
    stamp,
    update,
    dispose: () => texture.dispose(),
  }
}
