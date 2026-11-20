/*
Adapted from Drei BlurPass
https://github.com/pmndrs/drei/blob/master/

MIT License

Copyright (c) 2020 react-spring

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {
  BufferAttribute,
  BufferGeometry,
  HalfFloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  Scene,
} from 'three'
// `RenderTarget` must stay a type-only import: three exports the class only from r155, and the root entry supports r133.
import type { Camera, Material, RenderTarget, RenderTargetOptions, Texture } from 'three'

export interface ConvolutionDepthOptions {
  edge0: number
  edge1: number
  scale: number
  bias: number
}

export type CreateRenderTarget = (width: number, height: number, options: RenderTargetOptions) => RenderTarget

export interface ConvolutionPassMaterial extends Material {
  readonly kernel: Float32Array
  setTexelSize: (x: number, y: number) => void
  setDepthOptions: (options: ConvolutionDepthOptions) => void
  setBuffers: (inputBuffer: Texture | null, depthBuffer: Texture | null) => void
  setKernel: (kernel: number) => void
}

// Loose enough that WebGLRenderer and WebGPURenderer both fit.
interface BlurPassRenderer {
  setRenderTarget: (target: any) => void
  render: (scene: Scene, camera: Camera) => unknown
}

export interface BlurPassProps {
  resolution: number
  width?: number
  height?: number
  depthEdge0?: number
  depthEdge1?: number
  depthScale?: number
  depthBias?: number
  createTarget: CreateRenderTarget
  material: ConvolutionPassMaterial
}

export class BlurPass {
  readonly renderTargetA: RenderTarget
  readonly renderTargetB: RenderTarget
  readonly convolutionMaterial: ConvolutionPassMaterial
  readonly scene: Scene
  readonly camera: Camera
  readonly screen: Mesh
  renderToScreen: boolean = false

  constructor({
    resolution,
    width = 500,
    height = 500,
    depthEdge0 = 0,
    depthEdge1 = 1,
    depthScale = 0,
    depthBias = 0.25,
    createTarget,
    material,
  }: BlurPassProps) {
    const targetOptions: RenderTargetOptions = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
      type: HalfFloatType,
    }
    this.renderTargetA = createTarget(resolution, resolution, targetOptions)
    this.renderTargetB = createTarget(resolution, resolution, targetOptions)
    this.convolutionMaterial = material
    this.convolutionMaterial.setTexelSize(1.0 / width, 1.0 / height)
    this.convolutionMaterial.setDepthOptions({ edge0: depthEdge0, edge1: depthEdge1, scale: depthScale, bias: depthBias })
    this.scene = new Scene()
    // WebGPURenderer calls `updateProjectionMatrix` on the camera, which a bare `Camera` lacks.
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2])
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
    this.screen = new Mesh(geometry, this.convolutionMaterial)
    this.screen.frustumCulled = false
    this.scene.add(this.screen)
  }

  render(renderer: BlurPassRenderer, inputBuffer: RenderTarget, outputBuffer: RenderTarget) {
    const scene = this.scene
    const camera = this.camera
    const renderTargetA = this.renderTargetA
    const renderTargetB = this.renderTargetB
    const material = this.convolutionMaterial
    const depthBuffer = inputBuffer.depthTexture
    const kernel = material.kernel
    let lastRT: RenderTarget = inputBuffer
    let destRT
    let i, l
    // Apply the multi-pass blur.
    for (i = 0, l = kernel.length - 1; i < l; ++i) {
      // Alternate between targets.
      destRT = (i & 1) === 0 ? renderTargetA : renderTargetB
      material.setKernel(kernel[i])
      material.setBuffers(lastRT.texture, depthBuffer)
      renderer.setRenderTarget(destRT)
      renderer.render(scene, camera)
      lastRT = destRT
    }
    material.setKernel(kernel[i])
    material.setBuffers(lastRT.texture, depthBuffer)
    renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer)
    renderer.render(scene, camera)
  }

  dispose() {
    this.screen.geometry.dispose()
    this.renderTargetA.dispose()
    this.renderTargetB.dispose()
    this.convolutionMaterial.dispose()
  }
}
