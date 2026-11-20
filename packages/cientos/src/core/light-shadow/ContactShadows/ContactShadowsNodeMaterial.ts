import { Color, NoBlending, NodeMaterial } from 'three/webgpu'
import type { Texture } from 'three/webgpu'
import { depth, Fn, texture, uniform, uv, vec2, vec4 } from 'three/tsl'
import type { BlurDirection, ContactShadowsBlurMaterial, ContactShadowsDepthMaterial } from './props'

// The taps of three-stdlib's HorizontalBlurShader and VerticalBlurShader.
const BLUR_WEIGHTS = [0.051, 0.0918, 0.12245, 0.1531, 0.1633, 0.1531, 0.12245, 0.0918, 0.051]

export class ContactShadowsDepthNodeMaterial extends NodeMaterial implements ContactShadowsDepthMaterial {
  private readonly tintUniform = uniform(new Color('white'))

  constructor() {
    super()
    this.fog = false
    // WebGPURenderer copies `transparent` from each object onto an override material, so only NoBlending keeps the tint unpremultiplied.
    this.blending = NoBlending
    // `depth` is linear from near to far under the orthographic shadow camera, as `fragCoordZ` is in GLSL.
    this.fragmentNode = vec4(this.tintUniform, depth.oneMinus())
  }

  get tint(): Color {
    return this.tintUniform.value
  }
}

export class ContactShadowsBlurNodeMaterial extends NodeMaterial implements ContactShadowsBlurMaterial {
  private readonly offsetUniform = uniform(1 / 512)

  constructor(direction: BlurDirection, source: Texture) {
    super()
    this.fog = false
    this.depthTest = false

    const step = direction === 'horizontal' ? vec2(this.offsetUniform, 0) : vec2(0, this.offsetUniform)
    // `source` must be the render target texture at build time, so the texture node flips Y for WebGPU.
    const map = texture(source)

    this.fragmentNode = Fn(() => {
      const sum = vec4(0).toVar()
      BLUR_WEIGHTS.forEach((weight, i) => {
        sum.addAssign(map.sample(uv().add(step.mul(i - 4))).mul(weight))
      })
      return sum
    })()
  }

  get offset(): number {
    return this.offsetUniform.value
  }

  set offset(value: number) {
    this.offsetUniform.value = value
  }
}

export const nodeMaterials = {
  createDepthMaterial: () => new ContactShadowsDepthNodeMaterial(),
  createBlurMaterial: (direction: BlurDirection, source: Texture) => new ContactShadowsBlurNodeMaterial(direction, source),
}
