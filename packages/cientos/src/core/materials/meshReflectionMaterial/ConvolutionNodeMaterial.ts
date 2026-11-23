import type { TextureNode } from 'three/webgpu'
import { DepthTexture, NoBlending, NodeMaterial, Texture, Vector2 } from 'three/webgpu'
import { clamp, mix, positionGeometry, screenUV, smoothstep, texture, uniform, vec2, vec4 } from 'three/tsl'
import type { ConvolutionDepthOptions, ConvolutionPassMaterial } from './BlurPass'

export class ConvolutionNodeMaterial extends NodeMaterial implements ConvolutionPassMaterial {
  readonly kernel = new Float32Array([0.0, 1.0, 2.0, 2.0, 3.0])

  private readonly _convolutionUniforms = {
    texelSize: uniform(new Vector2()),
    halfTexelSize: uniform(new Vector2()),
    kernel: uniform(0),
    scale: uniform(1),
    depthEdge0: uniform(0),
    depthEdge1: uniform(1),
    depthScale: uniform(0),
    depthBias: uniform(0.25),
    useDepth: uniform(0),
  }

  private readonly _emptyTexture = new Texture()
  // The depth fallback must be a depth texture too: WGSL types the binding from the first texture it sees.
  private readonly _emptyDepthTexture = new DepthTexture(1, 1)
  private readonly _inputNodes: TextureNode[]
  private readonly _depthNode: TextureNode

  constructor() {
    super()
    this.blending = NoBlending
    this.depthWrite = false
    this.depthTest = false
    this.toneMapped = false
    this.fog = false

    const u = this._convolutionUniforms

    this.vertexNode = vec4(positionGeometry.xy, 0.0, 1.0)

    // The blur writes and reads render targets of the same size, so the fragment position is the texel to sample.
    const uv = screenUV
    const dUv = u.texelSize.mul(u.kernel).add(u.halfTexelSize).mul(u.scale)

    this._depthNode = texture(this._emptyDepthTexture, uv)
    const depthFactor = clamp(
      u.depthScale.mul(smoothstep(u.depthEdge1.oneMinus(), u.depthEdge0.oneMinus(), this._depthNode.x.oneMinus().add(u.depthBias))).add(0.25),
      0.0,
      1.0,
    ).mul(u.useDepth)

    const corners = [
      vec2(uv.x.sub(dUv.x), uv.y.add(dUv.y)),
      vec2(uv.x.add(dUv.x), uv.y.add(dUv.y)),
      vec2(uv.x.add(dUv.x), uv.y.sub(dUv.y)),
      vec2(uv.x.sub(dUv.x), uv.y.sub(dUv.y)),
    ]
    // One node per sample: each keeps its own UV, and `setBuffers` points all of them at the new input.
    this._inputNodes = corners.map(corner => texture(this._emptyTexture, mix(corner, uv, depthFactor)))

    const [s0, s1, s2, s3] = this._inputNodes
    this.fragmentNode = s0.add(s1).add(s2).add(s3).mul(0.25)
  }

  setTexelSize(x: number, y: number) {
    this._convolutionUniforms.texelSize.value.set(x, y)
    this._convolutionUniforms.halfTexelSize.value.set(x, y).multiplyScalar(0.5)
  }

  setDepthOptions({ edge0, edge1, scale, bias }: ConvolutionDepthOptions) {
    const u = this._convolutionUniforms
    u.depthEdge0.value = edge0
    u.depthEdge1.value = edge1
    u.depthScale.value = scale
    u.depthBias.value = bias
    u.useDepth.value = scale > 0 ? 1 : 0
  }

  setBuffers(inputBuffer: Texture | null, depthBuffer: Texture | null) {
    for (const node of this._inputNodes) {
      node.value = inputBuffer ?? this._emptyTexture
    }
    this._depthNode.value = depthBuffer ?? this._emptyDepthTexture
  }

  setKernel(kernel: number) {
    this._convolutionUniforms.kernel.value = kernel
  }

  override dispose() {
    this._emptyTexture.dispose()
    this._emptyDepthTexture.dispose()
    super.dispose()
  }
}
