import type { Node } from 'three/webgpu'
import { AdditiveBlending, Color, MeshBasicNodeMaterial } from 'three/webgpu'
import {
  cameraPosition,
  cameraProjectionMatrix,
  clamp,
  cos,
  dot,
  float,
  Fn,
  fract,
  max,
  mix,
  modelViewMatrix,
  modelWorldMatrix,
  normalGeometry,
  normalize,
  positionLocal,
  saturate,
  sin,
  sRGBTransferEOTF,
  time,
  uniform,
  uv,
  vec2,
  vec4,
} from 'three/tsl'
import type { HolographicMaterialUniforms } from './props'
import { holographicDefaults } from './props'

/**
 * TSL port of the holographic material by Anderson Mancini. See `material.ts` for the license.
 * `HolographicMaterial.ts` has the GLSL version. A fix here must go there too.
 */
export class HolographicNodeMaterial extends MeshBasicNodeMaterial implements HolographicMaterialUniforms {
  private readonly holographicUniforms = {
    fresnelAmount: uniform(holographicDefaults.fresnelAmount),
    fresnelOpacity: uniform(holographicDefaults.fresnelOpacity),
    scanlineSize: uniform(holographicDefaults.scanlineSize),
    hologramBrightness: uniform(holographicDefaults.hologramBrightness),
    signalSpeed: uniform(holographicDefaults.signalSpeed),
    hologramOpacity: uniform(holographicDefaults.hologramOpacity),
    hologramColor: uniform(new Color(holographicDefaults.hologramColor)),
    // 0/1 floats, not bools: WGSL does not allow bool in a uniform buffer. The GLSL ternary and
    // `if` on them become `mix`.
    enableBlinking: uniform(Number(holographicDefaults.enableBlinking)),
    blinkFresnelOnly: uniform(Number(holographicDefaults.blinkFresnelOnly)),
  }

  constructor() {
    super()
    this.transparent = true
    this.blending = AdditiveBlending
    this.depthTest = false
    // ShaderMaterial has fog off and NodeMaterial has it on.
    this.fog = false

    const u = this.holographicUniforms

    const clipPosition = cameraProjectionMatrix.mul(modelViewMatrix).mul(vec4(positionLocal, 1)).toVarying()
    // `vector * matrix`, as in the GLSL. This multiplies by the transpose of the model matrix, so the
    // fresnel ignores the mesh position. The GLSL does the same, and the port keeps it for parity.
    const positionW = vec4(positionLocal, 1).mul(modelWorldMatrix).xyz.toVarying()
    const normalW = normalize(vec4(normalGeometry, 0).mul(modelWorldMatrix).xyz).toVarying()

    const flicker = (amount: Node<'float'>, t: Node<'float'>) => clamp(fract(cos(t).mul(43758.5453123)), amount, 1)
    const random = (a: Node<'float'>, b: Node<'float'>) => fract(cos(dot(vec2(a, b), vec2(12.9898, 78.233))).mul(43758.5453))
    // The GLSL calls smoothstep with edge0 > edge1. WGSL gives an indeterminate value for that, so
    // this writes out the formula that GLSL drivers use.
    const smoothstepAnyOrder = (edge0: Node<'float'>, edge1: Node<'float'>, x: Node<'float'>) => {
      const t = saturate(x.sub(edge0).div(edge1.sub(edge0)))
      return t.mul(t).mul(float(3).sub(t.mul(2)))
    }

    this.colorNode = Fn(() => {
      const vUv = uv()
      const myUV = fract(clipPosition.xy.div(clipPosition.w).mul(0.5).add(0.5))
      const signalTime = time.mul(u.signalSpeed)

      const scanlines = float(10).toVar()
      scanlines.addAssign(sin(signalTime.mul(20.8).sub(myUV.y.mul(60).mul(u.scanlineSize))).mul(20))
      scanlines.mulAssign(smoothstepAnyOrder(cos(signalTime.add(myUV.y.mul(u.scanlineSize))).mul(1.3), float(0.78), float(0.9)))
      scanlines.mulAssign(max(0.25, sin(signalTime)))

      // The GLSL also computes a `g` offset that it never reads.
      const r = random(vUv.x, vUv.y)
      const b = random(vUv.y.mul(0.9), vUv.y.mul(0.2))

      const hologramColor = vec4(u.hologramColor, mix(u.hologramBrightness, vUv.y, 0.5))
        .add(vec4(r.mul(scanlines), b.mul(scanlines), r, 1).div(84))
        .toVar()
      const scanlineMix = mix(vec4(0), hologramColor, hologramColor.a)

      const viewDirectionW = normalize(cameraPosition.sub(positionW))
      const fresnelFacing = dot(viewDirectionW, normalW).mul(float(1.6).sub(u.fresnelOpacity.div(2)))
      const fresnelEffect = clamp(u.fresnelAmount.sub(fresnelFacing), 0, u.fresnelOpacity)

      const blinkValue = mix(float(1), float(0.6).sub(u.signalSpeed), u.enableBlinking)
      const blink = flicker(blinkValue, signalTime.mul(0.02))

      const finalColor = mix(
        scanlineMix.rgb.mul(blink).add(fresnelEffect),
        scanlineMix.rgb.add(fresnelEffect.mul(blink)),
        u.blinkFresnelOnly,
      )

      // The GLSL has no `colorspace_fragment`, so WebGLRenderer writes its output to the sRGB canvas
      // as is, clamped to 0..1 by the 8-bit target. WebGPURenderer keeps the value in a linear
      // half-float target and encodes it to sRGB after. Clamp and decode here to show the same colors.
      // `@types/three` types `sRGBTransferEOTF` as returning a plain `Node`, which `vec4()` rejects.
      // The function returns a vec3 (its layout says so).
      return vec4(sRGBTransferEOTF(saturate(finalColor)) as Node<'vec3'>, u.hologramOpacity)
    })()
  }

  get fresnelAmount() { return this.holographicUniforms.fresnelAmount.value }
  set fresnelAmount(value: number) { this.holographicUniforms.fresnelAmount.value = value }

  get fresnelOpacity() { return this.holographicUniforms.fresnelOpacity.value }
  set fresnelOpacity(value: number) { this.holographicUniforms.fresnelOpacity.value = value }

  get scanlineSize() { return this.holographicUniforms.scanlineSize.value }
  set scanlineSize(value: number) { this.holographicUniforms.scanlineSize.value = value }

  get hologramBrightness() { return this.holographicUniforms.hologramBrightness.value }
  set hologramBrightness(value: number) { this.holographicUniforms.hologramBrightness.value = value }

  get signalSpeed() { return this.holographicUniforms.signalSpeed.value }
  set signalSpeed(value: number) { this.holographicUniforms.signalSpeed.value = value }

  get hologramOpacity() { return this.holographicUniforms.hologramOpacity.value }
  set hologramOpacity(value: number) { this.holographicUniforms.hologramOpacity.value = value }

  // The color has only a getter: Tres calls `.set()` on the returned uniform `Color`.
  get hologramColor() { return this.holographicUniforms.hologramColor.value }

  get enableBlinking() { return this.holographicUniforms.enableBlinking.value === 1 }
  set enableBlinking(value: boolean) { this.holographicUniforms.enableBlinking.value = value ? 1 : 0 }

  get blinkFresnelOnly() { return this.holographicUniforms.blinkFresnelOnly.value === 1 }
  set blinkFresnelOnly(value: boolean) { this.holographicUniforms.blinkFresnelOnly.value = value ? 1 : 0 }
}
